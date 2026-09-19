"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Activity, ShieldAlert, Radio, ChevronRight } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { TacticalPanel } from "@/components/replidex/TacticalPanel";
import { TacticalGlobe } from "@/components/replidex/TacticalGlobe";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import { ProgressMeter } from "@/components/replidex/ProgressMeter";
import { MissionCard } from "@/components/replidex/MissionCard";
import { MaverickCard } from "@/components/replidex/MaverickCard";
import { TargetPortrait } from "@/components/replidex/TargetPortrait";
import { GameSwitcher } from "@/components/replidex/GameSwitcher";
import { getGameData } from "@/data/registry";
import { useProgressStore } from "@/stores/progress.store";
import { useGameStore } from "@/stores/game.store";
import { computeCompletion } from "@/services/progress";
import { getNextRecommendedTarget } from "@/services/recommendations";

const GLOBE_MARKERS = [
  { cx: 70, cy: 78, tone: "var(--danger)" },
  { cx: 128, cy: 96, tone: "var(--tactical-amber)" },
  { cx: 96, cy: 130, tone: "var(--danger)" },
  { cx: 140, cy: 68, tone: "var(--tactical-cyan)" },
  { cx: 84, cy: 108, tone: "var(--tactical-amber)" },
];

export default function CommandPage() {
  const progress = useProgressStore();
  const hydrated = useProgressStore((s) => s.hydrated);
  const seriesId = useGameStore((s) => s.seriesId);
  const gameHydrated = useGameStore((s) => s.hydrated);

  const { game, mavericks, mavericksById, weaponsById, stages } = useMemo(() => {
    const d = getGameData(seriesId);
    return {
      game: d.game,
      mavericks: d.mavericks,
      mavericksById: Object.fromEntries(d.mavericks.map((m) => [m.id, m])),
      weaponsById: d.weaponsById,
      stages: d.stages,
    };
  }, [seriesId]);

  // In-game defeats only (progress is global; scope dashboard to active game).
  const gameDefeats = useMemo(
    () => progress.defeatedMavericks.filter((id) => mavericksById[id]),
    [progress.defeatedMavericks, mavericksById],
  );

  const completion = useMemo(
    () =>
      computeCompletion(
        { ...progress, defeatedMavericks: gameDefeats },
        mavericks.length,
        stages,
      ),
    [progress, gameDefeats, mavericks.length, stages],
  );

  const activeSignals = mavericks.length - gameDefeats.length;

  const nextTarget = useMemo(
    () => getNextRecommendedTarget(progress, mavericks, weaponsById),
    [progress, mavericks, weaponsById],
  );

  const recentDeployments = useMemo(
    () =>
      gameDefeats
        .slice(-3)
        .reverse()
        .map((id) => mavericksById[id])
        .filter(Boolean),
    [gameDefeats, mavericksById],
  );

  const highValueTargets = useMemo(
    () => mavericks.filter((m) => !progress.defeatedMavericks.includes(m.id)).slice(0, 4),
    [mavericks, progress.defeatedMavericks],
  );

  return (
    <div>
      <HudHeader
        title="Replidex"
        subtitle={`Maverick Hunter Command Network · ${seriesId.toUpperCase()}`}
        action={
          <div className="flex items-center gap-2">
            <GameSwitcher className="hidden sm:flex" />
            <StatusBadge
              label={activeSignals > 4 ? "Status: Critical" : "Status: Elevated"}
              tone={activeSignals > 4 ? "danger" : "amber"}
              pulse
            />
          </div>
        }
      />

      <div className="px-3 pt-3 sm:hidden">
        <GameSwitcher />
      </div>

      <div className="grid gap-3 p-3 lg:grid-cols-3">
        {/* Tactical deployment */}
        <TacticalPanel
          title="Tactical Deployment"
          className="lg:col-span-2"
          scanlines
          action={<StatusBadge label="Live" tone="cyan" pulse />}
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <TacticalGlobe markers={hydrated ? GLOBE_MARKERS.slice(0, Math.max(1, activeSignals - 2)) : GLOBE_MARKERS} />
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
              <Stat icon={Radio} label="Active Signals" value={hydrated && gameHydrated ? activeSignals : mavericks.length} tone="var(--danger)" />
              <Stat icon={Activity} label="Hunters Online" value={3} tone="var(--tactical-cyan)" />
              <Stat icon={ShieldAlert} label="Threats Escalating" value={hydrated ? Math.min(2, activeSignals) : 2} tone="var(--tactical-amber)" />
            </div>
          </div>
        </TacticalPanel>

        {/* Current hunt */}
        <TacticalPanel title="Current Hunt">
          <p className="font-heading text-lg font-bold uppercase text-[var(--text-primary)]">
            {game.title}
          </p>
          <p className="mb-3 text-[0.68rem] text-[var(--text-muted)]">{game.subtitle}</p>

          <div className="space-y-2.5 text-[0.72rem]">
            <StatLine label="Bosses Defeated" value={`${completion.bossesDefeated} / ${completion.bossesTotal}`} />
            <StatLine label="Heart Tanks" value={`${completion.heartTanks} / ${completion.heartTanksTotal}`} />
            <StatLine label="Sub Tanks" value={`${completion.subTanks} / ${completion.subTanksTotal}`} />
            <StatLine label="Armor Upgrades" value={`${completion.armorUpgrades} / ${completion.armorUpgradesTotal}`} />
          </div>

          <div className="mt-4">
            <ProgressMeter label="Completion" value={hydrated ? completion.percent : 0} />
          </div>
        </TacticalPanel>

        {/* Next recommended target */}
        <div className="lg:col-span-2">
          {nextTarget ? (
            <MissionCard
              maverick={nextTarget.maverick}
              reason={nextTarget.reason}
              weaknessWeapon={nextTarget.weaknessWeapon}
            />
          ) : (
            <TacticalPanel title="Next Recommended Target">
              <p className="py-6 text-center text-sm text-[var(--tactical-green)]">
                All primary Mavericks neutralized. Proceed to the fortress.
              </p>
            </TacticalPanel>
          )}
        </div>

        {/* Recent deployments */}
        <TacticalPanel
          title="Recent Deployments"
          action={
            <Link href="/route" className="tac-label text-[0.55rem] text-[var(--tactical-cyan)] hover:underline">
              View All
            </Link>
          }
        >
          {recentDeployments.length === 0 ? (
            <p className="py-4 text-center text-[0.72rem] text-[var(--text-muted)]">
              No deployments logged. Select a target to begin.
            </p>
          ) : (
            <ul className="space-y-2">
              {recentDeployments.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/targets/${m.slug}`}
                    className="flex items-center gap-2.5 border border-transparent p-1.5 transition-colors hover:border-[var(--border)] hover:bg-[var(--surface-elevated)]"
                  >
                    <TargetPortrait glyph={m.portrait} element={m.element} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.78rem] font-semibold text-[var(--text-primary)]">{m.name}</p>
                      <p className="truncate text-[0.6rem] text-[var(--text-muted)]">{m.location}</p>
                    </div>
                    <StatusBadge label="Cleared" tone="green" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </TacticalPanel>

        {/* High-value targets */}
        <TacticalPanel
          title="High-Value Targets"
          className="lg:col-span-3"
          action={
            <Link href="/targets" className="tac-label inline-flex items-center gap-1 text-[0.55rem] text-[var(--tactical-cyan)] hover:underline">
              Full Database <ChevronRight className="h-3 w-3" />
            </Link>
          }
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {highValueTargets.map((m) => (
              <MaverickCard
                key={m.id}
                maverick={m}
                weaknessWeapon={weaponsById[m.weaknessWeaponId]}
                rewardWeapon={weaponsById[m.weaponRewardId]}
                defeated={progress.defeatedMavericks.includes(m.id)}
              />
            ))}
          </div>
        </TacticalPanel>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-2 border border-[var(--border)] bg-[var(--surface-inset)] p-2">
      <Icon className="h-4 w-4 shrink-0" style={{ color: tone }} aria-hidden />
      <div className="min-w-0">
        <p className="font-mono text-lg font-bold leading-none" style={{ color: tone }}>
          {value}
        </p>
        <p className="tac-label mt-0.5 text-[0.5rem] text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-[var(--border)] pb-1.5">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className="font-mono text-[var(--tactical-amber)]">{value}</span>
    </div>
  );
}
