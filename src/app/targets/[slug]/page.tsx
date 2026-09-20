"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, ArrowUpRight, Check, MapPin, ScrollText } from "lucide-react";
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
    <div className="dossier-page">
      <HudHeader
        title="Target Dossier"
        subtitle={`${maverick.series.toUpperCase()} / Hunter intelligence archive`}
        action={
          <Link
            href="/targets"
            className="tac-label inline-flex items-center gap-1 border border-[var(--border)] px-2 py-1 text-[0.55rem] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--tactical-amber)]"
          >
            <ArrowLeft className="h-3 w-3" /> Database
          </Link>
        }
      />

      <div className="dossier-content">
        <section className="dossier-hero" aria-labelledby="target-name">
          <div className="dossier-art">
            <TargetPortrait glyph={maverick.portrait} element={maverick.element} size="xl" className="dossier-portrait" />
            <span className="dossier-art-label">VISUAL IDENTIFICATION / X1</span>
            <span className="dossier-reticle" aria-hidden />
          </div>
          <div className="dossier-identity">
            <div className="flex flex-wrap items-center gap-2">
              <span className="dossier-eyebrow">Maverick dossier</span>
              <StatusBadge label={isDefeated ? "Neutralized" : "Active threat"} tone={isDefeated ? "green" : "danger"} pulse={!isDefeated} />
            </div>
            <h2 id="target-name">{maverick.name}</h2>
            <p className="dossier-location">{maverick.location} <span> / {maverick.species}</span></p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <ElementBadge element={maverick.element} size="md" />
              <div className="flex items-center gap-2"><span className="dossier-eyebrow">Threat</span><ThreatMeter level={maverick.threatLevel} /></div>
            </div>
            <Link href={`/archive/blueprints/${maverick.slug === "chill-penguin" ? "chill-penguin" : "x"}`} className="dossier-blueprint-link">
              {maverick.slug === "chill-penguin" ? "Inspect target blueprint" : "Inspect hunter equipment"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        <section className="dossier-loadout" aria-label="Combat essentials">
          <div className="dossier-essential">
            <span className="dossier-eyebrow text-[var(--danger)]">01 / Primary weakness</span>
            {weakness ? <WeaponChip weapon={weakness} href={weaknessSourceSlug ? `/targets/${weaknessSourceSlug}` : undefined} variant="weakness" /> : <p>No known weakness.</p>}
            <p>{maverick.id === "chill-penguin" ? "First encounter? The X-Buster is enough. Save Fire Wave for the rematch." : weakness?.description}</p>
          </div>
          <div className="dossier-essential">
            <span className="dossier-eyebrow text-[var(--tactical-cyan)]">02 / Weapon acquired</span>
            {reward ? <WeaponChip weapon={reward} variant="reward" /> : <p>No weapon reward.</p>}
            <p>{maverick.id === "chill-penguin" ? "Copy the cryo weapon. Freeze your next target with Shotgun Ice." : reward?.description}</p>
          </div>
          <div className="dossier-essential dossier-next">
            <span className="dossier-eyebrow">03 / Next advantage</span>
            {chain?.outgoing ? <Link href={`/targets/${chain.outgoing.maverick.slug}`} className="flex items-center gap-3">
              <TargetPortrait glyph={chain.outgoing.maverick.portrait} element={chain.outgoing.maverick.element} size="sm" />
              <span className="flex-1 font-heading text-lg uppercase">{chain.outgoing.maverick.name}</span><ArrowUpRight size={18} />
            </Link> : <p>No linked target.</p>}
            <p>Follow the weapon chain to plan your next deployment.</p>
          </div>
        </section>

        <div className="dossier-action-bar">
          <p><span className="dossier-eyebrow">Mission status</span><br />{isDefeated ? "Weapon data recovered. Continue the hunt." : "Review the field intel. Engage when ready."}</p>
          <button type="button" onClick={() => toggleMaverick(maverick.id)} aria-pressed={isDefeated} className={cn("dossier-complete", isDefeated && "is-complete")}>
            {isDefeated ? "✓ Neutralized — Undo" : "Mark as neutralized"}
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <TacticalPanel title="Tactical Analysis">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{maverick.description}</p>
          </TacticalPanel>

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
          <TacticalPanel title="Stage Intel" className="lg:col-span-1">
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
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
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
    </div>
  );
}
