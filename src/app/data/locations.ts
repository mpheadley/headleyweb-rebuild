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
  /** ~150-200 words of unique local context */
  localIntro: string;
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
    metaTitle: "Web Design in Anniston, AL",
    metaDescription:
      "Custom web design and local SEO for Anniston, Alabama businesses. Get found on Google by customers searching in Calhoun County. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Anniston Businesses",
    heroSub:
      "Your customers are searching Google for what you do — right here in Anniston. I build websites that make sure they find you first.",
    heroImage: { src: "/images/locations/anniston-hero.webp", alt: "Anniston, Alabama", credit: "Rivers Langley / CC BY-SA 3.0" },
    localIntro:
      "Anniston is the heart of Calhoun County — home to the Anniston Army Depot, the Museum of Natural History, and a downtown that's been rebuilding with new energy along Noble Street. Whether you're a contractor serving the neighborhoods around Quintard Avenue, a restaurant near the Oxford-Anniston corridor, or a service business covering zip codes from 36201 to 36207, your customers are searching Google before they pick up the phone. If your business doesn't show up, you're handing those calls to a competitor who does. I build clean, mobile-friendly websites with local SEO baked in — so when someone searches \"plumber in Anniston\" or \"HVAC repair near me,\" your business is what they find.",
    whyHere: [
      { title: "Calhoun County's Largest City", desc: "Anniston anchors the county — your website should anchor your online presence just as strongly." },
      { title: "Army Depot & Defense Economy", desc: "Thousands of families and contractors depend on the Depot. A strong web presence puts you in front of that market." },
      { title: "Noble Street Revival", desc: "Downtown Anniston is growing again. New businesses need websites that match the momentum." },
      { title: "Oxford Next Door", desc: "Anniston and Oxford share customers. Ranking in both cities doubles your reach." },
    ],
    nearby: ["oxford", "jacksonville", "talladega"],
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
      "Oxford is the retail and commercial hub of Calhoun County. The Oxford Exchange — a 775,000 square foot shopping center anchored by Target, Kohl's, Home Depot, and Dick's Sporting Goods — Honda Manufacturing, and the Talladega Superspeedway traffic all funnel through here, bringing customers who are searching on their phones before they ever pull into a parking lot. Whether you run a service business off Highway 21, a restaurant near the Oxford Exchange, or a home services company covering Oxford and the surrounding area, your online presence is your first impression. I build websites that load fast, look professional on any device, and are structured so Google knows exactly what you do and where you do it. No templates, no page builders — just clean code and clear messaging that turns searches into phone calls.",
    whyHere: [
      { title: "Retail & Commercial Hub", desc: "Oxford is where the county comes to spend money. Your website needs to capture that traffic online too." },
      { title: "Honda Manufacturing Workforce", desc: "Thousands of Honda employees live and spend locally. Be the business they find first." },
      { title: "Superspeedway Weekends", desc: "Race traffic brings thousands of visitors searching for local services. A strong website captures that demand." },
      { title: "Highway 21 Corridor", desc: "The busiest commercial stretch in the county — your digital storefront should work as hard as your physical one." },
    ],
    nearby: ["anniston", "jacksonville", "talladega", "piedmont"],
  },
  {
    slug: "gadsden",
    name: "Gadsden",
    county: "Etowah County",
    zip: "35901",
    metaTitle: "Web Design in Gadsden, AL",
    metaDescription:
      "Custom web design and local SEO for Gadsden, Alabama businesses. Get found on Google in Etowah County. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Gadsden Businesses",
    heroSub:
      "Gadsden businesses deserve better than a Facebook page and a prayer. I build websites that actually get you found on Google.",
    heroImage: { src: "/images/locations/gadsden-hero.webp", alt: "Noccalula Falls, Gadsden, Alabama", credit: "Thejammer / Public Domain" },
    localIntro:
      "Gadsden is the seat of Etowah County and one of Northeast Alabama's most recognizable cities — home to Noccalula Falls, the Broad Street downtown district, and a strong base of trade professionals, restaurants, and service businesses. The Coosa River runs right through town, and so does the competition for local customers. If someone searches \"electrician in Gadsden\" or \"best restaurant near Noccalula Falls,\" they're going to call whoever shows up first. I build websites that are structured for exactly that — clean design, fast load times, and local SEO that tells Google your business serves Gadsden, Attalla, Rainbow City, and the surrounding Etowah County communities. You get a professional site you own outright, with no monthly traps or contracts.",
    whyHere: [
      { title: "Etowah County Seat", desc: "Gadsden is the center of commerce for the whole county. Your website should reflect that." },
      { title: "Noccalula Falls Tourism", desc: "Visitors searching for things to do nearby also search for local services. Capture that traffic." },
      { title: "Broad Street Revitalization", desc: "Downtown Gadsden is reinventing itself. A modern website signals you're part of that growth." },
      { title: "Attalla & Rainbow City Overlap", desc: "Serving neighboring cities? Your site should rank in all of them — not just one." },
    ],
    nearby: ["anniston", "centre", "rainbow-city"],
  },
  {
    slug: "jacksonville",
    name: "Jacksonville",
    county: "Calhoun County",
    zip: "36265",
    metaTitle: "Web Design in Jacksonville, AL",
    metaDescription:
      "Custom web design and local SEO for Jacksonville, Alabama businesses. Get found on Google by JSU students, families, and locals. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Jacksonville Businesses",
    heroSub:
      "I live here. I work here. And I build websites for businesses right here in Jacksonville that actually show up when locals search.",
    heroImage: { src: "/images/locations/jacksonville-hero.webp", alt: "Jacksonville, Alabama public square", credit: "Thomson200 / CC0" },
    localIntro:
      "Jacksonville is home — it's where I live, where my kids go to school, and where I built Headley Web & SEO. It's also a college town with Jacksonville State University bringing in thousands of students and their families, plus a steady local economy of trades, restaurants, and professional services along Pelham Road and the town square. The challenge for Jacksonville businesses isn't a lack of customers — it's being invisible online when those customers search. I build websites that fix that. Clean, mobile-ready design with local SEO targeting so that when someone searches \"landscaper in Jacksonville AL\" or \"pizza near JSU,\" your business shows up — not a directory listing or a competitor from Anniston. This is my hometown market, and I know it inside and out.",
    whyHere: [
      { title: "JSU Student & Family Market", desc: "Thousands of students and their families search locally every day. Your website should be what they find." },
      { title: "Your Web Designer Lives Here", desc: "I'm not a remote agency. I'm a neighbor who knows Jacksonville's market firsthand." },
      { title: "Small Town, Big Competition", desc: "Even in a small town, the business with the best online presence wins the call." },
      { title: "Pelham Road & Town Square", desc: "Whether you're on the main drag or a side street, Google doesn't care about your physical location — just your digital one." },
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
      "Talladega is known worldwide for the Superspeedway, but the local economy runs on the trades, service businesses, and restaurants that serve this community every day of the year. The courthouse square, the historic district, and the residential neighborhoods stretching toward Lincoln and Sylacauga are full of businesses that depend on word of mouth — but word of mouth now starts with a Google search. If your business doesn't have a professional website with local SEO, you're invisible to the customers searching right now. I build websites that are fast, mobile-friendly, and structured so Google knows you serve Talladega, Talladega County, and the surrounding area. Flat-rate pricing, no contracts, and you own everything from day one.",
    whyHere: [
      { title: "Superspeedway Traffic", desc: "Race weekends bring massive search volume. A strong website captures visitors looking for local services." },
      { title: "Talladega County Seat", desc: "As the county hub, your business should dominate local search — not hide behind a Facebook page." },
      { title: "Lincoln & Sylacauga Reach", desc: "Serve the surrounding area? Your website should rank across the whole county, not just one zip code." },
      { title: "Historic Downtown", desc: "Talladega's downtown is full of character. Your website should have the same — professional, clear, and built to convert." },
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
      "Alexandria sits right between Jacksonville and Anniston — your customers are already searching. Make sure they find you.",
    heroImage: { src: "/images/locations/alexandria-hero.webp", alt: "Janney Furnace Park, Calhoun County, Alabama", credit: "dofftoubab / Wikimedia Commons / CC BY-SA 3.0" },
    localIntro:
      "Alexandria is a growing community in the heart of Calhoun County, tucked between Jacksonville and Anniston along Highway 21. It's a town where people know their neighbors and still largely find local businesses through word of mouth — but that's changing fast. More and more, new residents and people relocating from Anniston or Jacksonville are searching Google before they make a call. A landscaper, a mechanic, a cleaning service, a contractor — whoever shows up first in search gets the call. Most Alexandria businesses don't have a real web presence yet. That's your advantage. I build clean, fast websites with local SEO that targets Alexandria, Calhoun County, and the surrounding area — so when someone searches for what you do, you're the one they find.",
    whyHere: [
      { title: "Between Two Markets", desc: "Alexandria sits between Jacksonville and Anniston. A well-built site can pull customers from both cities." },
      { title: "Growing Residential Base", desc: "New residents search online for everything — and they don't have existing loyalties to local businesses yet." },
      { title: "Low Online Competition", desc: "Almost no Alexandria businesses have a professional web presence. First mover advantage is yours for the taking." },
      { title: "Highway 21 Visibility", desc: "Traffic through town is real. Your online presence should match your physical one on the main corridor." },
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
      "Piedmont is a tight-knit community where word travels fast — but your next customer is still searching Google first.",
    heroImage: { src: "/images/locations/piedmont-hero.webp", alt: "Cheaha Mountain near Piedmont, Alabama", credit: "Skye Marthaler / CC BY-SA 4.0" },
    localIntro:
      "Piedmont sits at the foot of Cheaha Mountain in the eastern corner of Calhoun County, and its businesses have always punched above their weight — tight community, loyal customer base, and a work-hard culture that shows up in every trade and service in town. What often doesn't show up is those businesses online. Most Piedmont companies are invisible on Google, relying entirely on word of mouth while potential customers drive past and search on their phones. I build websites that fix that — clean, mobile-friendly, fast, and structured so Google knows exactly what you do and where you do it. Flat-rate pricing, no contracts, and you own your site outright from day one.",
    whyHere: [
      { title: "Calhoun County's Eastern Anchor", desc: "Piedmont serves the eastern edge of the county — customers searching nearby should find you, not a competitor in Anniston." },
      { title: "Cheaha Mountain Gateway", desc: "Outdoor visitors and Cheaha State Park traffic search locally. A website puts your business in front of that audience." },
      { title: "Loyal Local Market", desc: "Piedmont customers stay local when they can find local. A professional site is often all it takes." },
      { title: "Under-Served Online", desc: "Most Piedmont businesses have no real web presence. That's your opportunity — first mover advantage is real." },
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
      "Attalla businesses serve the whole Gadsden area — your website should be working just as hard to bring customers in.",
    heroImage: { src: "/images/locations/attalla-hero.webp", alt: "Noccalula Falls, Gadsden, Alabama (near Attalla)", credit: "Gentry George / U.S. Fish and Wildlife Service / Public Domain" },
    localIntro:
      "Attalla is right next door to Gadsden — sharing customers, sharing roads, and competing for the same searches. The businesses that win those searches are the ones with a professional website and a verified Google Business Profile. Most Attalla businesses still rely entirely on Facebook and word of mouth. That worked for a long time, but search behavior has shifted. When someone new to the area needs a plumber, an HVAC company, or a contractor, they go to Google — not Facebook. I build websites specifically for this market: fast-loading, mobile-friendly, with local SEO that tells Google your business serves Attalla, Etowah County, and the surrounding area. Flat-rate pricing, no contracts, and you own your site from day one.",
    whyHere: [
      { title: "Gadsden Adjacency", desc: "Attalla and Gadsden share a customer base. Rank in both and you double your reach across Etowah County." },
      { title: "Coosa River Corridor", desc: "Industrial and commercial activity along the river keeps Attalla's economy active year-round." },
      { title: "Underserved Online Market", desc: "Most Attalla businesses have no real web presence. A professional site immediately sets you apart." },
      { title: "New Residents Search First", desc: "People new to the area don't have existing loyalties — they call whoever Google shows them first." },
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
      "Rainbow City is growing fast. Your website should be growing with it — not stuck on a template from 2015.",
    heroImage: { src: "/images/locations/rainbow-city-hero.webp", alt: "Coosa River near Rainbow City, Alabama", credit: "Carol M. Highsmith / Library of Congress" },
    localIntro:
      "Rainbow City is one of Etowah County's fastest-growing communities, sitting just south of Gadsden along the Coosa River. What was once a quiet suburb has become a destination for new construction, retail, and service businesses drawn by the growth along Rainbow Drive and the city's reputation for safety and livability. If you run a business in Rainbow City — whether it's a trade, a restaurant, a service company, or a specialty shop — your customers are searching Google before they call. Most Rainbow City businesses still rely on Facebook posts and word of mouth. A clean, SEO-optimized website puts you ahead of that entire field. I build sites that load fast, rank locally, and turn searches into phone calls.",
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
      "Fort Payne is the seat of DeKalb County — a manufacturing town turned outdoor-recreation gateway, anchored by Little River Canyon National Preserve and DeSoto State Park. The city's economy runs on trades, restaurants, outdoor outfitters, and the service businesses that keep DeKalb County moving. Tourism from the canyon brings in visitors who search on their phones before they arrive, and locals search just as constantly for plumbers, HVAC, and contractors. The biggest web design presence in DeKalb County today is a sign shop that does websites on the side. That's a gap. I build websites purpose-built for service businesses — fast, mobile-friendly, with local SEO that targets Fort Payne, Rainsville, Fyffe, and the surrounding county.",
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
    metaTitle: "Web Design in Centre, AL",
    metaDescription:
      "Custom web design and local SEO for Centre, Alabama businesses. Get found on Google by Weiss Lake visitors and Cherokee County locals. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Centre Businesses",
    heroSub:
      "Centre sits on Weiss Lake and serves all of Cherokee County. Your website should be pulling in customers from both.",
    heroImage: { src: "/images/locations/centre-hero.webp", alt: "Sunset over Weiss Lake, Centre, Alabama", credit: "Alabama Tourism Department" },
    localIntro:
      "Centre is the seat of Cherokee County and the gateway to Weiss Lake — the \"Crappie Capital of the World\" — drawing anglers, weekend visitors, and lake house owners from across the Southeast. That seasonal traffic is a goldmine for local businesses, but only if those visitors can find you online. Beyond the lake, Centre serves a county of trades, farms, and small businesses that make up the backbone of the local economy. Whether you're a dock builder on the lake, a contractor in town, or a restaurant on the square, your website is how new customers decide whether to call you or scroll past. I build clean, fast websites with local SEO that targets Centre, Leesburg, Cedar Bluff, and the rest of Cherokee County — so your phone rings year-round, not just during tournament season.",
    whyHere: [
      { title: "Weiss Lake Tourism", desc: "Anglers and lake visitors search before they arrive. A strong website captures that traffic before competitors do." },
      { title: "Cherokee County Seat", desc: "Centre is the commercial hub for the county. Your online presence should match." },
      { title: "Seasonal + Year-Round", desc: "Lake traffic boosts spring through fall, but a good website works 12 months a year." },
      { title: "Leesburg & Cedar Bluff Reach", desc: "Serve the whole county? Your site should rank across all of Cherokee County — not just Centre." },
    ],
    nearby: ["gadsden"],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}
