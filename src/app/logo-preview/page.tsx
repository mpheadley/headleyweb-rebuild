import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/* eslint-disable @next/next/no-img-element */

const NavLinks = () => (
  <nav className="hidden md:flex items-center gap-6">
    {["Home", "Services", "Work", "Blog", "About", "Contact"].map((l) => (
      <span key={l} className="text-sm font-medium text-white/80">
        {l}
      </span>
    ))}
    <span className="btn-primary text-sm !py-2 !px-4">
      Get Your Free Site Checkup
    </span>
  </nav>
);

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-hw-light pt-8">
      <h1 className="text-center font-heading text-3xl text-hw-text mb-2">
        Logo Preview — SVG Traces vs Option A (Cream BG)
      </h1>
      <p className="text-center text-hw-text-light text-sm mb-10">
        Comparing SVG (true transparent) vs raster with cream background kept
        intact
      </p>

      {/* ============================================================ */}
      {/*  SECTION: NAV BAR COMPARISONS                                */}
      {/* ============================================================ */}

      {/* --- SVG Icon + Text on Dark Nav --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Nav (scrolled) — SVG Icon + Text
        </h2>
        <header className="bg-hw-dark/95 backdrop-blur-sm shadow-lg py-3">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo-icon.svg"
                alt="Headley Web & SEO"
                className="w-7 h-auto"
              />
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Headley{" "}
                <span className="text-hw-primary">
                  Web <span className="amp">&amp;</span> SEO
                </span>
              </span>
            </div>
            <NavLinks />
          </div>
        </header>
      </section>

      {/* --- SVG Wordmark on Dark Nav --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Nav (scrolled) — SVG Wordmark Only
        </h2>
        <header className="bg-hw-dark/95 backdrop-blur-sm shadow-lg py-3">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/images/logo-wordmark.svg"
                alt="Headley Web & SEO"
                className="h-8 w-auto invert brightness-200"
              />
            </div>
            <NavLinks />
          </div>
        </header>
      </section>

      {/* --- Option A: Raster with cream bg in rounded container --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Nav (scrolled) — Option A: Icon in cream circle + Text
        </h2>
        <header className="bg-hw-dark/95 backdrop-blur-sm shadow-lg py-3">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo-icon-sm.webp"
                alt="Headley Web & SEO"
                width={36}
                height={32}
                sizes="36px"
                className="w-9 h-auto rounded-full bg-[#F2E8D4]"
              />
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Headley{" "}
                <span className="text-hw-primary">
                  Web <span className="amp">&amp;</span> SEO
                </span>
              </span>
            </div>
            <NavLinks />
          </div>
        </header>
      </section>

      {/* --- Option A: Seal in cream rounded-lg container --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Nav (scrolled) — Option A: Seal in cream container
        </h2>
        <header className="bg-hw-dark/95 backdrop-blur-sm shadow-lg py-3">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo-seal-footer.webp"
                alt="Headley Web & SEO"
                width={48}
                height={40}
                sizes="48px"
                className="w-12 h-auto rounded-lg bg-[#F2E8D4] p-0.5"
              />
            </div>
            <NavLinks />
          </div>
        </header>
      </section>

      {/* --- Hero state (transparent over dark) --- */}
      <section className="mb-12">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Nav (hero) — SVG Icon + Text
        </h2>
        <div className="relative h-24 bg-gradient-to-br from-hw-dark to-gray-700">
          <header className="bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo-icon.svg"
                  alt="Headley Web & SEO"
                  className="w-9 h-auto"
                />
                <span className="font-heading font-bold text-lg tracking-tight text-white">
                  Headley Web <span className="amp">&amp;</span> SEO
                </span>
              </div>
              <NavLinks />
            </div>
          </header>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION: FOOTER COMPARISONS                                 */}
      {/* ============================================================ */}

      {/* --- SVG Seal in Footer --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Footer — SVG Seal
        </h2>
        <footer className="bg-hw-dark text-gray-300 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center">
              <img
                src="/images/logo-seal.svg"
                alt="Headley Web & SEO"
                className="w-36 h-auto invert brightness-200 opacity-90"
              />
            </div>
            <p className="text-sm text-gray-400">
              Get found. Get calls. Get booked.
            </p>
            <p className="text-xs text-gray-400">
              © 2026 Headley Web &amp; SEO. All rights reserved.
            </p>
          </div>
        </footer>
      </section>

      {/* --- SVG Icon + Text in Footer --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Footer — SVG Icon + Text
        </h2>
        <footer className="bg-hw-dark text-gray-300 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center gap-3">
              <img
                src="/images/logo-icon.svg"
                alt="Headley Web & SEO"
                className="w-16 h-auto"
              />
              <p className="text-white font-heading text-lg font-semibold">
                Headley{" "}
                <span className="text-hw-primary">
                  Web <span className="amp">&amp;</span> SEO
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Get found. Get calls. Get booked.
            </p>
            <p className="text-xs text-gray-400">
              © 2026 Headley Web &amp; SEO. All rights reserved.
            </p>
          </div>
        </footer>
      </section>

      {/* --- Option A: Raster seal in cream circle --- */}
      <section className="mb-8">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Footer — Option A: Seal in cream circle
        </h2>
        <footer className="bg-hw-dark text-gray-300 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo-seal-footer.webp"
                alt="Headley Web & SEO"
                width={144}
                height={120}
                sizes="144px"
                className="w-36 h-auto rounded-full bg-[#F2E8D4] p-3"
              />
            </div>
            <p className="text-sm text-gray-400">
              Get found. Get calls. Get booked.
            </p>
            <p className="text-xs text-gray-400">
              © 2026 Headley Web &amp; SEO. All rights reserved.
            </p>
          </div>
        </footer>
      </section>

      {/* --- Option A: Raster icon in cream circle + text --- */}
      <section className="mb-12">
        <h2 className="text-center font-heading text-xl pb-3 text-hw-text">
          Footer — Option A: Icon in cream circle + Text
        </h2>
        <footer className="bg-hw-dark text-gray-300 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/images/logo-icon-sm.webp"
                alt="Headley Web & SEO"
                width={72}
                height={63}
                sizes="72px"
                className="w-16 h-auto rounded-full bg-[#F2E8D4] p-1.5"
              />
              <p className="text-white font-heading text-lg font-semibold">
                Headley{" "}
                <span className="text-hw-primary">
                  Web <span className="amp">&amp;</span> SEO
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Get found. Get calls. Get booked.
            </p>
            <p className="text-xs text-gray-400">
              © 2026 Headley Web &amp; SEO. All rights reserved.
            </p>
          </div>
        </footer>
      </section>

      {/* ============================================================ */}
      {/*  SECTION: ALL VARIANTS SIDE-BY-SIDE                          */}
      {/* ============================================================ */}

      <section className="mb-12 px-6">
        <h2 className="text-center font-heading text-2xl pb-8 text-hw-text">
          SVG Variants — Light Background
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          <div className="text-center space-y-3">
            <img
              src="/images/logo-icon.svg"
              alt="Icon mark"
              className="mx-auto h-28"
            />
            <p className="text-sm text-hw-text-light">Icon SVG</p>
          </div>
          <div className="text-center space-y-3">
            <img
              src="/images/logo-wordmark.svg"
              alt="Wordmark"
              className="mx-auto h-16"
            />
            <p className="text-sm text-hw-text-light">Wordmark SVG</p>
          </div>
          <div className="text-center space-y-3">
            <img
              src="/images/logo-seal.svg"
              alt="Full seal"
              className="mx-auto h-36"
            />
            <p className="text-sm text-hw-text-light">Seal SVG</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <h2 className="text-center font-heading text-2xl pb-8 text-hw-text">
          SVG Variants — Dark Background
        </h2>
        <div className="max-w-4xl mx-auto bg-hw-dark rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          <div className="text-center space-y-3">
            <img
              src="/images/logo-icon.svg"
              alt="Icon mark"
              className="mx-auto h-28"
            />
            <p className="text-sm text-gray-400">Icon SVG (dark on dark)</p>
          </div>
          <div className="text-center space-y-3">
            <img
              src="/images/logo-wordmark.svg"
              alt="Wordmark"
              className="mx-auto h-16 invert brightness-200"
            />
            <p className="text-sm text-gray-400">Wordmark SVG (inverted)</p>
          </div>
          <div className="text-center space-y-3">
            <img
              src="/images/logo-seal.svg"
              alt="Full seal"
              className="mx-auto h-36 invert brightness-200 opacity-90"
            />
            <p className="text-sm text-gray-400">Seal SVG (inverted)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
