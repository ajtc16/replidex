import { X } from "lucide-react";
import type { BlueprintModule } from "@/domain/types";
import { cn } from "@/lib/cn";

const CATEGORY_TONE: Record<BlueprintModule["category"], string> = {
  frame: "var(--tactical-cyan)",
  systems: "var(--tactical-amber)",
  armor: "var(--tactical-green)",
  armaments: "var(--danger)",
};

const STATUS_LABEL: Record<NonNullable<BlueprintModule["status"]>, string> = {
  standard: "Standard",
  upgradeable: "Upgradeable",
  experimental: "Experimental",
};

interface BlueprintInspectorProps {
  module?: BlueprintModule;
  onClose?: () => void;
  className?: string;
}

export function BlueprintInspector({ module, onClose, className }: BlueprintInspectorProps) {
  if (!module) {
    return (
      <div className={cn("flex h-full flex-col items-center justify-center gap-2 border border-dashed border-[var(--border)] p-6 text-center", className)}>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-strong)] text-[var(--text-muted)]">
          ⌖
        </span>
        <p className="text-[0.72rem] text-[var(--text-muted)]">
          Select a highlighted component to inspect its schematic data.
        </p>
      </div>
    );
  }

  const tone = CATEGORY_TONE[module.category];

  return (
    <div
      className={cn("relative border bg-[var(--surface)] p-4", className)}
      style={{ borderColor: tone }}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inspector"
          className="absolute right-2 top-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <span className="tac-label text-[0.55rem]" style={{ color: tone }}>
        {module.category}
      </span>
      <h3 className="mt-1 font-heading text-lg font-bold uppercase tracking-wide text-[var(--text-primary)]">
        {module.name}
      </h3>

      <div className="my-3 h-px w-full" style={{ background: `color-mix(in srgb, ${tone} 40%, transparent)` }} />

      <p className="text-[0.78rem] leading-relaxed text-[var(--text-secondary)]">
        {module.description}
      </p>

      {module.status && (
        <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-2.5">
          <span className="tac-label text-[0.55rem] text-[var(--text-muted)]">Status</span>
          <span
            className="tac-label border px-2 py-0.5 text-[0.55rem]"
            style={{
              color: tone,
              borderColor: tone,
              background: `color-mix(in srgb, ${tone} 10%, transparent)`,
            }}
          >
            {STATUS_LABEL[module.status]}
          </span>
        </div>
      )}
    </div>
  );
}
