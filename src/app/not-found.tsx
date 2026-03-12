import type { Metadata } from "next";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 bg-hw-dark text-white min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-4 animate-on-scroll">
            404 — Page Not Found
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            Well, This Is{" "}
            <span className="text-hw-primary">Awkward.</span>
          </h1>
          <p className="text-lg text-gray-300 mb-4 max-w-xl mx-auto animate-on-scroll">
            This page doesn&apos;t exist — kind of like your competitor&apos;s mobile optimization.
          </p>
          <p className="text-sm text-gray-400 mb-10 animate-on-scroll">
            You found the one page on this site that can&apos;t help you. Unlike the rest of them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/" className="btn-primary text-lg px-8">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg px-8"
            >
              Get Your Free Site Checkup <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
