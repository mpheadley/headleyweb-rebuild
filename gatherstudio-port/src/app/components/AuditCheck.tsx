/* ── Pass/fail check row for audit results ── */

import { CheckCircle2, XCircle } from "lucide-react";

export default function AuditCheck({ passed, label }: { passed: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {passed ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
      )}
      <span className={passed ? "text-hw-text" : "text-red-600 font-medium"}>{label}</span>
    </div>
  );
}
