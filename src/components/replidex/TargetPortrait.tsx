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

/**
 * Portrait frame. For MVP the "portrait" is an emoji glyph over a tactical
 * blueprint-grid tile tinted by element (no copyrighted sprite dependency).
 */
export function TargetPortrait({
  glyph,
  element,
  size = "md",
  className,
}: TargetPortraitProps) {
  const meta = elementMeta(element);
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
      <span className="relative drop-shadow" aria-hidden>
        {glyph}
      </span>
      {/* corner ticks */}
      <span
        className="pointer-events-none absolute right-1 top-1 h-1.5 w-1.5 border-r border-t"
        style={{ borderColor: meta.color }}
        aria-hidden
      />
    </div>
  );
}
