// Sources: southern-legends/content/matt-headley-sources/
//   matt-headley-profile.html (master profile)
//   GOOGLE-DRIVE-ARCHIVE-INDEX.md (Google Drive inventory 2026-06-06)
//   Spiritual Autiobiography.gdoc (2009), Autobiographical Statement.pdf (2015)
//   Matt_Headley_Full_Memory_Export_March_2025.docx
//   journal-ua-depression-guitar-era.md, journal-meeting-heather-jsu-audition.md
//   pirates-of-penzance-jsu-2007.md, AIM logs Nov–Dec 2003
// Personal version contains full biographical detail — not for public display.
// Public version is the curated professional narrative.

export type TimelineEntry = {
  years: string;
  role: string;
  detail: string;
};

export type Quote = {
  text: string;
  source: string;
};

export type PersonalBio = {
  name: string;
  location: {
    current: string;
    hometown: string;
    hometownYears: string;
  };
  family: {
    wife: string;
    children: { name: string; age: number }[];
    dogs: string[];
    sheep: string[];
  };
  education: {
    undergraduate: string;
    graduate: string;
    ordination: string;
    productions: string[];
  };
  diagnosis: {
    condition: string;
    confirmedYear: number;
    firstDepressionAge: number;
    publicArticle: string;
    hospitalization: {
      facility: string;
      durationDays: number;
      date: string;
    };
  };
  career: TimelineEntry[];
  farm: {
    name: string;
    years: string;
    address: string;
    features: string[];
    soldDate: string;
  };
  brands: {
    name: string;
    tagline: string;
    description: string;
  }[];
  quotes: Quote[];
  gaps: string[];
  sources: {
    title: string;
    type: "article" | "audio" | "video" | "document" | "journal" | "export";
    date?: string;
    url?: string;
    localPath?: string;
    notes?: string;
  }[];
};

export type PublicBio = {
  name: string;
  tagline: string;
  location: string;
  shortBio: string;
  longBio: string;
  credentials: {
    title: string;
    description: string;
  }[];
  career: TimelineEntry[];
  quotes: Quote[];
};

