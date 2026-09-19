"use client";

import { games } from "@/data/registry";
import { useGameStore } from "@/stores/game.store";
import { cn } from "@/lib/cn";

/** Compact series selector for the active "current hunt". */
export function GameSwitcher({ className }: { className?: string }) {
  const seriesId = useGameStore((s) => s.seriesId);
  const setSeries = useGameStore((s) => s.setSeries);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="tac-label text-[0.52rem] text-[var(--text-muted)]" aria-hidden>
        Hunt
      </span>
      <select
        aria-label="Active game"
        value={seriesId}
        onChange={(e) => setSeries(e.target.value as (typeof games)[number]["id"])}
        className="border border-[var(--border)] bg-[var(--surface-inset)] px-2 py-1 text-[0.68rem] text-[var(--tactical-amber)] focus:border-[var(--border-active)] focus:outline-none"
      >
        {games.map((g) => (
          <option key={g.id} value={g.id}>
            {g.id.toUpperCase()} · {g.title}
          </option>
        ))}
      </select>
    </div>
  );
}
