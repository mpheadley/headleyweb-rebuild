import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refer a Business | Headley Web & SEO",
  description:
    "Know a local business that needs a website? Send me their info and I'll reach out with a free site checkup.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReferLayout({ children }: { children: React.ReactNode }) {
  return children;
}
