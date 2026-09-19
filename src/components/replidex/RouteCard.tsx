import Link from "next/link";
import { Lock, Check, Crosshair, Gem } from "lucide-react";
import type { RouteNode, StageCollectible } from "@/domain/types";
import { TargetPortrait } from "./TargetPortrait";
import { StatusBadge } from "./StatusBadge";
import { WeaponChip } from "./WeaponChip";
import { cn } from "@/lib/cn";

interface RouteCardProps {
  node: RouteNode;
  collectibles: StageCollectible[];
  collectedIds: string[];
  onToggleDefeat: (id: string) => void;
}

const STATUS_TONE = {
  complete: "green",
  available: "amber",
  locked: "muted",
} as const;

export function RouteCard({
  node,
  collectibles,
  collectedIds,
  onToggleDefeat,
}: RouteCardProps) {
  const { maverick, status, weaponReward, reason } = node;
  const collectedCount = collectibles.filter((c) => collectedIds.includes(c.id)).length;
  const locked = status === "locked";

  return (
    <div
      className={cn(
        "relative border bg-[var(--surface)] p-3 transition-opacity",
        locked && "opacity-70",
      )}
      style={{
        borderColor:
          status === "complete"
            ? "color-mix(in srgb, var(--tactical-green) 45%, var(--border))"
            : status === "available"
              ? "var(--border-active)"
              : "var(--border)",
      }}
    >
      <div className="flex items-start gap-3">
        {/* order index */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-mono text-lg font-bold leading-none"
            style={{
              color:
                status === "complete"
                  ? "var(--tactical-green)"
                  : status === "available"
                    ? "var(--tactical-amber)"
                    : "var(--text-muted)",
            }}
          >
            {String(node.order).padStart(2, "0")}
          </span>
        </div>

        <TargetPortrait glyph={maverick.portrait} element={maverick.element} size="md" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/targets/${maverick.slug}`}
              className="truncate font-heading text-[0.98rem] font-bold uppercase tracking-wide text-[var(--text-primary)] hover:text-[var(--tactical-amber)]"
            >
              {maverick.name}
            </Link>
            <StatusBadge
              label={status === "complete" ? "Complete" : status === "available" ? "Available" : "Locked"}
              tone={STATUS_TONE[status]}
              pulse={status === "available"}
            />
          </div>

          <p className="mt-1 text-[0.68rem] leading-relaxed text-[var(--text-secondary)]">
            {reason}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {weaponReward && (
              <WeaponChip weapon={weaponReward} variant="reward" className="scale-95" />
            )}
            {collectibles.length > 0 && (
              <span className="tac-label inline-flex items-center gap-1 border border-[var(--border)] px-1.5 py-1 text-[0.52rem] text-[var(--text-muted)]">
                <Gem className="h-3 w-3 text-[var(--tactical-cyan)]" />
                {collectedCount}/{collectibles.length} Items
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onToggleDefeat(maverick.id)}
        className={cn(
          "tac-label mt-3 flex w-full items-center justify-center gap-1.5 border py-2 text-[0.6rem] transition-colors",
          status === "complete"
            ? "border-[var(--tactical-green)] bg-[color-mix(in_srgb,var(--tactical-green)_12%,transparent)] text-[var(--tactical-green)]"
            : "border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_12%,transparent)] text-[var(--tactical-amber)] hover:bg-[color-mix(in_srgb,var(--tactical-amber)_22%,transparent)]",
        )}
      >
        {status === "complete" ? (
          <>
            <Check className="h-3.5 w-3.5" /> Neutralized — Undo
          </>
        ) : locked ? (
          <>
            <Lock className="h-3.5 w-3.5" /> Deploy Anyway
          </>
        ) : (
          <>
            <Crosshair className="h-3.5 w-3.5" /> Mark Neutralized
          </>
        )}
      </button>
    </div>
  );
}
