"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const QUERIES = [
  // Trades — high value
  "hvac repair near me",
  "best plumber anniston al",
  "roofing contractor birmingham",
  "electrician near me",
  // Professional services
  "divorce lawyer huntsville al",
  "family dentist oxford al",
  "cpa near me",
  "real estate agent gadsden al",
  // Local services
  "lawn care near me",
  "hair salon jacksonville al",
  "pressure washing tuscaloosa",
  "veterinarian near me",
  // Broader Alabama
  "personal trainer mobile al",
  "wedding photographer auburn",
  "daycare center dothan al",
  "chiropractor montgomery al",
];

const TYPE_SPEED = 45;
const DELETE_SPEED = 20;
const PAUSE_AFTER_TYPE = 1400;
const PAUSE_AFTER_DELETE = 300;

export default function SearchTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const phase = useRef<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const queryIdx = useRef(0);
  const charIdx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplayed(QUERIES[0]);
      return;
    }

    function step() {
      const query = QUERIES[queryIdx.current];

      switch (phase.current) {
        case "typing":
          charIdx.current++;
          setDisplayed(query.slice(0, charIdx.current));
          if (charIdx.current >= query.length) {
            phase.current = "pausing";
            timer.current = setTimeout(step, PAUSE_AFTER_TYPE);
          } else {
            timer.current = setTimeout(step, TYPE_SPEED + Math.random() * 25);
          }
          break;

        case "pausing":
          phase.current = "deleting";
          step();
          break;

        case "deleting":
          charIdx.current--;
          setDisplayed(query.slice(0, charIdx.current));
          if (charIdx.current <= 0) {
            phase.current = "waiting";
            timer.current = setTimeout(step, PAUSE_AFTER_DELETE);
          } else {
            timer.current = setTimeout(step, DELETE_SPEED);
          }
          break;

        case "waiting":
          queryIdx.current = (queryIdx.current + 1) % QUERIES.length;
          phase.current = "typing";
          step();
          break;
      }
    }

    // Start after a brief initial delay
    timer.current = setTimeout(step, 600);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div className="w-full max-w-sm" aria-hidden="true">
      <div className="bg-white rounded-full px-5 py-3 flex items-center gap-3 shadow-lg shadow-black/20">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <span className="text-gray-700 text-base font-normal truncate">
          {displayed}
          <span className="inline-block w-0.5 h-5 bg-gray-400 ml-0.5 align-middle animate-pulse" />
        </span>
      </div>
    </div>
  );
}
