export type Project = {
  title: string;
  description: string;
  desktop: string;
  mobile: string;
  video?: string;
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
    desktop: "/images/portfolio/project-dart-side-800w.webp",
    mobile: "/images/portfolio/project-dart-side-mobile-480w.webp",
    url: "https://dartsiderentals.com",
    tag: "Local Service",
    featured: false,
    stats: [
      { value: "100", label: "SEO Score" },
      { value: "1 wk", label: "To Launch" },
    ],
  },
  {
    title: "Valley Small Engine Repair",
    description:
      "Local service site with customer testimonials and easy contact, built to convert search traffic into phone calls.",
    desktop: "/images/portfolio/desktop-screenshot-valley-800w.webp",
    mobile: "/images/portfolio/mobile-sreenshot-valley-480w.webp",
    url: "https://mpheadley.github.io/valley-small-engine-repair/",
    tag: "Local Service",
    featured: false,
  },
  {
    title: "Golden Hive Honey",
    description:
      "Clean e-commerce demo for local honey products with warm, inviting design.",
    desktop: "/images/portfolio/project-honey-800w.webp",
    mobile: "/images/portfolio/project-honey-mobile-480w.webp",
    url: "https://v0-honey-vendor-store-3let.vercel.app/",
    tag: "E-Commerce",
    featured: false,
  },
  {
    title: "Chromatic Chaos Salon",
    description:
      "Modern salon site with booking integration and bold brand personality.",
    desktop: "/images/portfolio/project-salon-800w.webp",
    mobile: "/images/portfolio/project-salon-mobile-480w.webp",
    url: "https://v0-edgy-salon-website.vercel.app/",
    tag: "Salon & Beauty",
    featured: false,
  },
  {
    title: "Emotional Support Chicken",
    description:
      "Satirical concept site for a fake certified emotional support poultry business. Built to demonstrate design range, humor, and full-stack chops.",
    desktop: "/images/portfolio/project-esc-800w.webp",
    mobile: "/images/portfolio/project-esc-mobile-480w.webp",
    url: "https://emotional-support-chicken.vercel.app/",
    tag: "Creative Showcase",
    featured: false,
  },
  {
    title: "Southern Legends",
    description:
      "Editorial storytelling site profiling small business owners and community figures across Northeast Alabama. Custom Next.js build with longform layouts and rich photography.",
    desktop: "/images/portfolio/sl-jean-ellison-desktop.webp",
    mobile: "/images/portfolio/sl-jean-ellison-mobile.webp",
    video: "/images/portfolio/sl-southern-legends.mp4",
    url: "https://southernlegends.blog",
    tag: "Editorial",
    featured: true,
  },
];
