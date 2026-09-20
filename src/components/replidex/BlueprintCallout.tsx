import type { BlueprintModule } from "@/domain/types";
import { cn } from "@/lib/cn";

interface BlueprintCalloutProps {
  module: BlueprintModule;
  active: boolean;
  onSelect: (id: string) => void;
}

/**
 * A clickable hotspot pinned at the module's normalized position over the
 * blueprint canvas. Positions are percentages so they track any viewport.
 */
export function BlueprintCallout({ module, active, onSelect }: BlueprintCalloutProps) {
  if (!module.position) return null;
  return (
    <button
      type="button"
      onClick={() => onSelect(module.id)}
      aria-pressed={active}
      aria-label={`${module.name} — ${module.category}`}
      className="absolute grid h-11 w-11 place-items-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${module.position.x}%`, top: `${module.position.y}%` }}
    >
      <span className="relative grid place-items-center">
        {/* pulse ring */}
        <span
          className={cn(
            "absolute h-6 w-6 rounded-full border",
            active ? "border-[var(--tactical-amber)]" : "border-[var(--tactical-cyan)] status-pulse",
          )}
          style={{ color: active ? "var(--tactical-amber)" : "var(--tactical-cyan)" }}
          aria-hidden
        />
        <span
          className="relative h-2.5 w-2.5 rounded-full"
          style={{
            background: active ? "var(--tactical-amber)" : "var(--tactical-cyan)",
            boxShadow: `0 0 10px ${active ? "var(--tactical-amber)" : "var(--tactical-cyan)"}`,
          }}
          aria-hidden
        />
      </span>
    </button>
  );
}
