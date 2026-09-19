import { cn } from "@/lib/cn";

interface ProgressMeterProps {
  value: number; // 0..100
  label?: string;
  showValue?: boolean;
  tone?: string; // css color
  className?: string;
}

export function ProgressMeter({
  value,
  label,
  showValue = true,
  tone = "var(--tactical-amber)",
  className,
}: ProgressMeterProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between">
          {label && (
            <span className="tac-label text-[0.62rem] text-[var(--text-muted)]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-mono text-[0.7rem]" style={{ color: tone }}>
              {pct}%
            </span>
          )}
        </div>
      )}
      <div
        className="relative h-2 w-full overflow-hidden border border-[var(--border)] bg-[var(--surface-inset)]"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full transition-[width] duration-500"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, color-mix(in srgb, ${tone} 55%, transparent), ${tone})`,
            boxShadow: `0 0 12px -2px ${tone}`,
          }}
        />
        {/* segment ticks */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 9px, rgba(7,10,12,0.9) 9px 10px)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
