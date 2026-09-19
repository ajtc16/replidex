import Link from "next/link";
import {
  Crosshair,
  Swords,
  Users,
  Shield,
  Package,
  MapPin,
  DraftingCompass,
  ChevronRight,
} from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { TacticalPanel } from "@/components/replidex/TacticalPanel";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import { ElementBadge } from "@/components/replidex/ElementBadge";
import { x1Weapons, x1Characters, x1Blueprints } from "@/data/x1";
import { allMavericks, allWeapons, allStages } from "@/data/registry";

const armorCount = allStages
  .flatMap((s) => s.collectibles)
  .filter((c) => c.type === "armor-upgrade").length;
const itemCount = allStages
  .flatMap((s) => s.collectibles)
  .filter((c) => c.type !== "armor-upgrade").length;

const CATEGORIES = [
  { icon: Crosshair, label: "Mavericks", count: allMavericks.length, href: "/targets", tone: "var(--danger)" },
  { icon: DraftingCompass, label: "Blueprints", count: x1Blueprints.length, href: "/archive/blueprints", tone: "var(--tactical-cyan)", featured: true },
  { icon: Swords, label: "Weapons", count: allWeapons.length, href: "#weapons", tone: "var(--tactical-amber)" },
  { icon: Users, label: "Characters", count: x1Characters.length, href: "#characters", tone: "var(--tactical-cyan)" },
  { icon: Shield, label: "Armor", count: armorCount, href: "#weapons", tone: "var(--tactical-green)" },
  { icon: Package, label: "Items", count: itemCount, href: "#", tone: "var(--tactical-amber)" },
  { icon: MapPin, label: "Locations", count: allStages.length, href: "#", tone: "var(--el-air)" },
];

export default function ArchivePage() {
  return (
    <div>
      <HudHeader
        title="Archive"
        subtitle="Tactical records · Mega Man X1"
        action={<StatusBadge label="Indexed" tone="green" />}
      />

      <div className="space-y-3 p-3">
        {/* Category grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                href={c.href}
                className="group relative flex items-center gap-3 border bg-[var(--surface)] p-3 transition-colors hover:bg-[var(--surface-elevated)]"
                style={{ borderColor: c.featured ? "var(--tactical-cyan)" : "var(--border)" }}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center border"
                  style={{ borderColor: c.tone, color: c.tone, background: `color-mix(in srgb, ${c.tone} 10%, transparent)` }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="tac-label text-[0.62rem] text-[var(--text-primary)]">{c.label}</p>
                  <p className="font-mono text-[0.7rem]" style={{ color: c.tone }}>
                    {c.count} records
                  </p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--tactical-cyan)]" />
              </Link>
            );
          })}
        </div>

        {/* Featured blueprints CTA */}
        <Link
          href="/archive/blueprints"
          className="relative flex items-center justify-between overflow-hidden border border-[var(--tactical-cyan)] p-4 clip-corner"
          style={{ background: "radial-gradient(120% 120% at 0% 0%, #0b1a2e, var(--surface) 70%)" }}
        >
          <div>
            <p className="tac-label text-[0.6rem] text-[var(--tactical-cyan)]">Featured Archive</p>
            <h2 className="font-heading text-lg font-black uppercase text-[var(--text-primary)]">
              Reploid Blueprint Viewer
            </h2>
            <p className="mt-1 text-[0.68rem] text-[var(--text-secondary)]">
              Inspect interactive technical schematics with component-level callouts.
            </p>
          </div>
          <DraftingCompass className="h-10 w-10 shrink-0 text-[color-mix(in_srgb,var(--tactical-cyan)_70%,transparent)]" />
        </Link>

        {/* Weapons codex */}
        <TacticalPanel title="Weapon Codex" id="weapons">
          <ul className="divide-y divide-[var(--border)]">
            {x1Weapons.map((w) => (
              <li key={w.id} className="flex items-start gap-3 py-2.5">
                <ElementBadge element={w.element} />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.8rem] font-semibold text-[var(--text-primary)]">{w.name}</p>
                  <p className="text-[0.66rem] leading-relaxed text-[var(--text-muted)]">{w.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </TacticalPanel>

        {/* Characters codex */}
        <TacticalPanel title="Character Codex" id="characters">
          <div className="grid gap-2 sm:grid-cols-2">
            {x1Characters.map((ch) => (
              <div key={ch.id} className="flex items-start gap-3 border border-[var(--border)] bg-[var(--surface-inset)] p-2.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--border-strong)] text-xl" aria-hidden>
                  {ch.portrait}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.8rem] font-semibold text-[var(--text-primary)]">{ch.name}</p>
                  <p className="tac-label text-[0.5rem] text-[var(--tactical-amber)]">{ch.role}</p>
                  <p className="mt-1 text-[0.64rem] leading-relaxed text-[var(--text-muted)]">{ch.description}</p>
                </div>
              </div>
            ))}
          </div>
        </TacticalPanel>
      </div>
    </div>
  );
}
