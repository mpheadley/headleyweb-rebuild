export type Location = {
  slug: string;
  name: string;
  county: string;
  zip: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSub: string;
  /** Path to hero background image in /public/images/locations/ */
  heroImage: { src: string; alt: string; credit?: string };
  /** Opening paragraph of local context */
  localIntro: string;
  /** Additional body paragraphs for richer city-specific content (300–500 words total with localIntro) */
  bodyParagraphs?: string[];
  /** Client types commonly served in this market */
  clientTypes?: { type: string; examples: string }[];
  /** Outbound editorial links (e.g., Southern Legends profiles) shown in an "Explore [City]" block */
  editorialLinks?: { label: string; href: string; description: string }[];
  /** 3-4 bullet points about why businesses in this city need a website */
  whyHere: { title: string; desc: string }[];
  /** Nearby cities to cross-link */
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "anniston",
    name: "Anniston",
    county: "Calhoun County",
    zip: "36201",
    metaTitle: "Web Design in Anniston, AL | Headley Web & SEO",
    metaDescription:
      "Custom web design and local SEO for Anniston, Alabama businesses. Get found on Google by Army Depot families, Noble Street foot traffic, and Calhoun County customers. Flat-rate pricing from $495. No contracts.",
    heroHeadline: "Web Design for Anniston Businesses",
    heroSub:
      "Calhoun County's largest city deserves a web presence to match. I build websites that make sure your Anniston customers find you first.",
    heroImage: { src: "/images/locations/anniston-hero.webp", alt: "Anniston, Alabama", credit: "Rivers Langley / CC BY-SA 3.0" },
    localIntro:
      "Anniston is Calhoun County's largest city, and the customer base here is real. Army Depot families, Noble Street foot traffic, neighborhoods stretching across every zip code in the 362 exchange — they all search Google before they make a call. If your business doesn't show up, that call goes to whoever does. I ran a business in Anniston for four years. I know this market.",
    bodyParagraphs: [
      "The Anniston Army Depot is the economic anchor of this city. Thousands of civilian employees, contractors, and military families live in and around Anniston — and they spend locally. A family that relocates for a Depot position doesn't know a plumber or a dentist or a good mechanic yet. They search Google. Businesses that show up in those searches get calls before they've even hung out a sign.",
      "Noble Street is having a moment. The downtown revival is real — new restaurants, small shops, creative businesses filling storefronts that sat empty for years. That momentum brings foot traffic, but it also brings search traffic. People drive to Anniston specifically looking for what's new, and they discover it the same way they discover everything else: on their phone, before they leave home.",
      "The residential neighborhoods stretching out from downtown toward Oxford, toward Bynum, toward Golden Springs — those are working families who need trades, services, healthcare, and food. They're loyal customers once you earn them. But earning them starts with being findable. Most Anniston businesses have a Facebook page and maybe a Google Business Profile that hasn't been touched in two years. That's not a web presence. That's a placeholder. I build the real thing.",
    ],
    clientTypes: [
      { type: "Trades & Contractors", examples: "HVAC, plumbing, electrical, roofing, insulation, pest control" },
      { type: "Healthcare & Medical", examples: "Family practices, dentists, chiropractors, urgent care, specialists" },
      { type: "Auto & Transportation", examples: "Auto repair, tire shops, towing, detailing, car lots" },
      { type: "Restaurants & Food", examples: "Downtown dining, takeout, catering, food trucks" },
      { type: "Beauty & Personal Care", examples: "Hair salons, barbers, nail salons, spas, tattoo studios" },
      { type: "Professional Services", examples: "Law offices, insurance agencies, financial advisors, CPAs" },
    ],
    editorialLinks: [
      {
        label: "Freedom Riders National Monument",
        href: "https://southernlegends.blog/profiles/freedom-riders-national-monument",
        description: "The Greyhound station where Freedom Riders were attacked in 1961 is now a national monument — one of the most significant civil rights sites in Alabama.",
      },
      {
        label: "Anniston Museum of Natural History & Arts",
        href: "https://southernlegends.blog/profiles/anniston-museums-gardens",
        description: "Two world-class museums and a garden in a mid-size Alabama city. The kind of thing that surprises people who've written Anniston off.",
      },
    ],
    whyHere: [
      { title: "Calhoun County's Largest City", desc: "Anniston anchors the county. More population, more search volume, more calls to win — if you're showing up." },
      { title: "Army Depot Economy", desc: "Thousands of Depot employees and military families search locally for everything from HVAC to haircuts. A strong web presence puts you first in line." },
      { title: "Noble Street Revival", desc: "Downtown Anniston is growing again. New foot traffic means new search traffic — and new customers who don't know anyone to ask for a recommendation." },
      { title: "I Know This Market", desc: "Headley Flower Farm operated in Anniston for four years. I'm not guessing at the customer base here. I lived it." },
    ],
    nearby: ["oxford", "jacksonville", "talladega", "weaver"],
  },
  {
    slug: "oxford",
    name: "Oxford",
    county: "Calhoun County",
    zip: "36203",
    metaTitle: "Web Design in Oxford, AL",
    metaDescription:
      "Custom web design and local SEO for Oxford, Alabama businesses. Rank on Google near the Oxford Exchange and across Calhoun County. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Oxford Businesses",
    heroSub:
      "Oxford is where Calhoun County shops. If your business isn't showing up when locals search, you're losing customers every day.",
    heroImage: { src: "/images/locations/oxford-hero.webp", alt: "Oxford, Alabama", credit: "Rivers Langley / CC BY-SA 3.0" },
    localIntro:
      "Oxford is the commercial center of Calhoun County, and the numbers back that up. The Oxford Exchange alone brings hundreds of thousands of shoppers through the 36203 zip code every year. Honda Manufacturing is a few miles away. The Talladega Superspeedway pulls race traffic through the corridor twice a year. All of those people are searching on their phones for local services before they ever pull into a parking lot. I build websites for the businesses that want to be what they find.",
    whyHere: [
      { title: "Retail & Commercial Hub", desc: "Oxford is where the county comes to spend money. Your website needs to capture that traffic online too." },
      { title: "Honda Manufacturing Workforce", desc: "Thousands of Honda employees live and spend locally. Be the business they find first." },
      { title: "Superspeedway Weekends", desc: "Race traffic brings thousands of visitors searching for local services. A strong website captures that demand." },
      { title: "Highway 21 Corridor", desc: "The busiest commercial stretch in the county. Your digital storefront should work as hard as your physical one." },
    ],
    nearby: ["anniston", "jacksonville", "talladega", "piedmont"],
  },
  {
    slug: "gadsden",
    name: "Gadsden",
    county: "Etowah County",
    zip: "35901",
    metaTitle: "Web Design in Gadsden, AL | Headley Web & SEO",
    metaDescription:
      "Custom web design and local SEO for Gadsden, Alabama businesses. Get found on Google by Etowah County customers near Noccalula Falls and Broad Street. Flat-rate pricing from $495. No contracts.",
    heroHeadline: "Web Design for Gadsden Businesses",
    heroSub:
      "Gadsden businesses deserve better than a Facebook page and a prayer. I build websites that actually get you found on Google.",
    heroImage: { src: "/images/locations/gadsden-hero.webp", alt: "Noccalula Falls, Gadsden, Alabama", credit: "Thejammer / Public Domain" },
    localIntro:
      "Gadsden is the seat of Etowah County — it's been here long enough to have an opinion about things. Noccalula Falls. Broad Street. A trades market that runs deep. The problem isn't a lack of customers. It's that most Gadsden businesses are invisible to anyone who's new in town or searching from their phone. When someone types \"HVAC in Gadsden\" or \"best dentist near me,\" they call whoever Google shows them. That's usually not the best business in town. It's the one with the best website.",
    bodyParagraphs: [
      "In a city Gadsden's size, the gap between showing up and not showing up is measurable. The phone either rings or it doesn't, and the website is usually the reason. Most established Gadsden businesses run on reputation and referrals — which works fine until someone new to the area needs what you do. They don't ask around. They search Google, call the first result that looks credible, and move on. That's a customer your reputation never got a chance to earn.",
      "Noccalula Falls Park draws visitors from across the Southeast — families on weekend trips, hikers, school groups, people making a day of it from Birmingham or Huntsville. Those visitors are searching on their phones before they ever arrive: where to eat, what's nearby, where to stop on the way home. Businesses close to the Falls with a clean, optimized website are the ones they find. Most don't have one.",
      "Broad Street is finding itself again — new restaurants, renovated storefronts, a downtown earning a second look. But Gadsden's real economy runs on trades. The plumbers, HVAC companies, roofers, and electricians covering Etowah County — Attalla, Rainbow City, Glencoe, Southside — need a web presence that matches their actual service area, not just their city limits. I build sites that rank across the whole county, because that's where the work is.",
    ],
    clientTypes: [
      { type: "Trades & Contractors", examples: "HVAC, plumbing, electrical, roofing, pest control, landscaping" },
      { type: "Restaurants & Food", examples: "Broad Street dining, takeout, catering, coffee shops, food trucks" },
      { type: "Healthcare & Medical", examples: "Family practices, dentists, chiropractors, physical therapists, urgent care" },
      { type: "Auto & Marine", examples: "Auto repair, towing, detailing, boat service and repair" },
      { type: "Retail & Specialty", examples: "Boutiques, hardware, outdoor gear, pet services, sporting goods" },
      { type: "Home Services", examples: "Painters, house cleaners, handymen, pressure washing, pool service" },
    ],
    editorialLinks: [
      {
        label: "Noccalula Falls Park",
        href: "https://southernlegends.blog/profiles/noccalula-falls",
        description: "Gadsden's signature landmark — a 90-foot waterfall inside a park that's been drawing visitors since the 1930s. One of the most photographed places in Northeast Alabama.",
      },
    ],
    whyHere: [
      { title: "Etowah County Seat", desc: "Gadsden is the commercial center for the whole county. A website built for this market should rank across Attalla, Rainbow City, Glencoe, and Southside — not just one zip code." },
      { title: "Noccalula Falls Tourism", desc: "Visitors from across the Southeast search for food, services, and experiences nearby. A well-optimized site puts your business in front of that traffic before they arrive." },
      { title: "Broad Street Revival", desc: "Downtown Gadsden is earning a second look. New foot traffic means customers who don't have existing loyalties — they find whoever shows up online." },
      { title: "Deep Trades Market", desc: "Gadsden's trades economy is strong and underserved online. First-mover advantage is real for any contractor willing to show up on Google." },
    ],
    nearby: ["anniston", "centre", "rainbow-city"],
  },
  {
    slug: "jacksonville",
    name: "Jacksonville",
    county: "Calhoun County",
    zip: "36265",
    metaTitle: "Web Design in Jacksonville, AL | Headley Web & SEO",
    metaDescription:
      "Custom web design and local SEO for Jacksonville, Alabama businesses. Get found on Google by JSU students, families, and locals searching right now. Flat-rate pricing from $495. No contracts.",
    heroHeadline: "Web Design for Jacksonville Businesses",
    heroSub:
      "I live here. I work here. And I build websites for businesses right here in Jacksonville that actually show up when locals search.",
    heroImage: { src: "/images/locations/jacksonville-hero.webp", alt: "Jacksonville, Alabama public square", credit: "Thomson200 / CC0" },
    localIntro:
      "Jacksonville is home. My kids go to school here. I built Headley Web & SEO here because I watched good local businesses lose customers to competitors with worse work but better websites. I know who the competition is and where the foot traffic flows. Your next customer is probably searching Google right now. They're going to call whoever shows up first.",
    bodyParagraphs: [
      "Jacksonville State University sets the rhythm for this town. The student population keeps restaurants, coffee shops, and service businesses busy through the school year. Gamecock football weekends bring traffic that rivals any market day. Every August, a new class of students and families arrives — and every one of them is searching Google for the nearest pizza place, a trusted mechanic, a good dentist. They don't have a neighbor to ask yet. They call whoever shows up first.",
      "Beyond JSU, Jacksonville runs on a solid trades economy. HVAC companies, plumbers, electricians, roofers, and lawn services cover the neighborhoods stretching toward Weaver, Alexandria, and Piedmont. The square still draws lunch crowds. Local medical offices, chiropractors, and dental practices compete for patients who'd rather stay close to home than drive 20 minutes to Anniston. Most of those patients make that decision on their phone — based on what Google shows them, not a yard sign.",
      "Most Jacksonville businesses still run on referrals and a Facebook page that last got updated before the pandemic. That holds onto existing customers. It does nothing for the person searching Google right now who doesn't know you exist. Even in a small town, the business with the best online presence wins the call. I built Headley Web & SEO here precisely because I know this market — and I know how much is being left on the table.",
    ],
    clientTypes: [
      { type: "Trades & Contractors", examples: "HVAC, plumbing, electrical, roofing, lawn care and landscaping" },
      { type: "Restaurants & Food Service", examples: "Campus-area restaurants, coffee shops, food trucks, catering" },
      { type: "Health & Wellness", examples: "Chiropractors, dentists, physical therapists, family medical practices" },
      { type: "Beauty & Personal Care", examples: "Hair salons, barbers, nail salons, massage therapists" },
      { type: "Home Services", examples: "Painters, handymen, house cleaners, pest control" },
      { type: "Specialty & Retail", examples: "Auto repair, florists, pet grooming, tutoring services" },
    ],
    whyHere: [
      { title: "JSU Student & Family Market", desc: "Thousands of students and their families search locally every day — for food, trades, health services, and more. Your website should be what they find." },
      { title: "Your Web Designer Lives Here", desc: "I'm not a remote agency pitching Jacksonville from three states away. I'm a neighbor who knows this market, these streets, and these search patterns firsthand." },
      { title: "Small Town, Real Competition", desc: "Even in a town this size, the business with the best online presence wins the call. Word of mouth gets you started. Google keeps the phone ringing." },
      { title: "Pelham Road & Town Square", desc: "On the main commercial drag or a side street, Google doesn't care about your physical location. Only your digital one." },
    ],
    nearby: ["anniston", "oxford", "piedmont"],
  },
  {
    slug: "talladega",
    name: "Talladega",
    county: "Talladega County",
    zip: "35160",
    metaTitle: "Web Design in Talladega, AL",
    metaDescription:
      "Custom web design and local SEO for Talladega, Alabama businesses. Get found on Google by locals and Superspeedway visitors. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Talladega Businesses",
    heroSub:
      "Talladega gets millions of visitors a year for the Superspeedway. Your website should be working just as hard to bring in local customers year-round.",
    heroImage: { src: "/images/locations/talladega-hero.webp", alt: "Talladega, Alabama courthouse square", credit: "Rivers Langley / CC BY-SA 3.0" },
    localIntro:
      "Talladega has the Superspeedway, and that's what the rest of the country knows it for. The local economy runs on something quieter. Every contractor and HVAC company and restaurant in the county serves customers who search Google before they make a call. The business that shows up first wins. Most Talladega businesses aren't showing up at all. The courthouse square and the neighborhoods stretching out toward Lincoln and Sylacauga aren't going to search themselves. I build websites for businesses that want to be found when they do.",
    whyHere: [
      { title: "Superspeedway Traffic", desc: "Race weekends bring massive search volume. A strong website captures visitors looking for local services." },
      { title: "Talladega County Seat", desc: "As the county hub, your business should dominate local search, not hide behind a Facebook page." },
      { title: "Lincoln & Sylacauga Reach", desc: "Serve the surrounding area? Your website should rank across the whole county, not just one zip code." },
      { title: "Historic Downtown", desc: "Talladega's downtown is full of character. Your website should have the same: professional, clear, built to convert." },
    ],
    nearby: ["anniston", "oxford"],
  },
  {
    slug: "alexandria",
    name: "Alexandria",
    county: "Calhoun County",
    zip: "36250",
    metaTitle: "Web Design in Alexandria, AL",
    metaDescription:
      "Custom web design and local SEO for Alexandria, Alabama businesses. Get found on Google by Calhoun County customers between Jacksonville and Anniston. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Alexandria Businesses",
    heroSub:
      "Alexandria sits right between Jacksonville and Anniston. Your customers are already searching. Make sure they find you.",
    heroImage: { src: "/images/locations/alexandria-hero.webp", alt: "Janney Furnace Park, Calhoun County, Alabama", credit: "dofftoubab / Wikimedia Commons / CC BY-SA 3.0" },
    localIntro:
      "The thing about Alexandria is that most businesses here still run on word of mouth. That works fine until someone moves in from Anniston and searches Google before they know a single person to ask. They don't ask around. They call whoever shows up first. Most Alexandria businesses aren't showing up. Not because the work is bad. Because there's no web presence to find. Between Jacksonville and Anniston on Highway 21, real search traffic passes through this zip code every day. I build the kind of site that captures it.",
    whyHere: [
      { title: "Between Two Markets", desc: "Alexandria sits between Jacksonville and Anniston. A well-built site can pull customers from both cities." },
      { title: "Growing Residential Base", desc: "New residents search online for everything. They don't have existing loyalties to local businesses yet." },
      { title: "Low Online Competition", desc: "Almost no Alexandria businesses have a professional web presence. First mover advantage is real here." },
      { title: "Highway 21 Visibility", desc: "Real traffic passes through town every day. Your online presence should match your physical one." },
    ],
    nearby: ["jacksonville", "anniston", "oxford"],
  },
  {
    slug: "piedmont",
    name: "Piedmont",
    county: "Calhoun County",
    zip: "36272",
    metaTitle: "Web Design in Piedmont, AL",
    metaDescription:
      "Custom web design and local SEO for Piedmont, Alabama businesses. Get found on Google by Calhoun County customers. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Piedmont Businesses",
    heroSub:
      "Piedmont is a tight-knit community where word travels fast. Your next customer is still searching Google first.",
    heroImage: { src: "/images/locations/piedmont-hero.webp", alt: "Cheaha Mountain near Piedmont, Alabama", credit: "Skye Marthaler / CC BY-SA 4.0" },
    localIntro:
      "Piedmont sits at the foot of Cheaha Mountain in the eastern corner of Calhoun County. It's a tight community. People know each other and they refer business to people they trust. That works fine until someone moves in and doesn't know anyone to ask. They search Google instead. Most Piedmont businesses aren't showing up for those searches. A well-built website changes that.",
    whyHere: [
      { title: "Calhoun County's Eastern Anchor", desc: "Piedmont serves the eastern edge of the county. Customers searching nearby should find you, not a competitor in Anniston." },
      { title: "Cheaha Mountain Gateway", desc: "Outdoor visitors and Cheaha State Park traffic search locally. A website puts your business in front of that audience." },
      { title: "Loyal Local Market", desc: "Piedmont customers stay local when they can find local. A professional site is often all it takes." },
      { title: "Under-Served Online", desc: "Most Piedmont businesses have no real web presence. First mover advantage is real here." },
    ],
    nearby: ["anniston", "jacksonville"],
  },
  {
    slug: "attalla",
    name: "Attalla",
    county: "Etowah County",
    zip: "35954",
    metaTitle: "Web Design in Attalla, AL",
    metaDescription:
      "Custom web design and local SEO for Attalla, Alabama businesses. Get found on Google by Etowah County customers. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Attalla Businesses",
    heroSub:
      "Attalla businesses serve the whole Gadsden area. Your website should be working just as hard to bring customers in.",
    heroImage: { src: "/images/locations/attalla-hero.webp", alt: "Noccalula Falls, Gadsden, Alabama (near Attalla)", credit: "Gentry George / U.S. Fish and Wildlife Service / Public Domain" },
    localIntro:
      "Attalla and Gadsden share a customer base. People searching for a plumber or a contractor from either city end up finding the same results. The businesses that rank in both get calls from both. Most Attalla businesses still run on Facebook and referrals. That worked for a long time. It's getting less reliable. When someone new to the area needs an HVAC company, they search Google, not a community Facebook group. Whoever shows up wins that call before your competition even knows there was one.",
    whyHere: [
      { title: "Gadsden Adjacency", desc: "Attalla and Gadsden share a customer base. Rank in both and you double your reach across Etowah County." },
      { title: "Coosa River Corridor", desc: "Industrial and commercial activity along the river keeps Attalla's economy active year-round." },
      { title: "Underserved Online Market", desc: "Most Attalla businesses have no real web presence. A professional site sets you apart immediately." },
      { title: "New Residents Search First", desc: "People new to the area don't have existing loyalties. They call whoever Google shows them first." },
    ],
    nearby: ["gadsden", "rainbow-city"],
  },
  {
    slug: "rainbow-city",
    name: "Rainbow City",
    county: "Etowah County",
    zip: "35906",
    metaTitle: "Web Design in Rainbow City, AL",
    metaDescription:
      "Custom web design and local SEO for Rainbow City, Alabama businesses. Get found on Google by Etowah County customers. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Rainbow City Businesses",
    heroSub:
      "Rainbow City is growing fast. Your website should be growing with it, not stuck on a template from 2015.",
    heroImage: { src: "/images/locations/rainbow-city-hero.webp", alt: "Coosa River near Rainbow City, Alabama", credit: "Carol M. Highsmith / Library of Congress" },
    localIntro:
      "Rainbow City is one of Etowah County's fastest-growing cities. The growth along Rainbow Drive is the real kind: new construction, new residents, people relocating from Gadsden because the schools and safety numbers are good. Those new residents don't know the local plumber. They don't have a neighbor to ask. They search Google. A business with a clean, optimized website is the automatic first call for every one of them.",
    whyHere: [
      { title: "One of Etowah County's Fastest-Growing Cities", desc: "New residents and new businesses mean new customers actively searching online for local services." },
      { title: "Gadsden Adjacency", desc: "Rainbow City and Gadsden share a customer base. Rank in both and you double your reach." },
      { title: "Rainbow Drive Corridor", desc: "Heavy commercial activity along Rainbow Drive means real search volume for trades, restaurants, and services." },
      { title: "Thin Online Competition", desc: "Most Rainbow City businesses have weak or nonexistent websites. A professional site stands out immediately." },
    ],
    nearby: ["gadsden", "anniston"],
  },
  {
    slug: "fort-payne",
    name: "Fort Payne",
    county: "DeKalb County",
    zip: "35967",
    metaTitle: "Web Design in Fort Payne, AL",
    metaDescription:
      "Custom web design and local SEO for Fort Payne, Alabama businesses. Get found on Google by DeKalb County customers near Little River Canyon. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Fort Payne Businesses",
    heroSub:
      "Fort Payne sits at the edge of Little River Canyon and the gateway to the Appalachians. Your website should work as hard as the people who built this town.",
    heroImage: { src: "/images/locations/fort-payne-hero.webp", alt: "Little River Canyon near Fort Payne, Alabama", credit: "Thomson200 / CC0" },
    localIntro:
      "Fort Payne is the seat of DeKalb County. Manufacturing town turned outdoor gateway, sitting at the edge of Little River Canyon National Preserve with DeSoto State Park up the road. The economy runs on service businesses and restaurants and the outfitters that show up for canyon season. But it also runs on the plumber someone calls on a Tuesday in February when there's no tourist in sight. Both kinds of customers search Google. The biggest web design presence in DeKalb County right now is a sign shop that does websites on the side. That's a gap I build into.",
    whyHere: [
      { title: "Little River Canyon Tourism", desc: "Outdoor visitors search for local restaurants, outfitters, and services before and during their visit. Be what they find." },
      { title: "DeKalb County Seat", desc: "Fort Payne is the commercial hub for the whole county. Your online presence should match your real-world position." },
      { title: "Weak Local Web Competition", desc: "The strongest web design presence in DeKalb County is a sign shop. A purpose-built business site wins by default." },
      { title: "DeSoto State Park Traffic", desc: "Year-round park visitors mean year-round search traffic for local businesses willing to show up online." },
    ],
    nearby: ["gadsden", "centre"],
  },
  {
    slug: "centre",
    name: "Centre",
    county: "Cherokee County",
    zip: "35960",
    metaTitle: "Web Design in Centre, AL | Headley Web & SEO",
    metaDescription:
      "Custom web design and local SEO for Centre, Alabama businesses. Get found on Google by Weiss Lake anglers, tournament visitors, and Cherokee County locals. Flat-rate pricing from $495. No contracts.",
    heroHeadline: "Web Design for Centre Businesses",
    heroSub:
      "Centre sits on Weiss Lake and serves all of Cherokee County. Your website should be pulling in customers from both.",
    heroImage: { src: "/images/locations/centre-hero.webp", alt: "Sunset over Weiss Lake, Centre, Alabama", credit: "Alabama Tourism Department" },
    localIntro:
      "Centre is the seat of Cherokee County and the gateway to Weiss Lake — the \"Crappie Capital of the World\" — drawing anglers, weekend visitors, and lake house owners from across the Southeast. That seasonal traffic is a goldmine for local businesses, but only if those visitors can find you online. Beyond the lake, Centre serves a county of trades, farms, and small businesses that make up the backbone of the local economy. Whether you're a dock builder on the lake, a contractor in town, or a restaurant on the square, your website is how new customers decide whether to call you or scroll past.",
    bodyParagraphs: [
      "Weiss Lake hosts some of the most competitive crappie tournaments in the Southeast. When a major tournament comes to town, anglers and their families flood into Cherokee County from Georgia, Tennessee, Mississippi, and beyond. They need fuel, food, ice, lodging, and boat repair — and they find all of it the same way: by searching Google before they cross the county line. The businesses that show up in those searches get the calls. The ones that don't are invisible to an audience that drove five hours specifically to spend money here.",
      "Tournament season is the peak, but it's not the whole picture. Cherokee County has year-round residents who need trades, healthcare, and services just like anywhere else. The plumber who ranks well on Google doesn't just get tournament-season calls — they get calls every Tuesday in February when a pipe bursts and nobody knows a neighbor to ask anymore. A website built for this market should work all twelve months, not just the ones when the crappie are biting.",
      "Cherokee County stretches from Centre out through Leesburg, Cedar Bluff, and Gaylesville. If you serve the whole county — or the whole lake — your website should rank across all of it. Most local businesses have a Google Business Profile that covers their city and maybe the surrounding area. A properly built site with county-wide local SEO closes that gap, so the person searching from a lake house on the Georgia side of the county finds your business before they find one across the state line.",
    ],
    clientTypes: [
      { type: "Lake & Marine Services", examples: "Dock builders, boat repair, marine supplies, fishing guides, outfitters" },
      { type: "Lodging & Vacation Rentals", examples: "Cabins, lake house rentals, motels, RV parks, campgrounds" },
      { type: "Restaurants & Food", examples: "Lakeside dining, catfish houses, bait shops with deli, takeout" },
      { type: "Trades & Contractors", examples: "HVAC, plumbing, electrical, roofing, lake house construction and renovation" },
      { type: "Healthcare & Wellness", examples: "Family practices, dentists, chiropractors, urgent care" },
      { type: "Retail & Specialty", examples: "Tackle shops, farm supply, hardware, auto parts, outdoor gear" },
    ],
    whyHere: [
      { title: "Weiss Lake Tournament Traffic", desc: "Major crappie tournaments bring competitors and families from across the Southeast. They search for food, lodging, guides, and services before they arrive. Show up in those searches." },
      { title: "Cherokee County Seat", desc: "Centre is the commercial hub for Leesburg, Cedar Bluff, and Gaylesville too. A well-built site ranks across the whole county — not just your zip code." },
      { title: "Seasonal Peaks, Year-Round Business", desc: "Tournament season brings spikes, but a properly optimized site keeps the phone ringing in the off-season when your competitors go quiet." },
      { title: "Lake House Owner Market", desc: "Seasonal owners search for contractors, cleaners, and services remotely before they visit. A professional site puts you on their list before they cross the county line." },
    ],
    nearby: ["gadsden"],
  },
  {
    slug: "weaver",
    name: "Weaver",
    county: "Calhoun County",
    zip: "36277",
    metaTitle: "Web Design in Weaver, AL",
    metaDescription:
      "Custom web design and local SEO for Weaver, Alabama businesses. Get found on Google by Calhoun County customers on the 431 corridor. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Weaver Businesses",
    heroSub:
      "Weaver sits on one of the busiest corridors in Calhoun County. Your customers are already driving past. Make sure they can find you online too.",
    heroImage: { src: "/images/locations/anniston-hero.webp", alt: "Calhoun County, Alabama", credit: "Rivers Langley / CC BY-SA 3.0" },
    localIntro:
      "I built my first website for a church in Weaver. That's where this started: figuring out how to get a small organization found online with no budget and no idea what I was doing. It worked, and I've been building on that ever since. Most Weaver businesses are in the same spot that church was. Great word-of-mouth locally, nearly invisible on Google. The Highway 431 corridor sees real traffic, and the searches that come with it go to whoever has a site that's actually set up right. That's usually not a Weaver business yet. It can be yours.",
    whyHere: [
      { title: "A Community I Know Personally", desc: "I built my first website for a church in Weaver. This is where my web career started. I know this community." },
      { title: "Highway 431 Corridor", desc: "Thousands of cars pass through Weaver daily. Your online presence should capture the traffic your location already gets." },
      { title: "Between Two Markets", desc: "Weaver sits between Anniston and Jacksonville. A well-built site can pull customers from both." },
      { title: "Weak Online Competition", desc: "Most Weaver businesses are invisible on Google. A professional site and GBP sets you apart immediately." },
    ],
    nearby: ["anniston", "jacksonville", "oxford"],
  },
  {
    slug: "southside",
    name: "Southside",
    county: "Etowah County",
    zip: "35907",
    metaTitle: "Web Design in Southside, AL",
    metaDescription:
      "Custom web design and local SEO for Southside, Alabama businesses. Get found on Google by Etowah County customers. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Southside Businesses",
    heroSub:
      "Southside is one of Etowah County's larger cities. Your customers are searching Google. Most of your competitors aren't showing up.",
    heroImage: { src: "/images/locations/gadsden-hero.webp", alt: "Etowah County, Alabama", credit: "Thejammer / Public Domain" },
    localIntro:
      "Southside is big enough to have real search volume and small enough that most businesses here still don't have a website worth mentioning. That's not an insult. It's a window. Someone new to the area looking for an HVAC company or a contractor isn't going to drive around until they spot a sign. They're on their phone before they even move in. Whoever shows up in that search gets the call. Right now, that's usually a Gadsden business that happens to rank for the zip code. It doesn't have to be.",
    whyHere: [
      { title: "One of Etowah County's Larger Cities", desc: "Southside has real search volume — enough to make a dedicated location page worth every cent." },
      { title: "Gadsden & Rainbow City Adjacency", desc: "Your customers overlap with both cities. A site that ranks in all three multiplies your reach." },
      { title: "Coosa River Growth Corridor", desc: "New development along the Coosa River corridor is bringing new residents and new search activity." },
      { title: "First Mover Advantage", desc: "Most Southside businesses have no professional web presence. A strong site immediately puts you at the top of local results." },
    ],
    nearby: ["gadsden", "rainbow-city", "attalla"],
  },
  {
    slug: "glencoe",
    name: "Glencoe",
    county: "Etowah County",
    zip: "35905",
    metaTitle: "Web Design in Glencoe, AL",
    metaDescription:
      "Custom web design and local SEO for Glencoe, Alabama businesses. Get found on Google by Etowah County customers. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Glencoe Businesses",
    heroSub:
      "Glencoe businesses serve the whole Gadsden-Attalla corridor. Your website should be pulling customers from both directions.",
    heroImage: { src: "/images/locations/gadsden-hero.webp", alt: "Etowah County, Alabama", credit: "Thejammer / Public Domain" },
    localIntro:
      "Glencoe is the kind of community where your reputation matters more than your website. That's still true. It's also true that the next person who needs a roofer might not know anyone to ask. New residents search first. They don't have a neighbor to call yet. They go to Google, and whoever shows up there gets the first shot at that customer. Most Glencoe businesses aren't showing up. A website built for local search changes that faster than most people expect.",
    whyHere: [
      { title: "Gadsden-Attalla Corridor", desc: "Glencoe businesses draw from both neighboring cities. A website that ranks across the corridor multiplies your reach." },
      { title: "New Residents Search First", desc: "People relocating to Etowah County don't have existing loyalties — they call whoever Google shows them." },
      { title: "Low Online Competition", desc: "Most Glencoe businesses have no real web presence. A professional site immediately makes you the obvious choice." },
      { title: "Etowah County Network", desc: "Rank in Glencoe, Attalla, and Gadsden and you cover the whole western Etowah County market." },
    ],
    nearby: ["gadsden", "attalla", "southside"],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}
