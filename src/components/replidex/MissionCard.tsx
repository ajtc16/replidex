import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Maverick, Weapon } from "@/domain/types";
import { TargetPortrait } from "./TargetPortrait";
import { StatusBadge } from "./StatusBadge";

interface MissionCardProps {
  maverick: Maverick;
  reason: string;
  weaknessWeapon?: Weapon;
}

/** "Next recommended target" hero card on the Command dashboard. */
export function MissionCard({ maverick, reason, weaknessWeapon }: MissionCardProps) {
  return (
    <div
      className="relative overflow-hidden border p-4 clip-corner"
      style={{
        borderColor: "var(--border-active)",
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--tactical-amber) 10%, var(--surface)), var(--surface))",
      }}
    >
      <div className="scan-sweep pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(var(--tactical-amber),transparent)] opacity-10" aria-hidden />

      <div className="mb-3 flex items-center justify-between">
        <span className="tac-label text-[0.6rem] text-[var(--tactical-amber)]">
          Next Recommended Target
        </span>
        <StatusBadge label="Priority" tone="amber" pulse />
      </div>

      <div className="flex items-center gap-4">
        <TargetPortrait glyph={maverick.portrait} element={maverick.element} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl font-black uppercase tracking-wide text-[var(--text-primary)]">
            {maverick.name}
          </h3>
          <p className="mt-1 text-[0.75rem] leading-relaxed text-[var(--text-secondary)]">
            {reason}
          </p>
          {weaknessWeapon && (
            <p className="mt-2 text-[0.68rem] text-[var(--text-muted)]">
              Exploit:{" "}
              <span className="text-[var(--tactical-cyan)]">{weaknessWeapon.name}</span>
            </p>
          )}
        </div>
      </div>

      <Link
        href={`/targets/${maverick.slug}`}
        className="tac-label mt-4 inline-flex w-full items-center justify-center gap-2 border border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_14%,transparent)] py-2.5 text-[0.7rem] text-[var(--tactical-amber)] transition-colors hover:bg-[color-mix(in_srgb,var(--tactical-amber)_24%,transparent)]"
      >
        View Mission <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
