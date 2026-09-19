"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, Check, MapPin, Crosshair, ScrollText } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { TacticalPanel } from "@/components/replidex/TacticalPanel";
import { TargetPortrait } from "@/components/replidex/TargetPortrait";
import { ElementBadge } from "@/components/replidex/ElementBadge";
import { ThreatMeter } from "@/components/replidex/ThreatMeter";
import { WeaponChip } from "@/components/replidex/WeaponChip";
import { WeaknessChain } from "@/components/replidex/WeaknessChain";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import {
  allMavericksById,
  allWeaponsById,
  allStagesByMaverickId,
  getGameData,
} from "@/data/registry";
import { getWeaknessChainFor } from "@/services/weaknessGraph";
import { useProgressStore } from "@/stores/progress.store";
import { cn } from "@/lib/cn";

const COLLECTIBLE_TONE: Record<string, string> = {
  "heart-tank": "var(--danger)",
  "sub-tank": "var(--tactical-cyan)",
  "armor-upgrade": "var(--tactical-amber)",
  secret: "var(--tactical-green)",
};

export default function DossierPage() {
  const params = useParams<{ slug: string }>();
  const maverick = allMavericksById[params.slug];

  const defeated = useProgressStore((s) => s.defeatedMavericks);
  const collected = useProgressStore((s) => s.collectedItems);
  const toggleMaverick = useProgressStore((s) => s.toggleMaverick);
  const toggleItem = useProgressStore((s) => s.toggleItem);

  const chain = useMemo(() => {
    if (!maverick) return null;
    const gameData = getGameData(maverick.series);
    return getWeaknessChainFor(maverick, gameData.mavericks, gameData.weaponsById);
  }, [maverick]);

  if (!maverick) return notFound();

  const isDefeated = defeated.includes(maverick.id);
  const weakness = allWeaponsById[maverick.weaknessWeaponId];
  const reward = allWeaponsById[maverick.weaponRewardId];
  const stage = allStagesByMaverickId[maverick.id];
  const weaknessSourceSlug = weakness
    ? allMavericksById[weakness.obtainedFrom]?.slug
    : undefined;

  return (
    <div>
      <HudHeader
        title={maverick.name}
        subtitle={`${maverick.series.toUpperCase()} · Classification: Maverick · ${maverick.location}`}
        action={
          <Link
            href="/targets"
            className="tac-label inline-flex items-center gap-1 border border-[var(--border)] px-2 py-1 text-[0.55rem] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--tactical-amber)]"
          >
            <ArrowLeft className="h-3 w-3" /> Database
          </Link>
        }
      />

      <div className="grid gap-3 p-3 lg:grid-cols-3">
        {/* Portrait + vitals */}
        <TacticalPanel title="Target Dossier" className="lg:col-span-1" scanlines brackets>
          <div className="flex flex-col items-center gap-3 text-center">
            <TargetPortrait glyph={maverick.portrait} element={maverick.element} size="xl" />
            <div>
              <h2 className="font-heading text-2xl font-black uppercase text-[var(--text-primary)]">
                {maverick.name}
              </h2>
              <p className="text-[0.68rem] text-[var(--text-muted)]">{maverick.species}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <ElementBadge element={maverick.element} size="md" />
              <StatusBadge label={isDefeated ? "Neutralized" : "Active"} tone={isDefeated ? "green" : "danger"} pulse={!isDefeated} />
            </div>

            <div className="w-full space-y-2 border-t border-[var(--border)] pt-3 text-left">
              <Row icon={MapPin} label="Location" value={maverick.location} />
              <div className="flex items-center justify-between">
                <span className="tac-label flex items-center gap-1.5 text-[0.6rem] text-[var(--text-muted)]">
                  <Crosshair className="h-3 w-3" /> Threat
                </span>
                <ThreatMeter level={maverick.threatLevel} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleMaverick(maverick.id)}
              className={cn(
                "tac-label mt-1 w-full border py-2.5 text-[0.68rem] transition-colors",
                isDefeated
                  ? "border-[var(--tactical-green)] bg-[color-mix(in_srgb,var(--tactical-green)_14%,transparent)] text-[var(--tactical-green)]"
                  : "border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_14%,transparent)] text-[var(--tactical-amber)] hover:bg-[color-mix(in_srgb,var(--tactical-amber)_24%,transparent)]",
              )}
            >
              {isDefeated ? "✓ Target Neutralized — Undo" : "Mark as Neutralized"}
            </button>
          </div>
        </TacticalPanel>

        <div className="space-y-3 lg:col-span-2">
          {/* Tactical analysis */}
          <TacticalPanel title="Tactical Analysis">
            <p className="text-[0.82rem] italic leading-relaxed text-[var(--text-secondary)]">
              &ldquo;{maverick.description}&rdquo;
            </p>
            <p className="tac-label mt-2 text-[0.5rem] text-[var(--text-muted)]">— Replidex Analysis</p>
          </TacticalPanel>

          {/* Weakness + reward */}
          <div className="grid gap-3 sm:grid-cols-2">
            <TacticalPanel title="Primary Weakness">
              {weakness ? (
                <div className="space-y-2">
                  <WeaponChip
                    weapon={weakness}
                    variant="weakness"
                    href={weaknessSourceSlug ? `/targets/${weaknessSourceSlug}` : undefined}
                  />
                  <p className="text-[0.7rem] leading-relaxed text-[var(--text-muted)]">
                    {weakness.description}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">No known weakness.</p>
              )}
            </TacticalPanel>

            <TacticalPanel title="Weapon Acquired">
              {reward ? (
                <div className="space-y-2">
                  <WeaponChip weapon={reward} variant="reward" />
                  <p className="text-[0.7rem] leading-relaxed text-[var(--text-muted)]">
                    {reward.description}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">No weapon reward.</p>
              )}
            </TacticalPanel>
          </div>

          {/* Abilities & patterns */}
          <TacticalPanel title="Abilities & Attack Patterns">
            <div className="grid gap-2 sm:grid-cols-2">
              {maverick.abilities.map((a) => (
                <div key={a.id} className="border border-[var(--border)] bg-[var(--surface-inset)] p-2.5">
                  <p className="tac-label text-[0.62rem] text-[var(--tactical-cyan)]">{a.name}</p>
                  <p className="mt-1 text-[0.7rem] leading-relaxed text-[var(--text-secondary)]">{a.description}</p>
                </div>
              ))}
            </div>
            {maverick.attackPatterns.length > 0 && (
              <div className="mt-3 space-y-2">
                {maverick.attackPatterns.map((p) => (
                  <div key={p.id} className="border-l-2 border-[var(--tactical-amber)] bg-[var(--surface-inset)] p-2.5">
                    <p className="text-[0.74rem] font-semibold text-[var(--text-primary)]">{p.name}</p>
                    <p className="mt-0.5 text-[0.68rem] text-[var(--text-secondary)]">{p.description}</p>
                    {p.counter && (
                      <p className="mt-1 text-[0.66rem] text-[var(--tactical-green)]">
                        <span className="tac-label text-[0.5rem]">Counter · </span>
                        {p.counter}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TacticalPanel>
        </div>

        {/* Stage intel */}
        {stage && (
          <TacticalPanel title="Stage Intel" className="lg:col-span-3">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--tactical-cyan)]" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{stage.name}</p>
                <p className="text-[0.62rem] text-[var(--text-muted)]">{stage.location}</p>
              </div>
            </div>
            {stage.collectibles.length === 0 && (
              <p className="text-[0.72rem] text-[var(--text-muted)]">
                Collectible intel for this sector has not been catalogued yet (TODO).
              </p>
            )}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {stage.collectibles.map((c) => {
                const has = collected.includes(c.id);
                const tone = COLLECTIBLE_TONE[c.type];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleItem(c.id)}
                    aria-pressed={has}
                    className={cn(
                      "flex items-start gap-2.5 border p-2.5 text-left transition-colors",
                      has ? "bg-[var(--surface-elevated)]" : "bg-[var(--surface-inset)] hover:bg-[var(--surface-elevated)]",
                    )}
                    style={{ borderColor: has ? tone : "var(--border)" }}
                  >
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border"
                      style={{ borderColor: tone, background: has ? tone : "transparent" }}
                      aria-hidden
                    >
                      {has && <Check className="h-3.5 w-3.5 text-[var(--background)]" />}
                    </span>
                    <div className="min-w-0">
                      <p className="tac-label text-[0.52rem]" style={{ color: tone }}>
                        {c.type.replace("-", " ")}
                      </p>
                      <p className="text-[0.74rem] font-semibold text-[var(--text-primary)]">{c.name}</p>
                      <p className="mt-0.5 text-[0.62rem] leading-relaxed text-[var(--text-muted)]">{c.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </TacticalPanel>
        )}

        {/* Field notes */}
        {maverick.fieldNotes && maverick.fieldNotes.length > 0 && (
          <TacticalPanel title="Field Notes" className="lg:col-span-1">
            <ul className="space-y-2">
              {maverick.fieldNotes.map((note, i) => (
                <li key={i} className="flex gap-2 text-[0.72rem] leading-relaxed text-[var(--text-secondary)]">
                  <ScrollText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--tactical-amber)]" aria-hidden />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </TacticalPanel>
        )}

        {/* Weakness chain */}
        {chain && (
          <TacticalPanel title="Boss Weakness Chain" className="lg:col-span-2" scanlines>
            <p className="mb-4 text-[0.66rem] text-[var(--text-muted)]">
              Exploit loop — defeat the source to obtain the weapon, then strike the next target.
            </p>
            <WeaknessChain chain={chain} />
          </TacticalPanel>
        )}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="tac-label flex items-center gap-1.5 text-[0.6rem] text-[var(--text-muted)]">
        <Icon className="h-3 w-3" /> {label}
      </span>
      <span className="text-[0.72rem] text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
