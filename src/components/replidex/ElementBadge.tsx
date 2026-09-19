import type { ElementType } from "@/domain/types";
import { elementMeta } from "@/lib/elements";
import { cn } from "@/lib/cn";

interface ElementBadgeProps {
  element?: ElementType;
  size?: "sm" | "md";
  className?: string;
}

export function ElementBadge({ element, size = "sm", className }: ElementBadgeProps) {
  const meta = elementMeta(element);
  return (
    <span
      className={cn(
        "tac-label inline-flex items-center gap-1 border px-1.5",
        size === "sm" ? "text-[0.58rem] py-0.5" : "text-[0.7rem] py-1",
        className,
      )}
      style={{
        color: meta.color,
        borderColor: meta.color,
        background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
      }}
    >
      <span aria-hidden>{meta.glyph}</span>
      {meta.label}
    </span>
  );
}
