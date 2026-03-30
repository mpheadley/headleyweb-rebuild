export type Project = {
  title: string;
  description: string;
  desktop: string;
  mobile: string;
  url: string;
  tag: string;
  featured: boolean;
  stats?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    title: "Dart Side Rentals",
    description:
      "Nerf party rental site with online booking, stat counters, and a sticky mobile CTA, built to turn local searches into weekend bookings.",
    desktop: "/images/project-dart-side-800w.webp",
    mobile: "/images/project-dart-side-mobile-480w.webp",
    url: "https://dartsiderentals.com",
    tag: "Local Service",
    featured: true,
    stats: [
      { value: "100", label: "SEO Score" },
      { value: "1 wk", label: "To Launch" },
    ],
  },
  {
    title: "Valley Small Engine Repair",
    description:
      "Local service site with customer testimonials and easy contact, built to convert search traffic into phone calls.",
    desktop: "/images/desktop-screenshot-valley-800w.webp",
    mobile: "/images/mobile-sreenshot-valley-480w.webp",
    url: "https://mpheadley.github.io/valley-small-engine-repair/",
    tag: "Local Service",
    featured: false,
  },
  {
    title: "Golden Hive Honey",
    description:
      "Clean e-commerce demo for local honey products with warm, inviting design.",
    desktop: "/images/project-honey-800w.webp",
    mobile: "/images/project-honey-mobile-480w.webp",
    url: "https://v0-honey-vendor-store-3let.vercel.app/",
    tag: "E-Commerce",
    featured: false,
  },
  {
    title: "Chromatic Chaos Salon",
    description:
      "Modern salon site with booking integration and bold brand personality.",
    desktop: "/images/project-salon-800w.webp",
    mobile: "/images/project-salon-mobile-480w.webp",
    url: "https://v0-edgy-salon-website.vercel.app/",
    tag: "Salon & Beauty",
    featured: false,
  },
  {
    title: "Emotional Support Chicken",
    description:
      "Satirical concept site for a fake certified emotional support poultry business. Built to demonstrate design range, humor, and full-stack chops.",
    desktop: "/images/project-esc-800w.webp",
    mobile: "/images/project-esc-mobile-480w.webp",
    url: "https://emotional-support-chicken.vercel.app/",
    tag: "Creative Showcase",
    featured: false,
  },
];
