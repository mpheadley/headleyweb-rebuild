"use client";

import dynamic from "next/dynamic";

const PageSpeedProof = dynamic(() => import("./PageSpeedProof"), {
  loading: () => <div className="py-20 md:py-28" />,
});

export default function LazyPageSpeedProof({ variant }: { variant?: "dark" | "light" }) {
  return <PageSpeedProof variant={variant} />;
}
