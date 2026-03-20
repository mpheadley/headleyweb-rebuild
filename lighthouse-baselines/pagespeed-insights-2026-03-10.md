# PageSpeed Insights — headleyweb.com
## Date: March 10, 2026

### Mobile
| Category | Score |
|---|---|
| Performance | Error (NO_LCP — Largest Contentful Paint not detected) |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

**Core Web Vitals (Mobile):**
- First Contentful Paint: 2.9s
- Largest Contentful Paint: Error (NO_LCP)
- Total Blocking Time: Error (NO_LCP)
- Cumulative Layout Shift: 0
- Speed Index: 5.1s

**Issues:**
- NO_LCP: Google can't detect the LCP element — likely a Next.js SSR/hydration issue. See PLAN.md Known Issues.
- Contrast: Background/foreground color contrast failure flagged under Accessibility.
- Minify CSS/JS, reduce unused CSS/JS, avoid long main-thread tasks flagged as diagnostics.

### Lighthouse CLI Baseline (same day)
| Category | Mobile | Desktop |
|---|---|---|
| Performance | N/A (same NO_LCP issue) | N/A |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Reports saved as:
- lighthouse-mobile-2026-03-10.report.html
- lighthouse-mobile-2026-03-10.report.json
- lighthouse-desktop-2026-03-10.report.html
- lighthouse-desktop-2026-03-10.report.json
