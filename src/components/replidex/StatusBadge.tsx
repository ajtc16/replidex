import { cn } from "@/lib/cn";

type Tone = "amber" | "cyan" | "green" | "danger" | "muted";

const TONE: Record<Tone, { color: string; bg: string; border: string }> = {
  amber: { color: "var(--tactical-amber)", bg: "rgba(240,167,66,0.12)", border: "rgba(240,167,66,0.4)" },
  cyan: { color: "var(--tactical-cyan)", bg: "rgba(63,208,224,0.12)", border: "rgba(63,208,224,0.4)" },
  green: { color: "var(--tactical-green)", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.4)" },
  danger: { color: "var(--danger)", bg: "rgba(232,86,74,0.14)", border: "rgba(232,86,74,0.45)" },
  muted: { color: "var(--text-muted)", bg: "rgba(92,112,120,0.12)", border: "rgba(92,112,120,0.35)" },
};

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({
  label,
  tone = "amber",
  pulse,
  className,
}: StatusBadgeProps) {
  const t = TONE[tone];
  return (
    <span
      className={cn(
        "tac-label inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.6rem]",
        className,
      )}
      style={{ color: t.color, background: t.bg, border: `1px solid ${t.border}` }}
    >
      <span
        className={cn("inline-block h-1.5 w-1.5 rounded-full", pulse && "status-pulse")}
        style={{ background: t.color, color: t.color }}
        aria-hidden
      />
      {label}
    </span>
  );
}
