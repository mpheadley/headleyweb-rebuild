# headleyweb.com DNS Migration to Vercel

**Status:** Pending — see CRM task #327
**Trigger:** Email forwarding matt@headleyweb.com → mpheadley@gmail.com broken (root MX points to `smtp.google.com`, an SMTP send server, not a receive server — inbound mail being lost).

## Current state (2026-04-06)

- **Registrar:** Namecheap
- **Authoritative DNS:** Namecheap (`dns1.registrar-servers.com`, `dns2.registrar-servers.com`)
- **Hosting:** Vercel — domain attached but Vercel cannot manage DNS until nameservers are delegated

## Screenshots

- `vercel-domains-panel-2026-04-06.png` — Vercel Domains panel showing "This domain is registered with a Third Party. Nameserver changes must be made with your domain's registrar." SSL certs auto-renewing.
- `vercel-dns-records-2026-04-06.png` — Vercel DNS records panel. **Resend records already pre-staged in Vercel** (not yet live since Vercel isn't authoritative):
  - `send` TXT — `v=spf1 include:amazonses.com ~all`
  - `send` MX — `feedback-smtp.us-east-1.amazonses.com`
  - `resend._domainkey.send` TXT — Resend DKIM

## Vercel nameservers (from screenshot)

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

## Records to add in Vercel BEFORE flipping nameservers

Resend records above are already staged. Still need:

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | @ | 76.76.21.21 | Vercel apex |
| CNAME | www | cname.vercel-dns.com | Vercel www |
| MX | @ | aspmx.l.google.com (pri 1) | Google Workspace |
| MX | @ | alt1.aspmx.l.google.com (pri 5) | Google Workspace |
| MX | @ | alt2.aspmx.l.google.com (pri 5) | Google Workspace |
| MX | @ | alt3.aspmx.l.google.com (pri 10) | Google Workspace |
| MX | @ | alt4.aspmx.l.google.com (pri 10) | Google Workspace |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | **NEW — currently missing entirely** |
| TXT | @ | `google-site-verification=1BEwDDbPCNswq9i2k59C18_-frt7wIL5k9nRJeqpWHA` | preserve from Namecheap |
| TXT | @ | `google-site-verification=brCWeBqLimj-JMxffGg6Ud51VtAvdTBffPBufVAlvpA` | preserve from Namecheap |
| TXT | google._domainkey | (full v=DKIM1 string) | preserve from Namecheap — copy exact value |
| TXT | _dmarc | `v=DMARC1; p=none;` | preserve from Namecheap |

## Verify in Namecheap before cutover

- CAA records (if any)
- Additional verification TXTs not visible via public dig
- Take a screenshot of full Namecheap Advanced DNS panel as safety net

## Cutover sequence

1. Stage all records above in Vercel DNS (Resend records already done)
2. (Optional) Lower TTLs in Namecheap to 5 min, wait 1 hr to shrink propagation window
3. Namecheap → Domain List → headleyweb.com → Domain tab → Nameservers → Custom DNS → enter `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
4. Wait for `dig NS headleyweb.com` to return Vercel's nameservers
5. Verify:
   - Send mail to matt@headleyweb.com from a different account
   - Load https://headleyweb.com
   - Check Resend dashboard for domain status
   - Confirm DKIM still authenticating in Google Workspace Admin
6. Separate future task: registrar transfer Namecheap → Vercel at next renewal (different from DNS delegation, takes 5–7 days)

## Execution timeline (2026-04-06)

| Time | Event |
|------|-------|
| ~09:25 | DNS inventoried via dig, missing/broken records identified |
| ~09:42 | Started staging Google Workspace records in Vercel DNS |
| ~09:44 | All 10 new records confirmed in Vercel (5 MX, SPF, DKIM, DMARC, 2× site verification) |
| ~09:46 | Nameservers flipped at Namecheap (BasicDNS → Custom DNS → ns1/ns2.vercel-dns.com) |
| ~09:49 | Background poller detected NS propagation to Google's public resolver |
| ~09:50 | All 5 MX records verified live across Google, Cloudflare, Quad9 |
| ~09:51 | Live test email confirmed forwarding to mpheadley@gmail.com working |

**Total downtime:** Effectively zero — old MX was already broken, so the cutover only fixed things rather than risking outage.

**Surprises:**
- Vercel had Resend, CAA, and ALIAS records pre-staged from prior setup — fewer records to add than expected
- Namecheap UI hides DKIM record from default Host Records view, but it was being served by their nameservers (pulled value via dig instead)
- macOS Sequoia screenshot filenames contain U+202F narrow no-break space, breaking literal `mv` commands — glob patterns required

## Reference archive

- `vercel-domains-panel-2026-04-06.png` — Vercel Domains panel showing third-party DNS warning
- `vercel-dns-records-2026-04-06.png` — Vercel DNS pre-migration (only Resend/CAA/ALIAS records)
- `namecheap-advanced-dns-before-2026-04-06.png` — Namecheap Host Records + Mail Settings (broken state)
- `namecheap-advanced-dns-final-2026-04-06.png` — Namecheap final state pre-flip