export const personalBio: PersonalBio = {
  name: "Matt Headley",
  location: {
    current: "Pleasant Valley, AL",
    hometown: "Oxford, AL",
    hometownYears: "1993–2002",
  },
  family: {
    wife: "Heather Headley",
    children: [
      { name: "Hannah", age: 12 },
      { name: "Noah", age: 11 },
      { name: "Sage", age: 9 },
      { name: "Soren", age: 9 },
    ],
    dogs: ["Luna", "Sunny"],
    sheep: ["Silver", "Shadow"],
  },
  education: {
    undergraduate: "B.A. Music (Voice), minor in Drama — Jacksonville State University",
    graduate: "M.Div. Theology and Ministry — Northern Seminary (full scholarship)",
    ordination: "American Baptist Churches USA, 2012",
    productions: [
      { title: "Pirates of Penzance", role: "The Pirate King", year: 2007, director: "Dr. Nathan Wight", venue: "Ernest Stone Performing Arts Center, JSU" },
      { title: "Sweeney Todd", role: null, year: null, director: null, venue: "Stone Center for the Arts, JSU" },
      { title: "The Secret Garden", role: null, year: null, director: null, venue: "Stone Center for the Arts, JSU" },
      { title: "Jesus Christ Superstar", role: null, year: null, director: null, venue: "Stone Center for the Arts, JSU" },
    ],
    keyFigures: [
      { name: "Dr. Patricia Corbin", role: "Director, JSU A Cappella Choir & Chamber Singers", note: "Said 'move over, Jason' when Matt sang a low D2 at auditions" },
      { name: "Teresa Stricklin", role: "JSU — accompanied show choir audition; Assistant Director, Pirates of Penzance 2007", note: "Present at both the audition that announced him and the production that showcased him" },
      { name: "Dr. Nathan Wight", role: "Director, Jacksonville Opera Theatre / Pirates of Penzance 2007", note: "Cast Matt as The Pirate King" },
      { name: "Jason Wright", role: "JSU choir bass anchor, 20-year friend", note: "Dr. Corbin told him to 'move over' for Matt; later became music director at Anniston First UMC after Matt left" },
    ],
  },
  diagnosis: {
    condition: "Bipolar I",
    confirmedYear: 2025,
    firstDepressionAge: 19,
    publicArticle:
      "Hope in the Wilderness: A Pastor's Journey Through Depression — Anniston Star, October 21, 2024",
    hospitalization: {
      facility: "UAB Psychiatric Center",
      durationDays: 10,
      date: "October–November 2025",
    },
  },
  formativeEvents: [
    { year: "~1991", event: "Father's Marine Corps scandal. Family leaves military, becomes low-income. Parents nearly divorce. Matt is ~10." },
    { year: "1993–2002", event: "Oxford, AL. Grew up Catholic. Southern gospel quartet. CROSS leadership team, Birmingham Diocese." },
    { year: "~1997", event: "Age ~16: Judgment House at local Baptist church. Evangelical contact from within Catholic identity." },
    { year: "2002", event: "Graduates high school. Enters University of Alabama (engineering)." },
    { year: "2002–2004", event: "Relationship with high school sweetheart collapses on Alaska trip. Severely depressed. Drops out of UA." },
    { year: "2003–2004", event: "AIM chat logs (Nov–Dec 2003): 'I'm sick of being lonely.' Planning guitar, working out, spiritual recovery." },
    { year: "2004–2005", event: "Gadsden State Community College. Sang Elvis ('Hound Dog') in flannel at performance center. Buying Takamine guitar ($850, eBay). Dad scoffed." },
    { year: "2005–2006", event: "Jacksonville State University. Show choir audition: blue jeans + flannel, 'O Rest in the Lord' with Teresa Stricklin. Dr. Corbin: 'Move over, Jason.' Low D2." },
    { year: "2006", event: "Pirates of Penzance: played The Pirate King. Director: Dr. Nathan Wight. JSU Digital Commons archive." },
    { year: "2006", event: "Choir director, Red Hill UMC, Attala AL. Slow conversion — no single moment. Music was the door." },
    { year: "2006–2008", event: "Simultaneous worship leader, Hokes Bluff UMC. JSU Wesley Foundation residency. Mentor: Jay Robinson." },
    { year: "2009", event: "Marries Heather (summer). Moves to Muncie, Indiana. She begins MA Piano at Ball State." },
    { year: "2009", event: "Worship Arts Director, First Baptist Church Muncie under Wade Allen (pastor who introduced him to Northern Seminary)." },
    { year: "2009–2012", event: "M.Div., Northern Seminary, Chicago (full scholarship, Kern Scholarship)." },
    { year: "2012", event: "Associate Pastor, First Baptist Muncie." },
    { year: "~2013", event: "Papa (grandfather) commits suicide. Matt preaches the funeral. Sermon in Scrivener archive." },
    { year: "Feb 23, 2014", event: "Ordained, American Baptist Churches USA, First Baptist Muncie." },
    { year: "June 2014", event: "Appointed Pastor, Weaver First UMC. Introduced by Jay Robinson to District Superintendent Sherill Clontz." },
  ],
  career: [
    {
      years: "2006–2012",
      role: "Early Ministry",
      detail: "Music director and pastoral roles. Red Hill UMC (Attala AL), Hokes Bluff UMC simultaneously. JSU Wesley Foundation. Foundation years.",
    },
    {
      years: "2012–2014",
      role: "Associate Pastor & Worship Arts Director",
      detail: "First Baptist Church, Muncie, Indiana. Introduced by pastor Wade Allen to Northern Seminary. Ordained Feb 23, 2014 through American Baptist Churches USA.",
    },
    {
      years: "2014–2021",
      role: "Pastor, Weaver First United Methodist Church",
      detail: "Weaver, Alabama. Seven years. Longest single appointment.",
    },
    {
      years: "2021–2025",
      role: "Associate Pastor & Music Director, Anniston First UMC",
      detail:
        "Anniston, AL. Lessons & Carols, O Magnum Mysterium, Shepherd's Table breakfast ministry. Left March 2025 following manic episode.",
    },
    {
      years: "2021–2025",
      role: "Co-owner, Headley Flower Farm",
      detail:
        "1832 farmhouse, Lenlock Heights, Anniston. Cut flowers, Bloom Bar, Trail Porch kiosk on Chief Ladiga Trail, permaculture with Trevor & Joanna Mann of WaldenFARMacy. Sold November 2025 while hospitalized.",
    },
    {
      years: "2025–",
      role: "Owner, Headley Web & SEO / Founder, Southern Legends",
      detail:
        "Pleasant Valley, AL. Web design and SEO for Northeast Alabama businesses. Editorial storytelling site about the people and places of the region.",
    },
  ],
  farm: {
    name: "Headley Flower Farm",
    years: "2021–2025",
    address: "1832 farmhouse, Ridgewood Ave., Lenlock Heights, Anniston, AL",
    features: [
      "Cut flower production",
      "Bloom Bar",
      "Trail Porch kiosk on Chief Ladiga Trail",
      "Wedding and event florals",
      "Permaculture partnership with WaldenFARMacy",
      "Patreon community (27 members, $26.44/mo at peak)",
      "Resin jewelry from pressed blooms (Heather)",
    ],
    soldDate: "November 2025",
  },
  brands: [
    {
      name: "Headley Flower Farm",
      tagline: "Bringing the meadow to your table.",
      description: "Weddings, events, Trail Shop, markets, Bloom Bar. The anchor.",
    },
    {
      name: "The Bloomstead",
      tagline: "Flourishing where trail meets field.",
      description: "Retail pop-ups, agritourism, retreat experiences. Bloom Bar mobile fleet.",
    },
    {
      name: "Headley Weddings & Events",
      tagline: "Rooted in love, grown in community.",
      description: "Full-service florals, officiating, music, coordination. Venue partnerships.",
    },
    {
      name: "Wholehearted Roots",
      tagline: "Beauty for ashes. Life in full bloom.",
      description:
        "Nonprofit, spiritual formation, permaculture education, trail and urban transformation.",
    },
    {
      name: "Matt Headley",
      tagline: "Let's grow something worth telling.",
      description: "Speaking, coaching, Patreon, personal writing. Poetry, pastoral mischief, permaculture.",
    },
  ],
  quotes: [
    {
      text: "Severe depression feels like being lost in total darkness. It's relentless, stretching time and making hope feel out of reach.",
      source: "Anniston Star — October 21, 2024",
    },
    {
      text: "One of the most surprising parts of this resurrection was what I can only describe as an ego death.",
      source: "Anniston Star — October 21, 2024",
    },
    {
      text: "Resurrection isn't just a thing of the past. It's what happens when love brings us back to life.",
      source: "Anniston Star — October 21, 2024",
    },
    {
      text: "The old version of Matt didn't make it, but something new is emerging.",
      source: "Patreon — April 2025",
    },
    {
      text: "There's still a shepherd in me. Just with a shovel instead of a stole.",
      source: "Patreon — April 2025",
    },
    {
      text: "The pulpit isn't gone. It's just mobile now.",
      source: "Patreon — July 2025",
    },
    {
      text: "The depression took me to the edge. The mania burned everything down.",
      source: "Source materials, 2026",
    },
    {
      text: "Building this profile, compiling the source documents, laying out the timeline, feels a little scary and a little therapeutic. This profile is part of coming out of hiding.",
      source: "Conversation, 2026",
    },
  ],
  keyPeople: [
    { name: "Jason Wright", role: "JSU choir bass anchor; 20-year friend; took over as music director at Anniston First after Matt left; called during the silence" },
    { name: "Kyle", role: "Took over as associate pastor at Anniston First; preached 'grippy socks vacation' sermon; visited Matt the day he went to UAB" },
    { name: "Teresa Stricklin", role: "Accompanied show choir audition on piano; Assistant Director, Pirates of Penzance 2007" },
    { name: "Dr. Patricia Corbin", role: "Director, JSU A Cappella Choir & Chamber Singers; said 'move over, Jason'" },
    { name: "Dr. Nathan Wight", role: "Director, Jacksonville Opera Theatre; directed Pirates of Penzance 2007; cast Matt as Pirate King" },
    { name: "Jay Robinson", role: "JSU Wesley Foundation director; mentor; introduced Matt to Sherill Clontz for Weaver appointment" },
    { name: "Wade Allen", role: "Pastor, First Baptist Muncie; introduced Matt to Northern Seminary" },
    { name: "Sherill Clontz", role: "District Superintendent; appointed Matt to Weaver First UMC, June 2014" },
    { name: "Michael Mauter", role: "Student leader, UA Catholic student ministry; gave Matt his first guitar (black Sigma acoustic by Martin)" },
    { name: "Heather Headley", role: "Wife. MA Piano, Ball State University. Co-owner Headley Flower Farm. Visited 3 times during hospitalization including twice to sign farm closing papers." },
    { name: "Sam", role: "Social worker, UAB psych ward. Wearing hijab. Connected Matt's childhood displacement to the farm loss: 'This is a major trigger for you.'" },
    { name: "Dr. Bhatia", role: "Psychiatrist, UAB. Said prior medication cycling was 'bad practice.'" },
  ],
  gaps: [
    "What the father's Marine Corps scandal was — named but not described in any document.",
    "The Alaska trip — named in 2009 notes as the crisis point; never written publicly.",
    "Papa funeral sermon — Funeral for Grandpa.gdoc in Google Drive; entity not found on first read attempt.",
    "Two ChatGPT accounts from October 2024–March 2025 (heaviest manic period) remain locked — matt@headleyflowerfarm.com.",
    "The first depression at 19 has not been written about publicly.",
    "Heather's health challenges (endometriosis) — named in Google Drive fundraising doc; not publicly written.",
    "Ligare and psychedelic-Christianity exploration — significant theological shift visible in March 2025 memory export; not publicly addressed.",
    "The AI 'Loving Community' council (Enneagram Council, Personal Advocates, Trinity Avatars) — manic-era spiritual framework in ChatGPT; context and outcome unknown.",
  ],
  sources: [
    {
      title: "Hope in the Wilderness: A Pastor's Journey Through Depression",
      type: "article",
      date: "2024-10-21",
      url: "https://www.annistonstar.com/",
      notes: "Anniston Star. Public essay on the 2024 depression. Pre-diagnosis.",
    },
    {
      title: "At this local family flower farm, it's all hands on deck",
      type: "article",
      date: "2025-05-07",
      url: "https://www.annistonstar.com/",
      notes: "Foothills Magazine / Anniston Star. Farm feature published during the manic window.",
    },
    {
      title: "Leavings Are Tough...",
      type: "document",
      date: "2025-04-17",
      url: "https://www.patreon.com/",
      notes: "Patreon post announcing departure from ministry.",
    },
    {
      title: "I Had a Pulpit, And I Still Do",
      type: "document",
      date: "2025-07-01",
      url: "https://www.patreon.com/",
      notes: "Patreon post.",
    },
    {
      title: "Behind the Blooms — S1 E2",
      type: "audio",
      date: "2025-07-15",
      url: "https://www.patreon.com/",
      notes: "Patreon audio series.",
    },
    {
      title: "Voice transcript — Gold Star arc",
      type: "audio",
      date: "2026-04-19",
      localPath: "/Volumes/Samsung_T5/webdev/transcripts/",
      notes: "Voice memo transcript. Check INDEX.md for filename.",
    },
    {
      title: "Hospital journal",
      type: "journal",
      date: "2025-10",
      notes: "Cheap brown notebook, golf pencil. 10 days in UAB psych center. Primary source for Chapter 4.",
    },
    {
      title: "ChatGPT export — mpheadley@gmail.com",
      type: "export",
      notes: "210 conversations, Jan 2023–Apr 2026. Main personal account.",
    },
    {
      title: "ChatGPT export — matt@headleyflowerfarm.com",
      type: "export",
      notes: "97 conversations, Jul 2025–Jan 2026. Farm account. LOCKED — export not yet retrieved.",
    },
    {
      title: "Brand Architecture & Identity Document",
      type: "document",
      notes: "Google Doc, 2025. Full manic-era brand vision across 5 business lines.",
    },
    {
      title: "Jean Ellison interview transcript",
      type: "document",
      localPath: "/Volumes/Samsung_T5/webdev/southern-legends/interviews/",
      notes: "JSU / Pirates of Penzance connection. Jean was blocked from auditioning for the same show.",
    },
    {
      title: "AIM chat logs — age 19",
      type: "export",
      date: "2003-11",
      notes: "16 logs, November–December 2003. Archived in Google Drive. Not yet read. Primary source for the UA depression.",
    },
    {
      title: "Matthew Headley Resume v.2",
      type: "document",
      localPath: "/Volumes/Samsung_T5/webdev/southern-legends/content/matt-headley-sources/",
    },
    {
      title: "Pirates of Penzance — JSU Stone Center",
      type: "video",
      localPath: "/Volumes/Samsung_T5/webdev/southern-legends/interviews/PIRATES.mp4",
      notes: "Archive footage from JSU production.",
    },
    {
      title: "Maundy Thursday reflection — Anniston First UMC",
      type: "video",
      date: "2024-03-26",
      url: "https://www.youtube.com/watch?v=s6rq4Iq4V0w",
      notes: "Pre-episode voice baseline. March 26, 2024.",
    },
    {
      title: "Anniston First UMC sermon",
      type: "video",
      url: "https://www.youtube.com/watch?v=24tgZXBF0b8",
      notes: "Ministry era sermon.",
    },
    {
      title: "Southern Legends working profile",
      type: "document",
      localPath: "/Volumes/Samsung_T5/webdev/southern-legends/content/matt-headley-sources/matt-headley-profile.html",
      notes: "Master source document. Not for publication. Updated June 2026.",
    },
  ],
};

