"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Factory, Tag } from "lucide-react";
import { HudHeader } from "@/components/replidex/HudHeader";
import { BlueprintViewer } from "@/components/replidex/BlueprintViewer";
import { BlueprintInspector } from "@/components/replidex/BlueprintInspector";
import { StatusBadge } from "@/components/replidex/StatusBadge";
import type { BlueprintModule } from "@/domain/types";
import type { SchematicView } from "@/components/replidex/ReploidSchematic";
import { x1BlueprintsBySlug } from "@/data/x1";
import { cn } from "@/lib/cn";

type Category = BlueprintModule["category"];

const TABS: { id: Category; label: string }[] = [
  { id: "frame", label: "Frame" },
  { id: "systems", label: "Systems" },
  { id: "armor", label: "Armor" },
  { id: "armaments", label: "Armaments" },
];

export default function BlueprintDetailPage() {
  const params = useParams<{ slug: string }>();
  const blueprint = x1BlueprintsBySlug[params.slug];

  const [tab, setTab] = useState<Category>("frame");
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const views = useMemo<SchematicView[]>(() => {
    if (!blueprint) return ["front"];
    return (["front", "side", "rear"] as SchematicView[]).filter((v) => blueprint.views[v]);
  }, [blueprint]);

  if (!blueprint) return notFound();

  const tabModules = blueprint.modules.filter((m) => m.category === tab);
  const availableCategories = new Set(blueprint.modules.map((m) => m.category));
  const selected = blueprint.modules.find((m) => m.id === selectedId);

  const handleSelect = (id: string) => setSelectedId((cur) => (cur === id ? undefined : id));
  const changeTab = (c: Category) => {
    setTab(c);
    setSelectedId(undefined);
  };

  return (
    <div className="pb-24 lg:pb-0">
      <HudHeader
        title={blueprint.name}
        subtitle={`${blueprint.modelNumber ?? "MODEL TODO"} · ${blueprint.role ?? blueprint.entityType}`}
        action={
          <Link
            href="/archive/blueprints"
            className="tac-label inline-flex items-center gap-1 border border-[var(--border)] px-2 py-1 text-[0.55rem] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--tactical-amber)]"
          >
            <ArrowLeft className="h-3 w-3" /> Archive
          </Link>
        }
      />

      <div className="p-3">
        {/* meta strip */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.62rem] text-[var(--text-muted)]">
          <StatusBadge label={blueprint.entityType} tone="cyan" />
          {blueprint.manufacturer && (
            <span className="inline-flex items-center gap-1">
              <Factory className="h-3 w-3" /> {blueprint.manufacturer}
            </span>
          )}
          {blueprint.series && (
            <span className="inline-flex items-center gap-1">
              <Tag className="h-3 w-3" /> {blueprint.series.toUpperCase()}
            </span>
          )}
        </div>

        {/* Category tabs */}
        <div role="tablist" aria-label="Blueprint systems" className="flex border border-[var(--border)] bg-[var(--surface-inset)] p-1">
          {TABS.map((t) => {
            const has = availableCategories.has(t.id);
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                disabled={!has}
                onClick={() => has && changeTab(t.id)}
                className={cn(
                  "tac-label flex-1 py-2 text-[0.58rem] transition-colors",
                  tab === t.id
                    ? "bg-[color-mix(in_srgb,var(--tactical-cyan)_16%,transparent)] text-[var(--tactical-cyan)]"
                    : has
                      ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      : "cursor-not-allowed text-[var(--text-muted)] opacity-40",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_320px]">
          {/* Viewer */}
          <div className="space-y-2">
            <BlueprintViewer
              views={views}
              modules={tabModules}
              selectedId={selectedId}
              onSelect={handleSelect}
              className="min-h-[52vh]"
            />
            <p className="text-center text-[0.58rem] text-[var(--text-muted)]">
              {tabModules.length > 0
                ? "Tap a pulsing node to inspect a component."
                : "No components catalogued in this system for this unit."}
            </p>
            <p className="text-[0.72rem] leading-relaxed text-[var(--text-secondary)]">
              {blueprint.description}
            </p>
          </div>

          {/* Inspector — desktop side panel */}
          <div className="hidden lg:block">
            <div className="sticky top-3">
              <BlueprintInspector module={selected} className="min-h-[240px]" />
              <ModuleList modules={tabModules} selectedId={selectedId} onSelect={handleSelect} />
            </div>
          </div>

          {/* Module list — mobile (below viewer) */}
          <div className="lg:hidden">
            <ModuleList modules={tabModules} selectedId={selectedId} onSelect={handleSelect} />
          </div>
        </div>
      </div>

      {/* Inspector — mobile bottom sheet */}
      {selected && (
        <div className="fixed inset-x-0 bottom-16 z-30 p-3 lg:hidden" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}>
          <BlueprintInspector module={selected} onClose={() => setSelectedId(undefined)} className="shadow-2xl" />
        </div>
      )}
    </div>
  );
}

function ModuleList({
  modules,
  selectedId,
  onSelect,
}: {
  modules: BlueprintModule[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  if (modules.length === 0) return null;
  return (
    <ul className="mt-2 space-y-1">
      {modules.map((m) => (
        <li key={m.id}>
          <button
            type="button"
            onClick={() => onSelect(m.id)}
            aria-pressed={selectedId === m.id}
            className={cn(
              "flex w-full items-center justify-between gap-2 border px-2.5 py-1.5 text-left transition-colors",
              selectedId === m.id
                ? "border-[var(--tactical-cyan)] bg-[color-mix(in_srgb,var(--tactical-cyan)_10%,transparent)]"
                : "border-[var(--border)] hover:border-[var(--border-strong)]",
            )}
          >
            <span className="text-[0.72rem] text-[var(--text-primary)]">{m.name}</span>
            <span className="tac-label text-[0.5rem] text-[var(--text-muted)]">{m.status ?? ""}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
