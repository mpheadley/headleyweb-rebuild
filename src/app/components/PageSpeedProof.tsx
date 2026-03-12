import ScoreGauge from "./ScoreGauge";

interface PageSpeedProofProps {
  variant?: "dark" | "light";
}

export default function PageSpeedProof({ variant = "light" }: PageSpeedProofProps) {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-hw-dark" : "bg-hw-light";
  const subtextClass = isDark ? "text-white/60" : "text-hw-text-light";
  const footnoteClass = isDark ? "text-white/40" : "text-hw-text-light/60";

  return (
    <section className={`py-20 md:py-28 px-6 ${bgClass}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">Performance</p>
          <h2 className={`text-3xl md:text-4xl font-bold animate-on-scroll ${isDark ? "!text-white" : ""}`}>
            Built for <span className="text-hw-primary">Speed</span>
          </h2>
          <p className={`${subtextClass} mt-3 max-w-xl mx-auto animate-on-scroll`}>
            Every site I build scores 90+ on Google Lighthouse. Fast sites rank higher and convert more visitors.
          </p>
        </div>
        <div className="animate-on-scroll">
          <ScoreGauge
            variant={variant}
            items={[
              { score: 95, label: "Performance" },
              { score: 100, label: "Accessibility" },
              { score: 100, label: "Best Practices" },
              { score: 100, label: "SEO" },
            ]}
          />
        </div>
        <p className={`text-center text-xs ${footnoteClass} mt-8 animate-on-scroll`}>
          Scores from{" "}
          <a
            href="https://pagespeed.web.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-hw-primary hover:underline"
          >
            Google PageSpeed Insights
          </a>
          {" "}&mdash; updated after each build
        </p>
      </div>
    </section>
  );
}
