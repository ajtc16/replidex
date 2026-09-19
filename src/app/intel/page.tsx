"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { TacticalPanel } from "@/components/replidex/TacticalPanel";
import { CommLinkCard } from "@/components/replidex/CommLinkCard";
import { TacticalLog } from "@/components/replidex/TacticalLog";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import {
  x1Briefings,
  x1Transmissions,
  x1MavericksById,
  x1Mavericks,
  x1WeaponsById,
  x1Stages,
} from "@/data/x1";
import { generateLogs } from "@/services/logs";
import { useProgressStore } from "@/stores/progress.store";
import { cn } from "@/lib/cn";

type Tab = "briefings" | "comm" | "logs";

const TABS: { id: Tab; label: string }[] = [
  { id: "briefings", label: "Briefings" },
  { id: "comm", label: "Comm-Link" },
  { id: "logs", label: "Tactical Logs" },
];

const PRIORITY_TONE = {
  critical: "danger",
  elevated: "amber",
  routine: "cyan",
} as const;

export default function IntelPage() {
  const [tab, setTab] = useState<Tab>("briefings");
  const progress = useProgressStore();
  const hydrated = useProgressStore((s) => s.hydrated);

  const logs = useMemo(
    () => generateLogs(progress, x1MavericksById, x1WeaponsById, x1Stages),
    [progress],
  );

  return (
    <div>
      <HudHeader
        title="Intel Hub"
        subtitle="Command communications & operational intelligence"
        action={<StatusBadge label="Channel Secure" tone="green" pulse />}
      />

      <div className="p-3">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Intel sections"
          className="flex border border-[var(--border)] bg-[var(--surface-inset)] p-1"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "tac-label flex-1 py-2 text-[0.6rem] transition-colors",
                tab === t.id
                  ? "bg-[color-mix(in_srgb,var(--tactical-amber)_16%,transparent)] text-[var(--tactical-amber)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-3">
          {tab === "briefings" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {x1Briefings.map((b) => (
                <TacticalPanel key={b.id} title={b.operation} scanlines>
                  <div className="mb-2 flex items-center justify-between">
                    <StatusBadge
                      label={b.priority}
                      tone={PRIORITY_TONE[b.priority]}
                      pulse={b.priority === "critical"}
                    />
                    <span className="font-mono text-[0.58rem] text-[var(--text-muted)]">{b.timestamp}</span>
                  </div>
                  <div className="flex gap-2">
                    {b.priority !== "routine" && (
                      <AlertTriangle
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: `var(--${PRIORITY_TONE[b.priority] === "danger" ? "danger" : "warning"})` }}
                        aria-hidden
                      />
                    )}
                    <p className="text-[0.76rem] leading-relaxed text-[var(--text-secondary)]">{b.body}</p>
                  </div>
                  {b.relatedMaverickId && x1MavericksById[b.relatedMaverickId] && (
                    <a
                      href={`/targets/${x1MavericksById[b.relatedMaverickId].slug}`}
                      className="tac-label mt-3 inline-block text-[0.55rem] text-[var(--tactical-amber)] hover:underline"
                    >
                      Open Target Dossier →
                    </a>
                  )}
                </TacticalPanel>
              ))}
            </div>
          )}

          {tab === "comm" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {x1Transmissions.map((tx) => (
                <CommLinkCard
                  key={tx.id}
                  transmission={tx}
                  maverickSlug={
                    tx.relatedMaverickId
                      ? x1MavericksById[tx.relatedMaverickId]?.slug
                      : undefined
                  }
                />
              ))}
            </div>
          )}

          {tab === "logs" && (
            <TacticalPanel title="Tactical Logs" action={<StatusBadge label={`${logs.length} Entries`} tone="cyan" />}>
              {hydrated ? (
                <TacticalLog entries={logs} />
              ) : (
                <p className="py-4 text-center text-[0.72rem] text-[var(--text-muted)]">Syncing logs…</p>
              )}
            </TacticalPanel>
          )}
        </div>

        <p className="mt-4 text-center text-[0.55rem] text-[var(--text-muted)]">
          Tactical logs are generated live from your campaign progress · {x1Mavericks.length} targets tracked
        </p>
      </div>
    </div>
  );
}
