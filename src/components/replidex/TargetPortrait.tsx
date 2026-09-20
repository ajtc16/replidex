import type { ElementType } from "@/domain/types";
import { elementMeta } from "@/lib/elements";
import { cn } from "@/lib/cn";

interface TargetPortraitProps {
  glyph: string;
  element?: ElementType;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZES = {
  sm: "h-11 w-11 text-2xl",
  md: "h-16 w-16 text-4xl",
  lg: "h-24 w-24 text-6xl",
  xl: "h-40 w-40 text-8xl",
};

// Atlas positions are explicit, so existing data and every portrait consumer stay aligned.
const PORTRAITS: Record<string, number> = {
  "🔵": 8, "🔴": 9, "🧬": 10, "🛰": 11,
  "chill-penguin": 0, "spark-mandrill": 1, "armored-armadillo": 2, "launch-octopus": 3,
  "boomer-kuwanger": 4, "sting-chameleon": 5, "storm-eagle": 6, "flame-mammoth": 7,
  x: 8, zero: 9, "dr-cain": 10, alia: 11,
};
export function TargetPortrait({
  glyph,
  element,
  size = "md",
  className,
}: TargetPortraitProps) {
  const meta = elementMeta(element);
  const index = PORTRAITS[glyph];
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden border clip-corner",
        SIZES[size],
        className,
      )}
      style={{
        borderColor: `color-mix(in srgb, ${meta.color} 45%, var(--border))`,
        background: `radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, ${meta.color} 22%, var(--surface-inset)), var(--surface-inset))`,
      }}
    >
      {/* blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--tactical-cyan) 20%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--tactical-cyan) 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        aria-hidden
      />
      {index !== undefined ? (
        <span className="absolute inset-0" aria-hidden style={{
          backgroundImage: 'url("/art/x1-portraits.png")',
          backgroundSize: "400% 300%",
          backgroundPosition: `${(index % 4) * 100 / 3}% ${Math.floor(index / 4) * 50}%`,
        }} />
      ) : <span className="relative drop-shadow" aria-hidden>{glyph}</span>}
      {/* corner ticks */}
      <span
        className="pointer-events-none absolute right-1 top-1 h-1.5 w-1.5 border-r border-t"
        style={{ borderColor: meta.color }}
        aria-hidden
      />
    </div>
  );
}
