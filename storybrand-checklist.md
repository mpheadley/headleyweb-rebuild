# StoryBrand Website Scoring Checklist

**Source:** Headley Web & SEO's StoryBrand research and implementation experience.
**Used by:** The automated copy scraper + Matt's manual review in the internal audit view.

---

## How Scoring Works

Each item is scored 0, 1, or 2:
- **0** = Missing or doing it wrong
- **1** = Present but weak or unclear
- **2** = Nailed it

**Total possible: 40 points** (20 items × 2 points each)

| Score Range | Grade | What It Means |
|-------------|-------|---------------|
| 34-40 | A | StoryBrand-aligned — this site sells |
| 26-33 | B | Good foundation, needs tightening |
| 18-25 | C | Has pieces, but the message is muddled |
| 10-17 | D | Talking about yourself, not the customer |
| 0-9 | F | Digital brochure — not a sales tool |

---

## Section 1: Hero / Above the Fold (12 points possible)

### 1.1 Customer Problem in Headline (0-2)
The hero headline should address the customer's problem or desired outcome — NOT the business name, founding year, or "Welcome to..."
- **0:** Headline is about the business ("Welcome to ABC Plumbing", "Trusted Since 2005")
- **1:** Headline mentions the customer but is vague ("We're here to help")
- **2:** Headline directly names the customer's problem or desired result ("Your pipes are leaking and you need it fixed today")

**Auto-detect signals:**
- FAIL: Headline starts with "Welcome", "About", company name, or "We"
- FAIL: Headline contains founding year or "since [year]"
- PASS: Headline contains "you", "your", or second-person language

### 1.2 Clear Value Proposition (0-2)
Can a stranger tell what this business does and why it matters within 5 seconds?
- **0:** No clear statement of what they do or who they serve
- **1:** What they do is stated but buried or jargon-heavy
- **2:** Crystal clear — trade, location, and benefit in plain English

**Auto-detect signals:**
- Check for trade/industry keywords in first 200 characters
- Check for location/city mentions
- Check for benefit language ("save", "fix", "get", "stop", "help")

### 1.3 Direct Call to Action Above the Fold (0-2)
A visible button or link that tells the visitor exactly what to do next.
- **0:** No CTA above the fold, or CTA is "Learn More"
- **1:** CTA exists but is soft ("Explore Services", "Learn More")
- **2:** Direct CTA ("Call Now", "Get a Free Quote", "Book Today", "Schedule a Repair")

**Auto-detect signals:**
- Look for button/link elements in first screenful
- FAIL: CTA text is "Learn More", "Read More", "Explore", "Discover"
- PASS: CTA text contains "Call", "Book", "Schedule", "Get", "Start", "Free"

### 1.4 Sub-headline Expands the Story (0-2)
Below the headline, a sentence that deepens the value proposition.
- **0:** No sub-headline or it's just a tagline
- **1:** Sub-headline exists but repeats the headline or is vague
- **2:** Sub-headline adds specifics — how it works, what makes them different, or what the customer gets

### 1.5 No "We" Disease in Hero (0-2)
The hero section should NOT lead with first person (we, our, I, my company).
- **0:** Hero is dominated by "we", "our", "I", "my"
- **1:** Mix of "we" and "you" language
- **2:** Primarily "you/your" language — customer-centered

**Auto-detect signals:**
- Count first-person pronouns (we, our, us, I, my) vs second-person (you, your) in hero section
- Ratio of you/your to we/our should be > 1.5

### 1.6 The Three Questions Answered (0-2)
Within 5 seconds, can a visitor answer: (1) What do you offer? (2) How does it make my life better? (3) What do I do next?
- **0:** None or one answered above the fold
- **1:** Two of three answered
- **2:** All three clearly answered above the fold

---

## Section 2: Problem (4 points possible)

### 2.1 External Problem Stated (0-2)
The tangible problem the customer faces is named clearly.
- **0:** No mention of the customer's problem
- **1:** Problem is implied but not directly stated
- **2:** Problem is named in plain language ("Your AC broke", "Your website isn't generating leads")

**Auto-detect signals:**
- Look for pain-point language: "broken", "not working", "losing", "struggling", "frustrated", "overwhelmed", "can't find", "no calls"

### 2.2 Internal/Emotional Problem Addressed (0-2)
How the problem makes the customer FEEL — frustration, embarrassment, overwhelm, worry.
- **0:** Only external/practical problem mentioned
- **1:** Emotional language present but generic
- **2:** Specific emotional language ("You're tired of...", "It's embarrassing when...", "You shouldn't have to worry about...")

**Auto-detect signals:**
- Look for emotional vocabulary: "frustrated", "embarrassed", "overwhelmed", "worried", "stressed", "tired of", "sick of", "shouldn't have to"

---

## Section 3: Guide (4 points possible)

### 3.1 Empathy (0-2)
Does the business show they understand the customer's struggle?
- **0:** No empathy language — all credentials and features
- **1:** Generic empathy ("We understand your needs")
- **2:** Specific empathy ("I know how frustrating it is when customers can't find you online")

**Auto-detect signals:**
- Look for: "I know", "I understand", "I've been there", "I've seen", "it's frustrating", "you deserve"
- Check for absence of empathy (100% features/credentials = 0)

### 3.2 Authority (0-2)
Does the business demonstrate competence without making themselves the hero?
- **0:** No authority signals, or authority dominates over empathy
- **1:** Authority present but generic ("years of experience", "dedicated team")
- **2:** Specific authority — credentials, results, testimonials, case studies, numbers

**Auto-detect signals:**
- Look for: review counts, years of experience, certifications, "helped [X] businesses", testimonial quotes
- FAIL if authority section exists but empathy section does not (guide needs both)

---

## Section 4: Plan (4 points possible)