export const publicBio: PublicBio = {
  name: "Matt Headley",
  tagline: "A local business owner, just like you.",
  location: "Jacksonville, Alabama — serving Calhoun, Etowah, Cherokee & Talladega counties",
  shortBio:
    "Matt Headley is a web designer and SEO specialist in Northeast Alabama. He spent 19 years in ministry and co-owned a flower farm with his wife. Both needed websites. He built them, got good at it, and turned it into a business.",
  longBio:
    "I'm Matt Headley. Husband, dad, and small business owner in Jacksonville, Alabama. I spent 19 years in ministry and ran a family flower farm with my wife. Every one of those needed a website, and I was the one who figured it out. Turns out I was pretty good at it.\n\nI got tired of watching good businesses send money to agencies that don't know their town, don't know their customers, and disappear after the check clears. So I started Headley Web & SEO. Local, accountable, and still here after the invoice is paid.\n\nI build your website, set up your Google Business Profile, and make sure the right people can find you. You get the calls. I handle the tech. Flat rate, no contracts. If something breaks, you text me.",
  credentials: [
    {
      title: "StoryBrand Framework",
      description:
        "Your site talks about your customer's problem first and makes the next step obvious.",
    },
    {
      title: "Local to Jacksonville",
      description:
        "I know the Calhoun County market firsthand. Serving Calhoun, Etowah, Cherokee & Talladega counties.",
    },
    {
      title: "Flat-Rate Pricing",
      description: "Full site ownership. No contracts, no surprises.",
    },
    {
      title: "Google Business Profile",
      description: "Optimization included in every build.",
    },
  ],
  career: [
    {
      years: "2006–2025",
      role: "Pastor & Worship Leader",
      detail:
        "19 years in ministry across Indiana and Northeast Alabama. Music director, associate pastor, and lead pastor roles.",
    },
    {
      years: "2021–2025",
      role: "Co-owner, Headley Flower Farm",
      detail:
        "Cut flower farm in Anniston, AL. Weddings, events, farmers markets, and a trail-side kiosk on Chief Ladiga Trail.",
    },
    {
      years: "2025–",
      role: "Owner, Headley Web & SEO",
      detail:
        "Web design, SEO, and Google Business Profile optimization for local service businesses in Northeast Alabama.",
    },
  ],
  quotes: [
    {
      text: "I got tired of watching good businesses send money to agencies that don't know their town and disappear after the check clears. So I started one that doesn't.",
      source: "matthewheadley.com",
    },
    {
      text: "There's still a shepherd in me. Just with a shovel instead of a stole.",
      source: "Patreon — April 2025",
    },
  ],
};
