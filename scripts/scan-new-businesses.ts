#!/usr/bin/env npx tsx
/**
 * Alabama New Business Lead Scanner
 *
 * Scrapes the Alabama Secretary of State business entity search
 * for newly registered businesses, filters by target counties/cities,
 * checks for web presence, pushes to Airtable, and sends email digest.
 *
 * Usage:
 *   npx tsx scripts/scan-new-businesses.ts
 *   npx tsx scripts/scan-new-businesses.ts --month 03 --year 2026
 *   npx tsx scripts/scan-new-businesses.ts --output leads.csv
 *   npx tsx scripts/scan-new-businesses.ts --no-airtable       # skip Airtable push
 *   npx tsx scripts/scan-new-businesses.ts --no-email           # skip email digest
 *
 * Environment variables:
 *   AIRTABLE_PAT          - Airtable Personal Access Token
 *   AIRTABLE_BASE_ID      - Airtable base ID (starts with "app")
 *   AIRTABLE_TABLE_NAME   - Table name (default: "New Business Leads")
 *   RESEND_API_KEY        - Resend API key (already used by the site)
 *   NOTIFY_EMAIL          - Email to send weekly digest to (default: matt@headleyweb.com)
 *
 * Weekly automation: see .github/workflows/weekly-lead-scan.yml
 *
 * Requires: cheerio (already in project deps), resend (already in project deps)
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---

const TARGET_COUNTIES = [
  'calhoun', 'etowah', 'cherokee', 'talladega', 'st. clair',
  'cleburne', 'clay', 'randolph', 'dekalb', 'blount',
];

const TARGET_CITIES = [
  'jacksonville', 'anniston', 'oxford', 'gadsden', 'centre',
  'talladega', 'piedmont', 'heflin', 'weaver', 'lincoln',
  'pell city', 'rainbow city', 'southside', 'glencoe',
  'alexandria', 'ohatchee', 'munford', 'bynum',
  'fort payne', 'albertville', 'boaz', 'attalla',
];

const HIGH_VALUE_KEYWORDS = [
  'plumb', 'hvac', 'heat', 'air', 'cool', 'electric',
  'roof', 'paint', 'landscap', 'lawn', 'clean', 'maid',
  'pest', 'auto', 'mechanic', 'repair', 'construct',
  'remodel', 'renovation', 'salon', 'barber', 'beauty',
  'dental', 'chiropr', 'veterinar', 'pet', 'groom',
  'restaurant', 'cafe', 'catering', 'fitness', 'gym',
  'yoga', 'photo', 'real estate', 'property', 'insur',
  'account', 'tax', 'consult', 'coach', 'tutor',
  'daycare', 'child care', 'elder', 'home health',
  'moving', 'storage', 'tow', 'wreck', 'tree', 'fenc',
  'concrete', 'pav', 'weld', 'fabri', 'machine',
  'pressure wash', 'power wash', 'detail', 'window',
];

const SOS_BASE = 'https://arc-sos.state.al.us';

interface BusinessEntity {
  name: string;
  entityId: string;
  type: string;
  formationDate: string;
  status: string;
  principalAddress: string;
  registeredAgent: string;
  city: string;
  state: string;
  zip: string;
  detailUrl: string;
  matchedCity: string | null;
  matchedKeywords: string[];
  hasWebsite: boolean | null;
  websiteUrl: string | null;
  priority: 'high' | 'medium' | 'low';
}

// --- Argument Parsing ---

function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  const flags = new Set<string>();
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--no-')) {
      flags.add(args[i].slice(5));
    } else if (args[i].startsWith('--') && args[i + 1] && !args[i + 1].startsWith('--')) {
      opts[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return { opts, flags };
}

// --- HTTP Helpers ---

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
  const headers: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    ...((options.headers as Record<string, string>) || {}),
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { ...options, headers, redirect: 'follow' });
      if (res.ok) return res;
      if (res.status === 429 || res.status >= 500) {
        if (attempt < retries) {
          const wait = Math.pow(2, attempt + 1) * 1000;
          console.log(`  Retry ${attempt + 1}/${retries} after ${wait}ms (status ${res.status})`);
          await sleep(wait);
          continue;
        }
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      if (attempt < retries) {
        const wait = Math.pow(2, attempt + 1) * 1000;
        console.log(`  Retry ${attempt + 1}/${retries} after ${wait}ms (${(err as Error).message})`);
        await sleep(wait);
        continue;
      }
      throw err;
    }
  }
  throw new Error('Exhausted retries');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Alabama SOS Scraper ---

async function searchByDate(month: string, year: string): Promise<BusinessEntity[]> {
  console.log(`\nSearching Alabama SOS for businesses formed ${month}/${year}...`);

  const searchUrl = `${SOS_BASE}/CGI/CORPNAME.MBR/OUTPUT?TYPE=6&FROMDTE=${month}/01/${year}&TODTE=${month}/28/${year}`;

  try {
    const res = await fetchWithRetry(searchUrl);
    const html = await res.text();
    return parseSearchResults(html);
  } catch (err) {
    console.error(`  Failed to fetch SOS results: ${(err as Error).message}`);
    console.log('  Tip: The Alabama SOS site may block automated requests.');
    console.log('  Try running this script from your local machine (not a container).');
    return [];
  }
}

function parseSearchResults(html: string): BusinessEntity[] {
  const $ = cheerio.load(html);
  const entities: BusinessEntity[] = [];

  $('table tr').each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length >= 4) {
      const nameCell = cells.eq(0);
      const name = nameCell.text().trim();
      const link = nameCell.find('a').attr('href') || '';
      const entityId = cells.eq(1)?.text().trim() || '';
      const type = cells.eq(2)?.text().trim() || '';
      const formationDate = cells.eq(3)?.text().trim() || '';
      const status = cells.eq(4)?.text().trim() || 'Active';

      if (name && name !== 'Entity Name' && !name.includes('No records')) {
        entities.push({
          name, entityId, type, formationDate, status,
          principalAddress: '', registeredAgent: '',
          city: '', state: 'AL', zip: '',
          detailUrl: link ? (link.startsWith('http') ? link : `${SOS_BASE}${link}`) : '',
          matchedCity: null, matchedKeywords: [],
          hasWebsite: null, websiteUrl: null, priority: 'low',
        });
      }
    }
  });

  // Also try pre-formatted output
  $('pre').each((_, pre) => {
    const text = $(pre).text();
    const lines = text.split('\n').filter(l => l.trim());
    for (const line of lines) {
      const match = line.match(/^(.{40,}?)\s{2,}(\d{9})\s{2,}(LLC|INC|CORP|LP|LLP|PA|PC)\s{2,}(\d{2}\/\d{2}\/\d{4})/i);
      if (match) {
        entities.push({
          name: match[1].trim(), entityId: match[2], type: match[3],
          formationDate: match[4], status: 'Active',
          principalAddress: '', registeredAgent: '',
          city: '', state: 'AL', zip: '', detailUrl: '',
          matchedCity: null, matchedKeywords: [],
          hasWebsite: null, websiteUrl: null, priority: 'low',
        });
      }
    }
  });

  console.log(`  Found ${entities.length} entities in search results`);
  return entities;
}

async function fetchEntityDetails(entity: BusinessEntity): Promise<void> {
  if (!entity.detailUrl) return;
  try {
    await sleep(500);
    const res = await fetchWithRetry(entity.detailUrl);
    const html = await res.text();
    const $ = cheerio.load(html);
    const text = $('body').text();

    const addrMatch = text.match(/Principal\s+Address[:\s]+([\s\S]*?)(?=Registered|Mailing|$)/i);
    if (addrMatch) entity.principalAddress = addrMatch[1].replace(/\s+/g, ' ').trim();

    const agentMatch = text.match(/Registered\s+Agent[:\s]+([\s\S]*?)(?=Principal|Mailing|$)/i);
    if (agentMatch) entity.registeredAgent = agentMatch[1].replace(/\s+/g, ' ').trim();

    const cityStateMatch = entity.principalAddress.match(/([A-Za-z\s.]+),?\s+AL\s+(\d{5})/i);
    if (cityStateMatch) {
      entity.city = cityStateMatch[1].trim();
      entity.zip = cityStateMatch[2];
    }
  } catch {
    // Non-critical
  }
}

// --- Lead Scoring ---

function scoreEntity(entity: BusinessEntity): void {
  const nameLower = entity.name.toLowerCase();
  const addressLower = (entity.principalAddress + ' ' + entity.city).toLowerCase();

  for (const city of TARGET_CITIES) {
    if (addressLower.includes(city)) {
      entity.matchedCity = city;
      break;
    }
  }

  for (const kw of HIGH_VALUE_KEYWORDS) {
    if (nameLower.includes(kw)) {
      entity.matchedKeywords.push(kw);
    }
  }

  if (entity.matchedCity && entity.matchedKeywords.length > 0) {
    entity.priority = 'high';
  } else if (entity.matchedCity || entity.matchedKeywords.length > 0) {
    entity.priority = 'medium';
  } else {
    entity.priority = 'low';
  }
}

// --- Web Presence Check ---

async function checkWebPresence(entity: BusinessEntity): Promise<void> {
  const cleanName = entity.name
    .replace(/\b(LLC|L\.L\.C\.|INC\.?|CORP\.?|LP|LLP|PA|PC)\b/gi, '')
    .replace(/[,.\-]+$/, '')
    .trim();

  try {
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '').trim();
    const domainGuesses = [`${slug}.com`, `${slug}al.com`, `${slug}alabama.com`];

    for (const domain of domainGuesses) {
      try {
        const res = await fetch(`https://${domain}`, {
          method: 'HEAD',
          redirect: 'follow',
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok || res.status === 301 || res.status === 302) {
          entity.hasWebsite = true;
          entity.websiteUrl = `https://${domain}`;
          return;
        }
      } catch {
        // Domain doesn't exist
      }
    }
    entity.hasWebsite = false;
  } catch {
    entity.hasWebsite = null;
  }
}

// --- Airtable Integration ---

async function pushToAirtable(entities: BusinessEntity[]): Promise<{ created: number; skipped: number }> {
  const pat = (process.env.AIRTABLE_PAT || '').trim();
  const baseId = (process.env.AIRTABLE_BASE_ID || '').trim();
  const tableName = (process.env.AIRTABLE_TABLE_NAME || 'New Business Leads').trim();

  if (!pat || !baseId) {
    console.log('\n  Airtable: Skipped (AIRTABLE_PAT or AIRTABLE_BASE_ID not set)');
    return { created: 0, skipped: entities.length };
  }

  console.log(`\nPushing ${entities.length} leads to Airtable...`);

  // First, fetch existing entity IDs to avoid duplicates
  const existingIds = new Set<string>();
  let offset: string | undefined;
  do {
    const listUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?fields%5B%5D=Entity+ID&pageSize=100${offset ? `&offset=${offset}` : ''}`;
    try {
      const res = await fetch(listUrl, {
        headers: { Authorization: `Bearer ${pat}` },
      });
      if (!res.ok) {
        if (res.status === 404) {
          console.log(`  Airtable table "${tableName}" not found. Creating first batch...`);
          break;
        }
        throw new Error(`Airtable list: ${res.status}`);
      }
      const data = await res.json() as { records: Array<{ fields: { 'Entity ID'?: string } }>; offset?: string };
      for (const rec of data.records) {
        if (rec.fields['Entity ID']) existingIds.add(rec.fields['Entity ID']);
      }
      offset = data.offset;
    } catch (err) {
      console.log(`  Warning: Could not check existing records: ${(err as Error).message}`);
      break;
    }
  } while (offset);

  // Filter out duplicates
  const newEntities = entities.filter(e => !existingIds.has(e.entityId));
  const skipped = entities.length - newEntities.length;

  if (skipped > 0) {
    console.log(`  Skipping ${skipped} already-in-Airtable entities`);
  }

  if (newEntities.length === 0) {
    console.log('  No new leads to add');
    return { created: 0, skipped };
  }

  // Airtable batch create (max 10 per request)
  let created = 0;
  for (let i = 0; i < newEntities.length; i += 10) {
    const batch = newEntities.slice(i, i + 10);
    const records = batch.map(e => ({
      fields: {
        'Business Name': e.name,
        'Entity ID': e.entityId,
        'Entity Type': e.type,
        'Formation Date': e.formationDate,
        'City': e.city || e.matchedCity || '',
        'State': e.state,
        'Address': e.principalAddress,
        'Registered Agent': e.registeredAgent,
        'Priority': e.priority.charAt(0).toUpperCase() + e.priority.slice(1),
        'Matched Keywords': e.matchedKeywords.join(', '),
        'Has Website': e.hasWebsite === true ? 'Yes' : e.hasWebsite === false ? 'No' : 'Unknown',
        'Website URL': e.websiteUrl || '',
        'SOS Detail URL': e.detailUrl,
        'Status': 'New',
        'Scan Date': new Date().toISOString().split('T')[0],
      },
    }));

    try {
      const res = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error(`  Airtable batch error: ${res.status} — ${errBody}`);
      } else {
        created += batch.length;
      }
    } catch (err) {
      console.error(`  Airtable error: ${(err as Error).message}`);
    }

    if (i + 10 < newEntities.length) await sleep(200); // Airtable rate limit: 5 req/sec
  }

  console.log(`  Airtable: ${created} new leads added, ${skipped} duplicates skipped`);
  return { created, skipped };
}

// --- Email Digest (via Resend) ---

async function sendEmailDigest(entities: BusinessEntity[], scanDate: string): Promise<void> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const notifyEmail = (process.env.NOTIFY_EMAIL || '').trim();

  if (!apiKey || !notifyEmail) {
    console.log('\n  Email digest: Skipped (RESEND_API_KEY or NOTIFY_EMAIL not set)');
    return;
  }

  const high = entities.filter(e => e.priority === 'high');
  const medium = entities.filter(e => e.priority === 'medium');
  const noSite = entities.filter(e => e.hasWebsite === false);

  if (high.length === 0 && medium.length === 0) {
    console.log('\n  Email digest: Skipped (no leads to report)');
    return;
  }

  console.log(`\nSending email digest to ${notifyEmail}...`);

  const highRows = high.map(e =>
    `<tr style="background:#fef3c7">
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold">${e.name}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.city || e.matchedCity || ''}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.matchedKeywords.join(', ')}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.hasWebsite === false ? '<span style="color:#dc2626;font-weight:bold">NO WEBSITE</span>' : e.websiteUrl || 'Unknown'}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.formationDate}</td>
    </tr>`
  ).join('');

  const mediumRows = medium.slice(0, 15).map(e =>
    `<tr>
      <td style="padding:8px;border:1px solid #ddd">${e.name}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.city || e.matchedCity || ''}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.matchedKeywords.join(', ')}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.hasWebsite === false ? '<span style="color:#dc2626">No site</span>' : e.websiteUrl || 'Unknown'}</td>
      <td style="padding:8px;border:1px solid #ddd">${e.formationDate}</td>
    </tr>`
  ).join('');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:700px;margin:0 auto">
      <div style="background:#1C2826;padding:20px 24px;border-radius:8px 8px 0 0">
        <h1 style="color:#E07B3C;margin:0;font-size:22px">Weekly Lead Scan Report</h1>
        <p style="color:#F5F0EB;margin:4px 0 0;font-size:14px">New businesses registered in NE Alabama — ${scanDate}</p>
      </div>

      <div style="background:#F5F0EB;padding:20px 24px;border:1px solid #ddd;border-top:none">
        <div style="display:flex;gap:24px;margin-bottom:20px">
          <div style="background:white;padding:16px;border-radius:8px;border-left:4px solid #E07B3C;flex:1">
            <div style="font-size:28px;font-weight:bold;color:#E07B3C">${high.length}</div>
            <div style="color:#6B7280;font-size:13px">High Priority</div>
          </div>
          <div style="background:white;padding:16px;border-radius:8px;border-left:4px solid #6B8F71;flex:1">
            <div style="font-size:28px;font-weight:bold;color:#6B8F71">${medium.length}</div>
            <div style="color:#6B7280;font-size:13px">Medium Priority</div>
          </div>
          <div style="background:white;padding:16px;border-radius:8px;border-left:4px solid #dc2626;flex:1">
            <div style="font-size:28px;font-weight:bold;color:#dc2626">${noSite.length}</div>
            <div style="color:#6B7280;font-size:13px">No Website</div>
          </div>
        </div>

        ${high.length > 0 ? `
        <h2 style="color:#1C2826;font-size:18px;margin:16px 0 8px">High Priority — Local Service Trades</h2>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden">
          <tr style="background:#1C2826;color:white">
            <th style="padding:8px;text-align:left">Business</th>
            <th style="padding:8px;text-align:left">City</th>
            <th style="padding:8px;text-align:left">Trade</th>
            <th style="padding:8px;text-align:left">Website</th>
            <th style="padding:8px;text-align:left">Filed</th>
          </tr>
          ${highRows}
        </table>
        ` : ''}

        ${medium.length > 0 ? `
        <h2 style="color:#1C2826;font-size:18px;margin:24px 0 8px">Medium Priority</h2>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden">
          <tr style="background:#6B8F71;color:white">
            <th style="padding:8px;text-align:left">Business</th>
            <th style="padding:8px;text-align:left">City</th>
            <th style="padding:8px;text-align:left">Trade</th>
            <th style="padding:8px;text-align:left">Website</th>
            <th style="padding:8px;text-align:left">Filed</th>
          </tr>
          ${mediumRows}
          ${medium.length > 15 ? `<tr><td colspan="5" style="padding:8px;text-align:center;color:#6B7280">+ ${medium.length - 15} more (see Airtable)</td></tr>` : ''}
        </table>
        ` : ''}

        <div style="margin-top:24px;padding:16px;background:white;border-radius:8px;border:1px solid #ddd">
          <p style="margin:0 0 8px;font-weight:bold;color:#1C2826">Next Steps:</p>
          <ol style="margin:0;padding-left:20px;color:#2D2D2D;font-size:14px">
            <li>Google the high-priority names — find their Facebook, GBP listing</li>
            <li>Businesses with NO WEBSITE are your best prospects</li>
            <li>Run any existing sites through <a href="https://headleyweb.com/audit" style="color:#6B8F71">headleyweb.com/audit</a></li>
            <li>Reach out within 2 weeks of formation — they're still setting up</li>
          </ol>
        </div>
      </div>

      <div style="background:#1C2826;padding:12px 24px;border-radius:0 0 8px 8px;text-align:center">
        <p style="color:#6B7280;margin:0;font-size:12px">Automated lead scan by Headley Web &amp; SEO</p>
      </div>
    </div>
  `;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Lead Scanner <leads@headleyweb.com>',
      to: notifyEmail,
      subject: `Weekly Lead Scan: ${high.length} high-priority, ${noSite.length} without websites — ${scanDate}`,
      html,
    });
    console.log('  Email digest sent!');
  } catch (err) {
    console.error(`  Email error: ${(err as Error).message}`);
  }
}

// --- CSV Output ---

function toCSV(entities: BusinessEntity[]): string {
  const headers = [
    'Priority', 'Name', 'Type', 'Formation Date', 'City', 'State',
    'Matched Keywords', 'Has Website', 'Website URL', 'Entity ID', 'Detail URL',
  ];

  const rows = entities.map(e => [
    e.priority.toUpperCase(),
    `"${e.name.replace(/"/g, '""')}"`,
    e.type,
    e.formationDate,
    e.city || e.matchedCity || '',
    e.state,
    `"${e.matchedKeywords.join(', ')}"`,
    e.hasWebsite === null ? 'unknown' : e.hasWebsite ? 'YES' : 'NO',
    e.websiteUrl || '',
    e.entityId,
    e.detailUrl,
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

function printSummary(entities: BusinessEntity[]): void {
  const high = entities.filter(e => e.priority === 'high');
  const medium = entities.filter(e => e.priority === 'medium');
  const noSite = entities.filter(e => e.hasWebsite === false);

  console.log('\n' + '='.repeat(60));
  console.log('LEAD SCAN RESULTS');
  console.log('='.repeat(60));
  console.log(`Total entities found:    ${entities.length}`);
  console.log(`High priority leads:     ${high.length}`);
  console.log(`Medium priority leads:   ${medium.length}`);
  console.log(`No website detected:     ${noSite.length}`);
  console.log('='.repeat(60));

  if (high.length > 0) {
    console.log('\nHIGH PRIORITY (local + service trade):');
    for (const e of high) {
      console.log(`  ${e.name}`);
      console.log(`    City: ${e.city || e.matchedCity || 'N/A'} | Keywords: ${e.matchedKeywords.join(', ')}`);
      console.log(`    Website: ${e.hasWebsite === false ? 'NONE — potential lead!' : e.websiteUrl || 'unknown'}`);
    }
  }

  if (medium.length > 0) {
    console.log('\nMEDIUM PRIORITY:');
    for (const e of medium.slice(0, 20)) {
      console.log(`  ${e.name} — ${e.matchedCity || e.matchedKeywords.join(', ') || 'N/A'}`);
      console.log(`    Website: ${e.hasWebsite === false ? 'NONE' : e.websiteUrl || 'unknown'}`);
    }
    if (medium.length > 20) {
      console.log(`  ... and ${medium.length - 20} more (see CSV output)`);
    }
  }
}

// --- Main ---

async function main() {
  const { opts, flags } = parseArgs();

  const now = new Date();
  const month = opts.month || String(now.getMonth() + 1).padStart(2, '0');
  const year = opts.year || String(now.getFullYear());
  const outputFile = opts.output || `leads-${year}-${month}.csv`;
  const outputPath = path.resolve(process.cwd(), outputFile);
  const scanDate = `${month}/${year}`;

  const skipAirtable = flags.has('airtable');
  const skipEmail = flags.has('email');

  console.log('Alabama New Business Lead Scanner');
  console.log('='.repeat(40));
  console.log(`Target: ${scanDate}`);
  console.log(`Counties: ${TARGET_COUNTIES.join(', ')}`);
  console.log(`Airtable: ${skipAirtable ? 'disabled' : 'enabled'}`);
  console.log(`Email digest: ${skipEmail ? 'disabled' : 'enabled'}`);
  console.log(`Output: ${outputPath}`);

  // Step 1: Search SOS
  const entities = await searchByDate(month, year);

  if (entities.length === 0) {
    console.log('\nNo results from SOS search.');
    console.log('This may be due to:');
    console.log('  1. Network restrictions (try from local machine)');
    console.log('  2. SOS site blocking automated requests');
    console.log('  3. No filings for the specified month');
    console.log('\nAlternative: Use the manual workflow below.');
    printManualWorkflow(month, year);
    return;
  }

  // Step 2: Fetch entity details
  console.log('\nFetching entity details...');
  const batchSize = 5;
  for (let i = 0; i < entities.length; i += batchSize) {
    const batch = entities.slice(i, i + batchSize);
    await Promise.all(batch.map(e => fetchEntityDetails(e)));
    if (i + batchSize < entities.length) {
      process.stdout.write(`  ${Math.min(i + batchSize, entities.length)}/${entities.length} processed\r`);
    }
  }

  // Step 3: Score leads
  console.log('\nScoring leads...');
  for (const entity of entities) {
    scoreEntity(entity);
  }

  // Step 4: Check web presence for medium+ priority
  const worthChecking = entities.filter(e => e.priority !== 'low');
  if (worthChecking.length > 0) {
    console.log(`\nChecking web presence for ${worthChecking.length} promising leads...`);
    for (let i = 0; i < worthChecking.length; i++) {
      await checkWebPresence(worthChecking[i]);
      await sleep(300);
      process.stdout.write(`  ${i + 1}/${worthChecking.length} checked\r`);
    }
  }

  // Step 5: Sort by priority
  entities.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  const leads = entities.filter(e => e.priority !== 'low');

  // Step 6: Print summary
  printSummary(entities);

  // Step 7: Push to Airtable
  if (!skipAirtable && leads.length > 0) {
    await pushToAirtable(leads);
  }

  // Step 8: Send email digest
  if (!skipEmail && leads.length > 0) {
    await sendEmailDigest(leads, scanDate);
  }

  // Step 9: Write local files
  const csv = toCSV(leads);
  fs.writeFileSync(outputPath, csv, 'utf-8');
  console.log(`\nCSV written to: ${outputPath}`);

  const jsonPath = outputPath.replace('.csv', '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(leads, null, 2), 'utf-8');
  console.log(`JSON written to: ${jsonPath}`);
}

function printManualWorkflow(month: string, year: string) {
  console.log(`
MANUAL LEAD SCAN WORKFLOW
=========================

1. Go to: https://arc-sos.state.al.us/CGI/CORPNAME.MBR/INPUT

2. Select "Search by Month and Year"
   Month: ${month}    Year: ${year}

3. Browse results — look for:
   - Businesses in: Jacksonville, Anniston, Oxford,
     Gadsden, Piedmont, Heflin, Pell City
   - Service trades: plumbing, HVAC, roofing,
     landscaping, cleaning, auto repair, etc.

4. For each prospect:
   - Google their business name
   - Check if they have a website
   - Run through headleyweb.com/audit if they do
   - Add to your prospect list if they don't

5. Run your audit:
   python3 fetch-site-audit.py <url>
`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
