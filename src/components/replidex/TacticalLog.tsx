import { Swords, Crosshair, Package, Radio } from "lucide-react";
import type { TacticalLogEntry } from "@/services/logs";

const KIND_META = {
  combat: { icon: Swords, tone: "var(--danger)" },
  weapon: { icon: Crosshair, tone: "var(--tactical-cyan)" },
  recovery: { icon: Package, tone: "var(--tactical-amber)" },
  intel: { icon: Radio, tone: "var(--text-muted)" },
} as const;

export function TacticalLog({ entries }: { entries: TacticalLogEntry[] }) {
  return (
    <ol className="relative space-y-0">
      {entries.map((entry, i) => {
        const meta = KIND_META[entry.kind];
        const Icon = meta.icon;
        const last = i === entries.length - 1;
        return (
          <li key={entry.id} className="relative flex gap-3 pb-4">
            {/* timeline rail */}
            {!last && (
              <span
                className="absolute left-[13px] top-7 h-full w-px bg-[var(--border)]"
                aria-hidden
              />
            )}
            <span
              className="relative z-10 mt-0.5 grid h-7 w-7 shrink-0 place-items-center border bg-[var(--surface-inset)]"
              style={{ borderColor: meta.tone, color: meta.tone }}
              aria-hidden
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1 border-b border-dashed border-[var(--border)] pb-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[0.82rem] font-semibold text-[var(--text-primary)]">
                  {entry.action}
                </p>
                <span
                  className="tac-label shrink-0 text-[0.5rem]"
                  style={{ color: meta.tone }}
                >
                  {entry.actor}
                </span>
              </div>
              <p className="mt-0.5 text-[0.66rem] text-[var(--text-muted)]">{entry.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
