"use client";

import { useEffect, useRef, useState } from "react";

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number; // initial delay in ms before letters start
  letterDelay?: number; // delay between each letter in ms
  trigger?: "load" | "scroll"; // when to start the animation
}

export default function LetterReveal({
  text,
  className = "",
  delay = 1100,
  letterDelay = 40,
  trigger = "load",
}: LetterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === "load") {
      // Start hidden, then trigger after a frame so CSS transition fires
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <span ref={ref} className={`hand-accent inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.15s ease-out, transform 0.15s ease-out`,
            transitionDelay: visible ? `${delay + i * letterDelay}ms` : "0ms",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
