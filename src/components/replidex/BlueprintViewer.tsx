"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import type { BlueprintModule } from "@/domain/types";
import { ReploidSchematic, type SchematicView } from "./ReploidSchematic";
import { BlueprintCallout } from "./BlueprintCallout";
import { cn } from "@/lib/cn";

interface BlueprintViewerProps {
  entityId: string;
  views: SchematicView[];
  modules: BlueprintModule[]; // already filtered to the active category
  selectedId?: string;
  onSelect: (id: string) => void;
  className?: string;
}

const VIEW_LABEL: Record<SchematicView, string> = {
  front: "Front",
  side: "Side",
  rear: "Rear",
};

export function BlueprintViewer({
  entityId,
  views,
  modules,
  selectedId,
  onSelect,
  className,
}: BlueprintViewerProps) {
  const [view, setView] = useState<SchematicView>(views[0] ?? "front");
  const [zoom, setZoom] = useState(1);

  const activeView = views.includes(view) ? view : views[0] ?? "front";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden border border-[var(--border-strong)]",
        className,
      )}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 10%, #0b1a2e, #071019 70%, #050b12)",
      }}
    >
      {/* top bar: view selector */}
      <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--tactical-cyan)_25%,transparent)] px-2 py-1.5">
        <div className="flex gap-1">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={activeView === v}
              className={cn(
                "tac-label border min-h-11 px-3 py-1 text-[0.65rem] transition-colors",
                activeView === v
                  ? "border-[var(--tactical-cyan)] bg-[color-mix(in_srgb,var(--tactical-cyan)_18%,transparent)] text-[var(--tactical-cyan)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--tactical-cyan)]",
              )}
            >
              {VIEW_LABEL[v]}
            </button>
          ))}
        </div>
        <span className="tac-label text-[0.5rem] text-[color-mix(in_srgb,var(--tactical-cyan)_70%,transparent)]">
          SCALE 1:1.44 · REPLIDEX-CAD
        </span>
      </div>

      {/* canvas */}
      <div className="relative flex-1">
        {/* blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--tactical-cyan) 14%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--tactical-cyan) 14%, transparent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        {/* corner coordinate ticks */}
        <CoordTicks />

        {/* figure + callouts share one transformed layer so hotspots track zoom */}
        <div className="relative mx-auto aspect-[2/3] h-full max-h-[62vh] py-4">
          <div
            className="relative h-full w-full transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            <ReploidSchematic view={activeView} entityId={entityId} />
            {modules.map((m) => (
              <BlueprintCallout
                key={m.id}
                module={entityId === "x" && activeView !== "front" && m.position ? { ...m, position: { ...m.position, x: activeView === "rear" ? 100 - m.position.x : m.id === "x-arm" ? 50 : m.position.x } } : m}
                active={selectedId === m.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>

        {/* zoom controls */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-1">
          <ZoomBtn label="Zoom in" onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.2).toFixed(1)))}>
            <ZoomIn className="h-3.5 w-3.5" />
          </ZoomBtn>
          <ZoomBtn label="Zoom out" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))}>
            <ZoomOut className="h-3.5 w-3.5" />
          </ZoomBtn>
          <ZoomBtn label="Reset zoom" onClick={() => setZoom(1)}>
            <Maximize className="h-3.5 w-3.5" />
          </ZoomBtn>
        </div>
      </div>
    </div>
  );
}

function ZoomBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center border border-[color-mix(in_srgb,var(--tactical-cyan)_40%,transparent)] bg-[color-mix(in_srgb,#071019_70%,transparent)] text-[var(--tactical-cyan)] backdrop-blur hover:bg-[color-mix(in_srgb,var(--tactical-cyan)_18%,transparent)]"
    >
      {children}
    </button>
  );
}

function CoordTicks() {
  return (
    <>
      <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[color-mix(in_srgb,var(--tactical-cyan)_50%,transparent)]" aria-hidden />
      <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[color-mix(in_srgb,var(--tactical-cyan)_50%,transparent)]" aria-hidden />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[color-mix(in_srgb,var(--tactical-cyan)_50%,transparent)]" aria-hidden />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[color-mix(in_srgb,var(--tactical-cyan)_50%,transparent)]" aria-hidden />
    </>
  );
}
