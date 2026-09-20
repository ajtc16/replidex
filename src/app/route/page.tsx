"use client";

import { useMemo, useState } from "react";
import { ArrowDown, Lightbulb, RotateCcw } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { TacticalPanel } from "@/components/replidex/TacticalPanel";
import { RouteCard } from "@/components/replidex/RouteCard";
import { ProgressMeter } from "@/components/replidex/ProgressMeter";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import { GameSwitcher } from "@/components/replidex/GameSwitcher";
import { getGameData } from "@/data/registry";
import {
  buildRoute,
  getNextRecommendedTarget,
  type RouteMode,
} from "@/services/recommendations";
import { useProgressStore } from "@/stores/progress.store";
import { useGameStore } from "@/stores/game.store";
import { cn } from "@/lib/cn";

interface ModeOption {
  id: RouteMode | "collect" | "minimal" | "custom";
  label: string;
  available: boolean;
}

const MODES: ModeOption[] = [
  { id: "beginner", label: "Beginner Friendly", available: true },
  { id: "weakness", label: "Boss Weakness", available: true },
  { id: "collect", label: "Collect Everything", available: true },
  { id: "minimal", label: "Minimum Backtracking", available: true },
  { id: "custom", label: "Custom", available: false },
];

const MODE_BADGE: Record<RouteMode, string> = {
  weakness: "Weakness Exploit",
  beginner: "Buster Route",
  collect: "Completionist",
  minimal: "Single Pass",
};

export default function RoutePage() {
  const progress = useProgressStore();
  const hydrated = useProgressStore((s) => s.hydrated);
  const toggleMaverick = useProgressStore((s) => s.toggleMaverick);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const seriesId = useGameStore((s) => s.seriesId);
  const [mode, setMode] = useState<RouteMode>("weakness");

  const { mavericks, weaponsById, stagesByMaverickId } = useMemo(
    () => getGameData(seriesId),
    [seriesId],
  );

  const route = useMemo(
    () => buildRoute(mode, progress, mavericks, weaponsById, stagesByMaverickId),
    [mode, progress, mavericks, weaponsById, stagesByMaverickId],
  );

  const next = useMemo(
    () => getNextRecommendedTarget(progress, mavericks, weaponsById),
    [progress, mavericks, weaponsById],
  );

  const completed = route.filter((n) => n.status === "complete").length;
  const routePercent = Math.round((completed / route.length) * 100);

  return (
    <div>
      <HudHeader
        title="Hunter Route"
        subtitle={`Deployment sequencing · ${seriesId.toUpperCase()}`}
        action={
          <div className="flex items-center gap-2">
            <GameSwitcher className="hidden sm:flex" />
            <StatusBadge label={`${completed}/${route.length} Cleared`} tone={completed === route.length ? "green" : "cyan"} />
          </div>
        }
      />

      <div className="px-3 pt-3 sm:hidden">
        <GameSwitcher />
      </div>

      <div className="space-y-3 p-3">
        {/* Mode selector */}
        <TacticalPanel title="Route Mode">
          <div className="flex flex-wrap gap-1.5">
            {MODES.map((m) => {
              const active = m.available && mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={!m.available}
                  onClick={() => m.available && setMode(m.id as RouteMode)}
                  aria-pressed={active}
                  className={cn(
                    "tac-label border px-2.5 py-1.5 text-[0.58rem] transition-colors",
                    active
                      ? "border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_16%,transparent)] text-[var(--tactical-amber)]"
                      : m.available
                        ? "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                        : "cursor-not-allowed border-[var(--border)] text-[var(--text-muted)] opacity-50",
                  )}
                >
                  {m.label}
                  {!m.available && <span className="ml-1 text-[0.5rem]">· soon</span>}
                </button>
              );
            })}
          </div>
        </TacticalPanel>

        {/* Tactical recommendation */}
        <TacticalPanel
          title="Tactical Recommendation"
          scanlines
          action={<StatusBadge label={MODE_BADGE[mode]} tone="amber" />}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tactical-amber)]" aria-hidden />
            <div role="status" aria-live="polite">
              {hydrated && next ? (
                <p className="text-[0.82rem] leading-relaxed text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">{next.maverick.name}</span>{" "}
                  is currently recommended — {next.reason}
                </p>
              ) : hydrated ? (
                <p className="text-[0.82rem] text-[var(--tactical-green)]">
                  All primary Mavericks neutralized. The route to Sigma&rsquo;s fortress is clear.
                </p>
              ) : (
                <p className="text-[0.82rem] text-[var(--text-muted)]">Analyzing progress…</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <ProgressMeter label="Route Progress" value={hydrated ? routePercent : 0} />
          </div>
        </TacticalPanel>

        {/* Route list */}
        <div className="space-y-0">
          {route.map((node, i) => (
            <div key={node.maverick.id}>
              <RouteCard
                node={node}
                collectibles={stagesByMaverickId[node.maverick.id]?.collectibles ?? []}
                collectedIds={progress.collectedItems}
                onToggleDefeat={toggleMaverick}
              />
              {i < route.length - 1 && (
                <div className="flex justify-center py-1.5" aria-hidden>
                  <ArrowDown className="h-4 w-4 text-[var(--border-strong)]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reset */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={resetProgress}
            className="tac-label inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 text-[0.55rem] text-[var(--text-muted)] transition-colors hover:border-[var(--danger)] hover:text-[var(--danger)]"
          >
            <RotateCcw className="h-3 w-3" /> Reset Campaign Progress
          </button>
        </div>
      </div>
    </div>
  );
}
