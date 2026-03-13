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
      "Custom web design and local SEO for Oxford, Alabama businesses. Rank on Google in the Quintard corridor and Calhoun County. Flat-rate pricing from $495.",
    heroHeadline: "Web Design for Oxford Businesses",
    heroSub:
      "Oxford is where Calhoun County shops. If your business isn't showing up when locals search, you're losing customers every day.",
    heroImage: { src: "/images/locations/oxford-hero.webp", alt: "Oxford, Alabama", credit: "Rivers Langley / CC BY-SA 3.0" },
    localIntro:
      "Oxford is the retail and commercial hub of Calhoun County. The Quintard Mall corridor, Honda Manufacturing, and the Talladega Superspeedway traffic all funnel through here — bringing customers who are searching on their phones before they ever pull into a parking lot. Whether you run a service business off Highway 21, a restaurant near the Quintard strip, or a home services company covering Oxford and the surrounding area, your online presence is your first impression. I build websites that load fast, look professional on any device, and are structured so Google knows exactly what you do and where you do it. No templates, no page builders — just clean code and clear messaging that turns searches into phone calls.",
    whyHere: [
      { title: "Retail & Commercial Hub", desc: "Oxford is where the county comes to spend money. Your website needs to capture that traffic online too." },
      { title: "Honda Manufacturing Workforce", desc: "Thousands of Honda employees live and spend locally. Be the business they find first." },
      { title: "Superspeedway Weekends", desc: "Race traffic brings thousands of visitors searching for local services. A strong website captures that demand." },
      { title: "Highway 21 Corridor", desc: "The busiest commercial stretch in the county — your digital storefront should work as hard as your physical one." },
    ],
    nearby: ["anniston", "jacksonville", "talladega"],
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
    nearby: ["anniston", "centre"],
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
    nearby: ["anniston", "oxford"],
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
