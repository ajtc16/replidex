import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Maverick, Weapon } from "@/domain/types";
import { TargetPortrait } from "./TargetPortrait";
import { ElementBadge } from "./ElementBadge";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/cn";

interface MaverickCardProps {
  maverick: Maverick;
  weaknessWeapon?: Weapon;
  rewardWeapon?: Weapon;
  defeated?: boolean;
  className?: string;
}

export function MaverickCard({
  maverick,
  weaknessWeapon,
  rewardWeapon,
  defeated,
  className,
}: MaverickCardProps) {
  return (
    <Link
      href={`/targets/${maverick.slug}`}
      className={cn(
        "group relative flex items-center gap-3 border bg-[var(--surface)] p-3 transition-colors hover:border-[var(--border-active)] hover:bg-[var(--surface-elevated)]",
        className,
      )}
      style={{ borderColor: "var(--border)" }}
    >
      <TargetPortrait glyph={maverick.portrait} element={maverick.element} size="md" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-heading text-[0.98rem] font-bold uppercase tracking-wide text-[var(--text-primary)]">
            {maverick.name}
          </h3>
          <span className="tac-label text-[0.55rem] text-[var(--text-muted)]">
            {maverick.series.toUpperCase()}
          </span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <ElementBadge element={maverick.element} />
          {weaknessWeapon && (
            <span className="inline-flex items-center gap-1 text-[0.62rem]">
              <span className="tac-label text-[0.5rem] text-[var(--danger)]">WEAK</span>
              <span className="text-[var(--text-secondary)]">{weaknessWeapon.name}</span>
            </span>
          )}
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          {rewardWeapon && (
            <span className="truncate text-[0.62rem] text-[var(--text-muted)]">
              <span className="tac-label text-[0.5rem] text-[var(--tactical-cyan)]">GET </span>
              {rewardWeapon.name}
            </span>
          )}
          <StatusBadge
            label={defeated ? "NEUTRALIZED" : "ACTIVE"}
            tone={defeated ? "green" : "danger"}
            pulse={!defeated}
          />
        </div>
      </div>

      <ChevronRight
        className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--tactical-amber)]"
        aria-hidden
      />
    </Link>
  );
}