### 4.1 Simple Step-by-Step Plan (0-2)
A clear 3-step (or similar) plan that shows the customer what to do.
- **0:** No plan section, or a complex multi-step process
- **1:** Steps exist but are vague or more than 4 steps
- **2:** 3 clear, simple steps that make the process feel easy and risk-free

**Auto-detect signals:**
- Look for numbered lists or "step 1/2/3" patterns
- Look for "how it works" headings
- Check step count (3 is ideal, 2-4 is acceptable, 5+ is too many)

### 4.2 Plan Reduces Risk (0-2)
The plan should make taking action feel safe, not scary.
- **0:** Plan makes the process sound complicated or high-commitment
- **1:** Plan is simple but doesn't address risk
- **2:** Plan includes risk-reducers — "free", "no obligation", "you don't pay until", "cancel anytime"

**Auto-detect signals:**
- Look for risk-reducing language: "free", "no obligation", "no contract", "money back", "guarantee", "risk-free", "cancel anytime"

---

## Section 5: Call to Action (4 points possible)

### 5.1 Direct CTA Repeated Throughout (0-2)
The primary CTA should appear multiple times — not just once in the hero.
- **0:** CTA appears once or not at all
- **1:** CTA appears 2 times
- **2:** CTA appears 3+ times throughout the page

**Auto-detect signals:**
- Count instances of primary CTA button/link text throughout the page

### 5.2 CTA Language is Action-Oriented (0-2)
The CTA button text should be a clear verb phrase, not passive.
- **0:** Vague CTA ("Submit", "Click Here", "Learn More")
- **1:** Decent but could be stronger ("Contact Us", "Get In Touch")
- **2:** Strong, specific action ("Get Your Free Quote", "Schedule My Repair", "Call Now")

**Auto-detect signals:**
- FAIL: "Submit", "Click Here", "Learn More", "Read More", "Explore"
- WEAK: "Contact Us", "Get In Touch", "Reach Out"
- PASS: "Get", "Book", "Schedule", "Call", "Start", "Claim" + specific outcome

---

## Section 6: Stakes (4 points possible)

### 6.1 Failure/Consequences Stated (0-2)
What happens if the customer does nothing?
- **0:** No mention of consequences — no urgency
- **1:** Generic consequences ("Don't miss out", "Act now")
- **2:** Specific, honest consequences ("Every month without a working website, your competitors are getting the calls that should be going to you")

**Auto-detect signals:**
- Look for consequence language: "losing", "missing out", "competitors", "falling behind", "costing you", "every day/week/month without"
- Look for negative outcome descriptions

### 6.2 Success/Transformation Painted (0-2)
What does life look like after they work with you?
- **0:** No vision of the outcome — just features and process
- **1:** Generic success ("You'll love the results")
- **2:** Specific success picture ("Your phone rings with qualified leads", "You show up first on Google", "You stop worrying about where your next customer is coming from")

**Auto-detect signals:**
- Look for future-tense benefit language: "you'll", "your phone will", "you'll show up", "you'll stop", "imagine", "picture this"
- Look for specific outcomes vs vague promises

---

## Section 7: Technical Messaging (4 points possible)

### 7.1 No Jargon (0-2)
Copy should be in plain English, not industry buzzwords.
- **0:** Heavy jargon ("comprehensive solutions", "industry-leading", "synergy", "leveraging")
- **1:** Some jargon mixed with plain language
- **2:** Reads like a human conversation — language the customer would actually use

**Auto-detect signals:**
- FAIL words: "comprehensive", "solutions", "industry-leading", "leverage", "synergy", "utilize", "optimize" (when customer-facing), "cutting-edge", "state-of-the-art", "world-class"

### 7.2 Phone Number / Contact Visible (0-2)
For local service businesses, the phone number should be immediately findable.
- **0:** No phone number visible, or only in footer
- **1:** Phone number on contact page but not prominent on homepage
- **2:** Phone number visible in header/hero, clickable on mobile

**Auto-detect signals:**
- Search for phone number patterns (xxx-xxx-xxxx, (xxx) xxx-xxxx)
- Check if it appears in header/nav or hero section vs only in footer

---

## Automated vs. Manual Scoring

| Item | Can Auto-Score? | Notes |
|------|----------------|-------|
| 1.1 Customer Problem in Headline | Partial | Can detect "Welcome to" / first-person, but quality needs human judgment |
| 1.2 Clear Value Proposition | Partial | Can check for trade + location keywords |
| 1.3 Direct CTA Above Fold | Yes | Button text analysis |
| 1.4 Sub-headline Quality | Manual | Needs human judgment |
| 1.5 No "We" Disease | Yes | Pronoun ratio calculation |
| 1.6 Three Questions | Manual | Needs human judgment |
| 2.1 External Problem | Partial | Pain-point keyword detection |
| 2.2 Internal Problem | Partial | Emotional vocabulary detection |
| 3.1 Empathy | Partial | Empathy phrase detection |
| 3.2 Authority | Partial | Credential/testimonial detection |
| 4.1 Simple Plan | Partial | Step pattern detection |
| 4.2 Plan Reduces Risk | Yes | Risk-reducer keyword detection |
| 5.1 CTA Repeated | Yes | CTA count |
| 5.2 CTA Language | Yes | Button text analysis |
| 6.1 Failure Stated | Partial | Consequence language detection |
| 6.2 Success Painted | Partial | Future benefit language detection |
| 7.1 No Jargon | Yes | Jargon word detection |
| 7.2 Phone Visible | Yes | Phone number pattern detection |

**Auto-scorable items:** ~12 of 20 can get a reasonable automated score.
**Always needs Matt:** Items 1.4, 1.6 (subjective clarity), and quality judgment on all "Partial" items.
