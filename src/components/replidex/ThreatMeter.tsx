import { cn } from "@/lib/cn";

interface ThreatMeterProps {
  level?: number; // 1..5
  max?: number;
  showLabel?: boolean;
  className?: string;
}

const LABELS = ["", "LOW", "GUARDED", "HIGH", "SEVERE", "CRITICAL"];

export function ThreatMeter({
  level = 3,
  max = 5,
  showLabel = true,
  className,
}: ThreatMeterProps) {
  const clamped = Math.max(0, Math.min(max, level));
  const tone =
    clamped >= 5 ? "var(--danger)" : clamped >= 4 ? "#f0714a" : clamped >= 3 ? "var(--tactical-amber)" : "var(--tactical-green)";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className="h-3 w-1.5 skew-x-[-12deg]"
            style={{
              background: i < clamped ? tone : "var(--border-strong)",
              boxShadow: i < clamped ? `0 0 6px -1px ${tone}` : undefined,
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span
          className="tac-label text-[0.6rem]"
          style={{ color: tone }}
          aria-label={`Threat level ${clamped} of ${max}`}
        >
          {LABELS[clamped] ?? "UNKNOWN"}
        </span>
      )}
    </div>
  );
}
