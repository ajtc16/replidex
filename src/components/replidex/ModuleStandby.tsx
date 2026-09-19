import { Radar } from "lucide-react";
import { TacticalPanel } from "./TacticalPanel";
import { StatusBadge } from "./StatusBadge";

/** Shared "module coming online" placeholder for not-yet-built screens. */
export function ModuleStandby({ phase, note }: { phase: string; note: string }) {
  return (
    <TacticalPanel title="Module Status" scanlines brackets>
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Radar className="slow-spin h-10 w-10 text-[var(--tactical-cyan)]" aria-hidden />
        <StatusBadge label={phase} tone="amber" pulse />
        <p className="max-w-sm text-[0.78rem] leading-relaxed text-[var(--text-secondary)]">
          {note}
        </p>
        <p className="tac-label text-[0.55rem] text-[var(--text-muted)]">
          Awaiting deployment authorization
        </p>
      </div>
    </TacticalPanel>
  );
}
