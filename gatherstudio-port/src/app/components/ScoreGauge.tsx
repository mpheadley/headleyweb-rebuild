"use client";

import { useEffect, useRef, useState } from "react";

type GaugeItem = {
  score: number;
  label: string;
  display?: string; // optional override text (e.g. "4.9", "500+")
};

function getColor(score: number) {
  if (score >= 90) return "#16a34a";
  if (score >= 50) return "#ea8c00";
  return "#dc2626";
}

function GaugeRing({ score, label, display, variant }: GaugeItem & { variant: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const color = getColor(score);

  useEffect(() => {
    if (hasAnimated || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();

        function step(ts: number) {
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(score * eased));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div
        className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${current * 3.6}deg, ${variant === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"} ${current * 3.6}deg)`,
        }}
      >
        <div className={`absolute inset-[8px] rounded-full ${variant === "light" ? "bg-hw-light" : "bg-hw-dark"}`} />
        <span
          className="relative z-10 text-[32px] font-bold leading-none"
          style={{ color }}
        >
          {display && current >= score ? display : current}
        </span>
      </div>
      <span className={`text-[13px] font-semibold text-center tracking-wide ${variant === "light" ? "text-hw-text-light" : "text-white/60"}`}>
        {label}
      </span>
    </div>
  );
}

export default function ScoreGauge({ items, variant = "dark" }: { items: GaugeItem[]; variant?: "dark" | "light" }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[800px] mx-auto">
      {items.map((item) => (
        <GaugeRing key={item.label} {...item} variant={variant} />
      ))}
    </div>
  );
}
