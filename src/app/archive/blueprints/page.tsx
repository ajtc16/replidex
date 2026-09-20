"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Ruler } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import type { Blueprint } from "@/domain/types";
import { x1Blueprints } from "@/data/x1";
import { ReploidSchematic } from "@/components/replidex/ReploidSchematic";
import { TargetPortrait } from "@/components/replidex/TargetPortrait";
import { cn } from "@/lib/cn";

type EntityFilter = "all" | Blueprint["entityType"];

const FILTERS: { id: EntityFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hunter", label: "Hunters" },
  { id: "maverick", label: "Mavericks" },
  { id: "reploid", label: "Reploids" },
  { id: "armor", label: "Armor" },
  { id: "weapon", label: "Weapons" },
];

export default function BlueprintArchivePage() {
  const [filter, setFilter] = useState<EntityFilter>("all");

  const results = useMemo(
    () => (filter === "all" ? x1Blueprints : x1Blueprints.filter((b) => b.entityType === filter)),
    [filter],
  );

  return (
    <div>
      <HudHeader
        title="Reploid Blueprints"
        subtitle="Technical data & schematics archive"
        action={
          <Link
            href="/archive"
            className="tac-label inline-flex items-center gap-1 border border-[var(--border)] px-2 py-1 text-[0.55rem] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--tactical-amber)]"
          >
            <ArrowLeft className="h-3 w-3" /> Archive
          </Link>
        }
      />

      <div className="p-3">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="tac-label mr-1 text-[0.55rem] text-[var(--text-muted)]">Entity Type</span>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "tac-label border px-2 py-1 text-[0.55rem] transition-colors",
                filter === f.id
                  ? "border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_14%,transparent)] text-[var(--tactical-amber)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
              )}
            >
              {f.label}
            </button>
          ))}
          <StatusBadge label="Series X1" tone="cyan" className="ml-auto" />
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((b) => (
            <Link
              key={b.id}
              href={`/archive/blueprints/${b.slug}`}
              className="group relative flex flex-col border border-[var(--border)] transition-colors hover:border-[var(--tactical-cyan)]"
              style={{
                background: "radial-gradient(120% 90% at 50% 0%, #0b1a2e, var(--surface) 75%)",
              }}
            >
              {/* mini blueprint grid preview */}
              <div
                className="relative h-28 border-b border-[var(--border)]"
                style={{
                  backgroundImage:
                    "linear-gradient(color-mix(in srgb, var(--tactical-cyan) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--tactical-cyan) 12%, transparent) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                <div className="absolute inset-0 flex justify-center">
                  {b.slug === "x" ? <ReploidSchematic view="front" entityId="x" /> : <TargetPortrait glyph={b.slug} size="lg" className="h-full w-28" />}
                </div>
                <span className="tac-label absolute left-2 top-2 text-[0.5rem] text-[var(--tactical-cyan)]">
                  {b.entityType}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-bold uppercase tracking-wide text-[var(--text-primary)]">
                    {b.name}
                  </p>
                  <p className="flex items-center gap-1 truncate text-[0.58rem] text-[var(--text-muted)]">
                    <Ruler className="h-2.5 w-2.5" /> {b.modelNumber ?? "TODO"} · {b.modules.length} modules
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--tactical-cyan)]" />
              </div>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            No blueprints archived for this entity type yet.
          </p>
        )}
      </div>
    </div>
  );
}
