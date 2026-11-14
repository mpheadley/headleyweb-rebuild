# UTM Link Reference — Facebook Social Traffic

> Use these links in Facebook posts/captions so GA4 correctly attributes social traffic.
> Without UTM params, Facebook clicks often show up as "Direct" in GA4.

---

## How to Use

Paste the UTM link as the post URL. Everything after `?` is invisible to the reader — they just see your domain in the browser after clicking.

**Format:**
```
https://yourdomain.com/page?utm_source=facebook&utm_medium=social&utm_campaign=CAMPAIGN
```

---

## Headley Web & SEO (headleyweb.com)

### Standard post links
| Destination | UTM Link |
|---|---|
| Homepage | `https://headleyweb.com?utm_source=facebook&utm_medium=social&utm_campaign=hw` |
| Free audit | `https://headleyweb.com/audit?utm_source=facebook&utm_medium=social&utm_campaign=hw` |
| /card page | `https://headleyweb.com/card?utm_source=facebook&utm_medium=social&utm_campaign=hw` |

### Video posts (track separately)
| Destination | UTM Link |
|---|---|
| Free audit (from video) | `https://headleyweb.com/audit?utm_source=facebook&utm_medium=social&utm_campaign=hw-video` |
| Homepage (from video) | `https://headleyweb.com?utm_source=facebook&utm_medium=social&utm_campaign=hw-video` |

### Campaign-specific
| Campaign | UTM Link |
|---|---|
| BNI referral post | `https://headleyweb.com/audit?utm_source=facebook&utm_medium=social&utm_campaign=hw-bni` |
| Walk-in follow-up | `https://headleyweb.com?utm_source=facebook&utm_medium=social&utm_campaign=hw-walkin` |

---

## Southern Legends (southernlegends.blog)

### Standard post links
| Destination | UTM Link |
|---|---|
| Homepage | `https://southernlegends.blog?utm_source=facebook&utm_medium=social&utm_campaign=sl` |
| Journal index | `https://southernlegends.blog/journal?utm_source=facebook&utm_medium=social&utm_campaign=sl` |
| Profiles index | `https://southernlegends.blog/profiles?utm_source=facebook&utm_medium=social&utm_campaign=sl` |

### Profile share links (add `&utm_content=SLUG`)
| Profile | UTM Link |
|---|---|
| AQuality Farms | `https://southernlegends.blog/profiles/aquality-farms?utm_source=facebook&utm_medium=social&utm_campaign=sl&utm_content=aquality-farms` |
| Mom to Go | `https://southernlegends.blog/profiles/mom-to-go?utm_source=facebook&utm_medium=social&utm_campaign=sl&utm_content=mom-to-go` |
| Shannon Jenkins | `https://southernlegends.blog/profiles/shannon-jenkins?utm_source=facebook&utm_medium=social&utm_campaign=sl&utm_content=shannon-jenkins` |
| New profiles | Replace slug: `https://southernlegends.blog/profiles/SLUG?utm_source=facebook&utm_medium=social&utm_campaign=sl&utm_content=SLUG` |

### Journal posts (add `&utm_content=SLUG`)
| Post | UTM Link |
|---|---|
| Template | `https://southernlegends.blog/journal/POST-SLUG?utm_source=facebook&utm_medium=social&utm_campaign=sl&utm_content=POST-SLUG` |

---

## Heather's Florals (heatherflorals.com)

### Standard post links
| Destination | UTM Link |
|---|---|
| Homepage | `https://heatherflorals.com?utm_source=facebook&utm_medium=social&utm_campaign=heather` |
| Booking/contact | `https://heatherflorals.com/contact?utm_source=facebook&utm_medium=social&utm_campaign=heather` |

### Seasonal / campaign
| Campaign | UTM Link |
|---|---|
| Wedding season | `https://heatherflorals.com?utm_source=facebook&utm_medium=social&utm_campaign=heather-wedding` |
| Local market post | `https://heatherflorals.com?utm_source=facebook&utm_medium=social&utm_campaign=heather-market` |

---

## Between Worlds (when site launches)

| Destination | UTM Link |
|---|---|
| Homepage | `https://[domain]?utm_source=facebook&utm_medium=social&utm_campaign=bw` |
| Booking | `https://[domain]/booking?utm_source=facebook&utm_medium=social&utm_campaign=bw` |

> Fill in domain after site launches. Same structure as above.

---

## GA4 — Where to Find This Data

**Reports → Acquisition → Traffic Acquisition**
- Filter: Session source / medium = `facebook / social`
- Or filter by campaign: `hw`, `sl`, `heather`

**Reports → Acquisition → Traffic Acquisition → Campaign**
- See `hw-video` vs `hw` to compare video-driven traffic vs standard posts

---

## Quick Reference — UTM Parameters

| Parameter | What it tracks | Values to use |
|---|---|---|
| `utm_source` | Where traffic came from | `facebook` |
| `utm_medium` | Channel type | `social` |
| `utm_campaign` | Which property/initiative | `hw`, `sl`, `heather`, `bw` |
| `utm_content` | Which specific post/piece | profile slug, post slug, `video` |

`utm_content` is optional — use it for SL profiles so you can see which profiles drive the most traffic from Facebook.
