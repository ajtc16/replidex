"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { MaverickCard } from "@/components/replidex/MaverickCard";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import type { ElementType } from "@/domain/types";
import { allMavericks, allWeaponsById, games } from "@/data/registry";
import { ELEMENT_META } from "@/lib/elements";
import { useProgressStore } from "@/stores/progress.store";
import { cn } from "@/lib/cn";

type StatusFilter = "all" | "active" | "cleared";

const ELEMENT_OPTIONS = Object.entries(ELEMENT_META)
  .filter(([k]) => allMavericks.some((m) => m.element === k))
  .map(([k, v]) => ({ value: k as ElementType, label: v.label }));

const SERIES_OPTIONS = [
  { value: "all", label: "All Series" },
  ...games.map((g) => ({ value: g.id, label: `${g.id.toUpperCase()} — ${g.title}` })),
];

export default function TargetDatabasePage() {
  const defeated = useProgressStore((s) => s.defeatedMavericks);
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("all");
  const [element, setElement] = useState<"all" | ElementType>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [showFilters, setShowFilters] = useState(true);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMavericks.filter((m) => {
      if (q && !`${m.name} ${m.species ?? ""} ${m.location}`.toLowerCase().includes(q)) return false;
      if (series !== "all" && m.series !== series) return false;
      if (element !== "all" && m.element !== element) return false;
      const isDefeated = defeated.includes(m.id);
      if (status === "active" && isDefeated) return false;
      if (status === "cleared" && !isDefeated) return false;
      return true;
    });
  }, [query, series, element, status, defeated]);

  return (
    <div>
      <HudHeader
        title="Target Database"
        subtitle="Search & filter Maverick threat records"
        action={<StatusBadge label={`${results.length} / ${allMavericks.length}`} tone="cyan" />}
      />

      <div className="p-3">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Mavericks, species, location…"
            aria-label="Search targets"
            className="w-full border border-[var(--border)] bg-[var(--surface-inset)] py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-active)] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            className="absolute right-2 top-1/2 -translate-y-1/2 border border-[var(--border)] p-1.5 text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--tactical-amber)]"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 grid gap-3 border border-[var(--border)] bg-[var(--surface)] p-3 sm:grid-cols-3">
            <Select label="Series" value={series} onChange={setSeries} options={SERIES_OPTIONS} />
            <Select
              label="Element"
              value={element}
              onChange={(v) => setElement(v as "all" | ElementType)}
              options={[{ value: "all", label: "All Elements" }, ...ELEMENT_OPTIONS]}
            />
            <div>
              <label className="tac-label mb-1 block text-[0.55rem] text-[var(--text-muted)]">Status</label>
              <div className="flex gap-1">
                {(["all", "active", "cleared"] as StatusFilter[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    aria-pressed={status === s}
                    className={cn(
                      "tac-label flex-1 border py-1.5 text-[0.55rem] capitalize transition-colors",
                      status === s
                        ? "border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_14%,transparent)] text-[var(--tactical-amber)]"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {results.map((m) => (
            <MaverickCard
              key={m.id}
              maverick={m}
              weaknessWeapon={allWeaponsById[m.weaknessWeaponId]}
              rewardWeapon={allWeaponsById[m.weaponRewardId]}
              defeated={defeated.includes(m.id)}
            />
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            No targets match the current query.
          </p>
        )}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="tac-label mb-1 block text-[0.55rem] text-[var(--text-muted)]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[var(--border)] bg-[var(--surface-inset)] px-2 py-1.5 text-[0.72rem] text-[var(--text-primary)] focus:border-[var(--border-active)] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
