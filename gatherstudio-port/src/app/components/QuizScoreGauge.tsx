/* ── Simple SVG ring gauge for audit scores ── */

export default function QuizScoreGauge({
  score,
  label,
  size = "normal",
}: {
  score: number;
  label: string;
  size?: "normal" | "small";
}) {
  const color = score >= 90 ? "text-green-600" : score >= 50 ? "text-yellow-500" : "text-red-500";
  const bgColor = score >= 90 ? "stroke-green-600" : score >= 50 ? "stroke-yellow-500" : "stroke-red-500";
  const dims = size === "small" ? "w-16 h-16" : "w-20 h-20";
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`relative ${dims}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="36" fill="none"
            className={bgColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center font-bold ${color} ${size === "small" ? "text-sm" : "text-lg"}`}>
          {score}
        </span>
      </div>
      <span className={`text-hw-text-light ${size === "small" ? "text-xs" : "text-sm"} text-center`}>{label}</span>
    </div>
  );
}
