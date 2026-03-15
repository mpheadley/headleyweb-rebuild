/* ── Individual StoryBrand scoring item row (internal view) ── */

import type { StoryBrandItem } from "@/lib/audit-types";

export default function StoryBrandItemRow({ item }: { item: StoryBrandItem }) {
  const scoreColor = item.autoScore === null
    ? "bg-gray-100 text-gray-500"
    : item.autoScore === 2
      ? "bg-green-100 text-green-700"
      : item.autoScore === 1
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-hw-text">{item.id} {item.label}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded ${scoreColor}`}>
          {item.autoScore === null ? "Manual" : `${item.autoScore}/2`}
        </span>
      </div>
      {item.signals.map((s, i) => (
        <p key={i} className="text-xs text-hw-text-light">{s}</p>
      ))}
    </div>
  );
}
