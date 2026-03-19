#!/usr/bin/env npx tsx
/**
 * Chamber of Commerce New Member Scanner
 *
 * Scrapes public member directories from NE Alabama chambers using Playwright
 * (headless Chromium) because GrowthZone/ChamberMaster directories are
 * JS-rendered — plain fetch + cheerio gets empty containers.
 *
 * Chambers monitored:
 *   - Etowah (Gadsden):    business.etowahchamber.org
 *   - Calhoun (Anniston):  calhounchamber.chambermaster.com
 *   - Cherokee (Centre):   members.cherokee-chamber.org
 *
 * Usage:
 *   npx tsx scripts/scan-chamber-members.ts
 *   npx tsx scripts/scan-chamber-members.ts --no-airtable
 *   npx tsx scripts/scan-chamber-members.ts --no-email
 *   npx tsx scripts/scan-chamber-members.ts --reset            # clear baseline, treat all as new
 *
 * Environment variables (same as scan-new-businesses.ts):
 *   AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME,
 *   RESEND_API_KEY, NOTIFY_EMAIL
 *
 * Weekly automation: see .github/workflows/weekly-lead-scan.yml
 */

import { chromium, type Browser, type Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// --- Chamber Configuration ---

interface ChamberConfig {
  id: string;
  name: string;
  county: string;
  baseUrl: string;
  directoryPath: string;
}

const CHAMBERS: ChamberConfig[] = [
  {
    id: 'etowah',
    name: 'Gadsden & Etowah County Chamber',
    county: 'Etowah',
    baseUrl: 'https://business.etowahchamber.org',
    directoryPath: '/list/searchalpha',
  },
  {
    id: 'calhoun',
    name: 'Calhoun County Area Chamber',
    county: 'Calhoun',
    baseUrl: 'https://calhounchamber.chambermaster.com',
    directoryPath: '/list/searchalpha',
  },
  {
    id: 'cherokee',
    name: 'Cherokee County Chamber',
    county: 'Cherokee',
    baseUrl: 'https://members.cherokee-chamber.org',
    directoryPath: '/list/searchalpha',
  },
];

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Same high-value keywords as SOS scanner
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

// --- Types ---

interface ChamberMember {
  name: string;
  category: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  detailUrl: string;
  chamberId: string;
  chamberName: string;
}

interface ChamberLead extends ChamberMember {
  matchedKeywords: string[];
  hasWebsite: boolean;
  priority: 'high' | 'medium' | 'low';
  source: string;
}

interface SeenData {
  lastScan: string | null;
  chambers: Record<string, string[]>; // chamberId -> array of business names
}

// --- Argument Parsing ---

function parseArgs() {
  const args = process.argv.slice(2);
  const flags = new Set<string>();
  for (const arg of args) {
    if (arg.startsWith('--no-')) {
      flags.add(arg.slice(5));
    } else if (arg === '--reset') {
      flags.add('reset');
    }
  }
  return { flags };
}

// --- Helpers ---

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractCity(text: string): string {
  const match = text.match(/(?:,\s*)?([\w\s.]+),?\s*AL\s*\d{5}/i);
  return match ? match[1].trim() : '';
}

// --- Playwright-based GrowthZone Scraper ---

async function scrapePageWithPlaywright(
  page: Page,
  url: string,
  chamber: ChamberConfig,
): Promise<ChamberMember[]> {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // GrowthZone renders member cards via JS — wait for them to appear.
  // Try multiple selectors that GrowthZone versions use.
  const cardSelector = [
    '.gz-results-card',
    '.mn-search-result',
    '.card.mn-card',
    '#mn-search-results .card',
    '.gz-directory-card',
  ].join(', ');

  try {
    await page.waitForSelector(cardSelector, { timeout: 10000 });
  } catch {
    // No cards rendered — could be empty letter page or different layout.
    // Fall back to any member links.
    try {
      await page.waitForSelector('a[href*="/list/member/"]', { timeout: 5000 });
    } catch {
      return []; // Genuinely empty page
    }
  }

  // Extract member data from the rendered DOM
  const members = await page.evaluate((chamberData: { id: string; name: string; baseUrl: string }) => {
    const results: Array<{
      name: string;
      category: string;
      address: string;
      phone: string;
      website: string;
      detailUrl: string;
    }> = [];

    // Strategy 1: GrowthZone card elements
    const cards = document.querySelectorAll(
      '.gz-results-card, .mn-search-result, .card.mn-card, #mn-search-results .card, .gz-directory-card'
    );

    if (cards.length > 0) {
      cards.forEach(card => {
        const nameEl = card.querySelector(
          '.gz-card-title a, .mn-org-name a, h4 a, .card-title a, .gz-member-name a'
        );
        const name = nameEl?.textContent?.trim() || '';
        const detailHref = nameEl?.getAttribute('href') || '';

        const categoryEl = card.querySelector(
          '.gz-card-category, .mn-cat, .gz-category, .card-category'
        );
        const category = categoryEl?.textContent?.trim() || '';

        const addressEl = card.querySelector(
          '.gz-card-address, .mn-addr, .gz-address, .card-text'
        );
        const address = addressEl?.textContent?.trim() || '';

        const phoneEl = card.querySelector(
          '.gz-card-phone a, .mn-phone a, a[href^="tel:"]'
        );
        const phone = phoneEl?.textContent?.trim() || '';

        // Find external website links (exclude chamber/growthzone domains)
        const chamberDomains = ['chambermaster', 'growthzone', 'etowahchamber', 'cherokee-chamber', 'calhounchamber'];
        let website = '';
        const links = card.querySelectorAll('a[href^="http"]');
        for (const link of links) {
          const href = link.getAttribute('href') || '';
          if (!chamberDomains.some(d => href.includes(d))) {
            website = href;
            break;
          }
        }

        if (name) {
          results.push({
            name,
            category,
            address,
            phone,
            website,
            detailUrl: detailHref.startsWith('http') ? detailHref : `${chamberData.baseUrl}${detailHref}`,
          });
        }
      });
    }

    // Strategy 2: Fall back to member links if no cards found
    if (results.length === 0) {
      const memberLinks = document.querySelectorAll(
        'a[href*="/list/member/"], #mn-search-results a, .gz-directory-list a, main a[href*="/list/member/"]'
      );
      memberLinks.forEach(link => {
        const name = link.textContent?.trim() || '';
        const href = link.getAttribute('href') || '';
        if (name && name.length > 2 && !/^(back|next|prev|search|home|page)/i.test(name)) {
          results.push({
            name,
            category: '',
            address: '',
            phone: '',
            website: '',
            detailUrl: href.startsWith('http') ? href : `${chamberData.baseUrl}${href}`,
          });
        }
      });
    }

    return results;
  }, { id: chamber.id, name: chamber.name, baseUrl: chamber.baseUrl });

  return members.map(m => ({
    ...m,
    city: extractCity(m.address),
    chamberId: chamber.id,
    chamberName: chamber.name,
  }));
}

async function scrapeAllMembers(
  browser: Browser,
  chamber: ChamberConfig,
): Promise<ChamberMember[]> {
  console.log(`\nScraping ${chamber.name}...`);
  const allMembers: ChamberMember[] = [];
  const seen = new Set<string>();
  let failCount = 0;

  const page = await browser.newPage();

  try {
    for (const letter of ALPHABET) {
      const url = `${chamber.baseUrl}${chamber.directoryPath}/${letter}`;
      try {
        const members = await scrapePageWithPlaywright(page, url, chamber);
        for (const m of members) {
          const key = m.name.toLowerCase().trim();
          if (!seen.has(key)) {
            seen.add(key);
            allMembers.push(m);
          }
        }
        process.stdout.write(`  ${letter.toUpperCase()}: ${members.length} members\r`);
        await sleep(800); // Be polite — 800ms between requests
      } catch (err) {
        failCount++;
        console.log(`  ${letter.toUpperCase()}: failed (${(err as Error).message})`);
        if (failCount >= 5) {
          console.log(`  Too many failures for ${chamber.name}, skipping remaining letters`);
          break;
        }
      }
    }
  } finally {
    await page.close();
  }

  console.log(`  ${chamber.name}: ${allMembers.length} total members found`);
  return allMembers;
}

// --- Baseline / Diff Logic ---

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const SEEN_FILE = path.join(DATA_DIR, 'chamber-members-seen.json');

function loadSeenData(): SeenData {
  try {
    const raw = fs.readFileSync(SEEN_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { lastScan: null, chambers: {} };
  }
}

function saveSeenData(data: SeenData): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(SEEN_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function findNewMembers(
  current: ChamberMember[],
  seenNames: string[],
): ChamberMember[] {
  const seenSet = new Set(seenNames.map(n => n.toLowerCase().trim()));
  return current.filter(m => !seenSet.has(m.name.toLowerCase().trim()));
}

// --- Lead Scoring ---

function scoreMembers(members: ChamberMember[]): ChamberLead[] {
  return members.map(m => {
    const nameLower = m.name.toLowerCase();
    const categoryLower = m.category.toLowerCase();
    const combined = `${nameLower} ${categoryLower}`;

    const matchedKeywords: string[] = [];
    for (const kw of HIGH_VALUE_KEYWORDS) {
      if (combined.includes(kw)) {
        matchedKeywords.push(kw);
      }
    }

    const hasWebsite = !!m.website && m.website.length > 4;

    let priority: 'high' | 'medium' | 'low' = 'low';
    if (matchedKeywords.length > 0 && !hasWebsite) {
      priority = 'high';
    } else if (matchedKeywords.length > 0 || !hasWebsite) {
      priority = 'medium';
    }

    return {
      ...m,
      matchedKeywords,
      hasWebsite,
      priority,
      source: `Chamber: ${m.chamberName}`,
    };
  });
}

// --- Airtable Integration ---

async function pushToAirtable(leads: ChamberLead[]): Promise<{ created: number; skipped: number }> {
  const pat = (process.env.AIRTABLE_PAT || '').trim();
  const baseId = (process.env.AIRTABLE_BASE_ID || '').trim();
  const tableName = (process.env.AIRTABLE_TABLE_NAME || 'New Business Leads').trim();

  if (!pat || !baseId) {
    console.log('\n  Airtable: Skipped (AIRTABLE_PAT or AIRTABLE_BASE_ID not set)');
    return { created: 0, skipped: leads.length };
  }

  console.log(`\nPushing ${leads.length} chamber leads to Airtable...`);

  // Check for existing entries by business name to avoid duplicates
  const existingNames = new Set<string>();
  let offset: string | undefined;
  do {
    const listUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?fields%5B%5D=Business+Name&pageSize=100${offset ? `&offset=${offset}` : ''}`;
    try {
      const res = await fetch(listUrl, {
        headers: { Authorization: `Bearer ${pat}` },
      });
      if (!res.ok) break;
      const data = await res.json() as { records: Array<{ fields: { 'Business Name'?: string } }>; offset?: string };
      for (const rec of data.records) {
        if (rec.fields['Business Name']) {
          existingNames.add(rec.fields['Business Name'].toLowerCase().trim());
        }
      }
      offset = data.offset;
    } catch {
      break;
    }
  } while (offset);

  const newLeads = leads.filter(l => !existingNames.has(l.name.toLowerCase().trim()));
  const skipped = leads.length - newLeads.length;

  if (skipped > 0) console.log(`  Skipping ${skipped} already-in-Airtable members`);
  if (newLeads.length === 0) {
    console.log('  No new chamber leads to add');
    return { created: 0, skipped };
  }

  let created = 0;
  for (let i = 0; i < newLeads.length; i += 10) {
    const batch = newLeads.slice(i, i + 10);
    const records = batch.map(l => ({
      fields: {
        'Business Name': l.name,
        'Entity ID': `chamber-${l.chamberId}-${l.name.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}`,
        'Entity Type': 'Chamber Member',
        'Formation Date': '',
        'City': l.city || '',
        'State': 'AL',
        'Address': l.address,
        'Registered Agent': '',
        'Priority': l.priority.charAt(0).toUpperCase() + l.priority.slice(1),
        'Matched Keywords': l.matchedKeywords.join(', '),
        'Has Website': l.hasWebsite ? 'Yes' : 'No',
        'Website URL': l.website || '',
        'SOS Detail URL': l.detailUrl,
        'Status': 'New',
        'Scan Date': new Date().toISOString().split('T')[0],
        'Source': l.source,
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
      if (res.ok) created += batch.length;
      else console.error(`  Airtable batch error: ${res.status}`);
    } catch (err) {
      console.error(`  Airtable error: ${(err as Error).message}`);
    }

    if (i + 10 < newLeads.length) await sleep(200);
  }

  console.log(`  Airtable: ${created} new chamber leads added, ${skipped} duplicates skipped`);
  return { created, skipped };
}

// --- Email Digest ---

async function sendEmailDigest(leads: ChamberLead[], scanDate: string): Promise<void> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const notifyEmail = (process.env.NOTIFY_EMAIL || '').trim();

  if (!apiKey || !notifyEmail) {
    console.log('\n  Email digest: Skipped (RESEND_API_KEY or NOTIFY_EMAIL not set)');
    return;
  }

  const high = leads.filter(l => l.priority === 'high');
  const medium = leads.filter(l => l.priority === 'medium');
  const noSite = leads.filter(l => !l.hasWebsite);

  if (high.length === 0 && medium.length === 0) {
    console.log('\n  Email digest: Skipped (no leads to report)');
    return;
  }

  console.log(`\nSending chamber digest to ${notifyEmail}...`);

  const makeRow = (l: ChamberLead, highlight: boolean) => `
    <tr${highlight ? ' style="background:#fef3c7"' : ''}>
      <td style="padding:8px;border:1px solid #ddd;${highlight ? 'font-weight:bold' : ''}">${l.name}</td>
      <td style="padding:8px;border:1px solid #ddd">${l.chamberName.replace('Chamber', '').trim()}</td>
      <td style="padding:8px;border:1px solid #ddd">${l.category || l.matchedKeywords.join(', ') || '—'}</td>
      <td style="padding:8px;border:1px solid #ddd">${!l.hasWebsite ? '<span style="color:#dc2626;font-weight:bold">NO WEBSITE</span>' : `<a href="${l.website}" style="color:#6B8F71">${l.website.replace(/^https?:\/\//, '').slice(0, 30)}</a>`}</td>
      <td style="padding:8px;border:1px solid #ddd">${l.phone || '—'}</td>
    </tr>`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:700px;margin:0 auto">
      <div style="background:#1C2826;padding:20px 24px;border-radius:8px 8px 0 0">
        <h1 style="color:#6B8F71;margin:0;font-size:22px">New Chamber Members Detected</h1>
        <p style="color:#F5F0EB;margin:4px 0 0;font-size:14px">NE Alabama chamber directory scan — ${scanDate}</p>
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

        <p style="color:#6B7280;font-size:13px;margin:0 0 16px">These businesses recently joined their local chamber — they're investing in growth and are prime prospects.</p>

        ${high.length > 0 ? `
        <h2 style="color:#1C2826;font-size:18px;margin:16px 0 8px">High Priority — Service Trade + No Website</h2>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden">
          <tr style="background:#1C2826;color:white">
            <th style="padding:8px;text-align:left">Business</th>
            <th style="padding:8px;text-align:left">Chamber</th>
            <th style="padding:8px;text-align:left">Category</th>
            <th style="padding:8px;text-align:left">Website</th>
            <th style="padding:8px;text-align:left">Phone</th>
          </tr>
          ${high.map(l => makeRow(l, true)).join('')}
        </table>
        ` : ''}

        ${medium.length > 0 ? `
        <h2 style="color:#1C2826;font-size:18px;margin:24px 0 8px">Medium Priority</h2>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden">
          <tr style="background:#6B8F71;color:white">
            <th style="padding:8px;text-align:left">Business</th>
            <th style="padding:8px;text-align:left">Chamber</th>
            <th style="padding:8px;text-align:left">Category</th>
            <th style="padding:8px;text-align:left">Website</th>
            <th style="padding:8px;text-align:left">Phone</th>
          </tr>
          ${medium.slice(0, 15).map(l => makeRow(l, false)).join('')}
          ${medium.length > 15 ? `<tr><td colspan="5" style="padding:8px;text-align:center;color:#6B7280">+ ${medium.length - 15} more (see Airtable)</td></tr>` : ''}
        </table>
        ` : ''}

        <div style="margin-top:24px;padding:16px;background:white;border-radius:8px;border:1px solid #ddd">
          <p style="margin:0 0 8px;font-weight:bold;color:#1C2826">Why chamber members are great leads:</p>
          <ol style="margin:0;padding-left:20px;color:#2D2D2D;font-size:14px">
            <li>They just paid for a chamber membership — they're growth-minded</li>
            <li>Businesses without websites need you the most</li>
            <li>Run existing sites through <a href="https://headleyweb.com/audit" style="color:#6B8F71">headleyweb.com/audit</a></li>
            <li>Mention you saw them join the chamber — builds immediate rapport</li>
          </ol>
        </div>
      </div>

      <div style="background:#1C2826;padding:12px 24px;border-radius:0 0 8px 8px;text-align:center">
        <p style="color:#6B7280;margin:0;font-size:12px">Automated chamber scan by Headley Web &amp; SEO</p>
      </div>
    </div>
  `;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Lead Scanner <leads@headleyweb.com>',
      to: notifyEmail,
      subject: `Chamber Scan: ${high.length} high-priority new members, ${noSite.length} without websites — ${scanDate}`,
      html,
    });
    console.log('  Email digest sent!');
  } catch (err) {
    console.error(`  Email error: ${(err as Error).message}`);
  }
}

// --- CSV Output ---

function toCSV(leads: ChamberLead[]): string {
  const headers = [
    'Priority', 'Name', 'Chamber', 'Category', 'City', 'Phone',
    'Has Website', 'Website URL', 'Matched Keywords', 'Detail URL',
  ];

  const rows = leads.map(l => [
    l.priority.toUpperCase(),
    `"${l.name.replace(/"/g, '""')}"`,
    l.chamberName,
    `"${l.category.replace(/"/g, '""')}"`,
    l.city,
    l.phone,
    l.hasWebsite ? 'YES' : 'NO',
    l.website || '',
    `"${l.matchedKeywords.join(', ')}"`,
    l.detailUrl,
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// --- Summary ---

function printSummary(leads: ChamberLead[], isFirstScan: boolean): void {
  const high = leads.filter(l => l.priority === 'high');
  const medium = leads.filter(l => l.priority === 'medium');
  const noSite = leads.filter(l => !l.hasWebsite);

  console.log('\n' + '='.repeat(60));
  console.log('CHAMBER MEMBER SCAN RESULTS');
  console.log('='.repeat(60));
  console.log(`New members detected:    ${leads.length}${isFirstScan ? ' (first scan — all treated as baseline)' : ''}`);
  console.log(`High priority leads:     ${high.length}`);
  console.log(`Medium priority leads:   ${medium.length}`);
  console.log(`No website detected:     ${noSite.length}`);
  console.log('='.repeat(60));

  if (high.length > 0) {
    console.log('\nHIGH PRIORITY (service trade + no website):');
    for (const l of high) {
      console.log(`  ${l.name}`);
      console.log(`    Chamber: ${l.chamberName} | Category: ${l.category || 'N/A'}`);
      console.log(`    Website: NONE — potential lead!`);
      if (l.phone) console.log(`    Phone: ${l.phone}`);
    }
  }

  if (medium.length > 0) {
    console.log('\nMEDIUM PRIORITY:');
    for (const l of medium.slice(0, 20)) {
      console.log(`  ${l.name} — ${l.chamberName}`);
      console.log(`    Website: ${l.hasWebsite ? l.website : 'NONE'}`);
    }
    if (medium.length > 20) {
      console.log(`  ... and ${medium.length - 20} more (see CSV)`);
    }
  }
}

// --- Main ---

async function main() {
  const { flags } = parseArgs();
  const skipAirtable = flags.has('airtable');
  const skipEmail = flags.has('email');
  const resetBaseline = flags.has('reset');

  const scanDate = new Date().toISOString().split('T')[0];

  console.log('Chamber of Commerce Member Scanner (Playwright)');
  console.log('='.repeat(40));
  console.log(`Chambers: ${CHAMBERS.map(c => c.name).join(', ')}`);
  console.log(`Airtable: ${skipAirtable ? 'disabled' : 'enabled'}`);
  console.log(`Email digest: ${skipEmail ? 'disabled' : 'enabled'}`);

  // Load previous scan data
  let seenData = loadSeenData();
  const isFirstScan = !seenData.lastScan || resetBaseline;

  if (resetBaseline) {
    console.log('\nReset flag set — clearing baseline, all members treated as new');
    seenData = { lastScan: null, chambers: {} };
  }

  // Launch headless browser once, reuse across all chambers
  console.log('\nLaunching headless browser...');
  const browser = await chromium.launch({ headless: true });

  const allNewLeads: ChamberLead[] = [];

  try {
    for (const chamber of CHAMBERS) {
      try {
        const currentMembers = await scrapeAllMembers(browser, chamber);

        if (currentMembers.length === 0) {
          console.log(`  ${chamber.name}: No members found (site may be blocking)`);
          continue;
        }

        const previousNames = seenData.chambers[chamber.id] || [];
        const newMembers = isFirstScan ? [] : findNewMembers(currentMembers, previousNames);

        // Update baseline with current full list
        seenData.chambers[chamber.id] = currentMembers.map(m => m.name);

        if (isFirstScan) {
          console.log(`  ${chamber.name}: Baseline established (${currentMembers.length} members saved)`);
        } else {
          console.log(`  ${chamber.name}: ${newMembers.length} new members since last scan`);
          if (newMembers.length > 0) {
            const scored = scoreMembers(newMembers);
            allNewLeads.push(...scored);
          }
        }
      } catch (err) {
        console.error(`  ${chamber.name}: Error — ${(err as Error).message}`);
      }
    }
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }

  // Save updated baseline
  seenData.lastScan = scanDate;
  saveSeenData(seenData);
  console.log(`\nBaseline saved to ${SEEN_FILE}`);

  if (isFirstScan) {
    console.log('\nFirst scan complete — baseline established.');
    console.log('Run again next week to detect new members.');
    console.log('Use --reset to re-establish baseline at any time.');
    return;
  }

  if (allNewLeads.length === 0) {
    console.log('\nNo new chamber members detected since last scan.');
    return;
  }

  // Sort by priority
  allNewLeads.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  // Print summary
  printSummary(allNewLeads, isFirstScan);

  // Push to Airtable
  const worthPushing = allNewLeads.filter(l => l.priority !== 'low');
  if (!skipAirtable && worthPushing.length > 0) {
    await pushToAirtable(worthPushing);
  }

  // Send email digest
  if (!skipEmail && worthPushing.length > 0) {
    await sendEmailDigest(worthPushing, scanDate);
  }

  // Write local files
  const outputPath = path.resolve(process.cwd(), `chamber-leads-${scanDate}.csv`);
  fs.writeFileSync(outputPath, toCSV(allNewLeads), 'utf-8');
  console.log(`\nCSV written to: ${outputPath}`);

  const jsonPath = outputPath.replace('.csv', '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allNewLeads, null, 2), 'utf-8');
  console.log(`JSON written to: ${jsonPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
