"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Snowflake,
  Flame,
  Zap,
  Droplet,
  Wind,
  Mountain,
  Sparkles,
  Hexagon,
  Satellite,
  X as XIcon,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { ElementType, Maverick } from "@/domain/types";
import { getGameData } from "@/data/registry";
import { useGameStore } from "@/stores/game.store";
import { useProgressStore } from "@/stores/progress.store";
import { cn } from "@/lib/cn";

/** Fixed node slots over the visible hemisphere (percent of the square box). */
const SLOTS = [
  { x: 50, y: 16 },
  { x: 33, y: 31 },
  { x: 24, y: 50 },
  { x: 41, y: 66 },
  { x: 52, y: 80 },
  { x: 67, y: 38 },
  { x: 72, y: 60 },
  { x: 52, y: 50 },
];

const ELEMENT_ICON: Record<ElementType, LucideIcon> = {
  ice: Snowflake,
  fire: Flame,
  electric: Zap,
  water: Droplet,
  air: Wind,
  ground: Mountain,
  genesis: Sparkles,
  none: Hexagon,
};

type Tier = "complete" | "critical" | "high" | "watch";
const TIER: Record<Tier, { color: string; label: string }> = {
  complete: { color: "var(--tactical-green)", label: "NEUTRALIZADO" },
  critical: { color: "var(--danger)", label: "CRÍTICO" },
  high: { color: "var(--tactical-amber)", label: "ALTO" },
  watch: { color: "var(--tactical-cyan)", label: "EN OBSERVACIÓN" },
};

function tierOf(m: Maverick, defeated: boolean): Tier {
  if (defeated) return "complete";
  const t = m.threatLevel ?? 3;
  if (t >= 4) return "critical";
  if (t === 3) return "high";
  return "watch";
}

const HEX = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

interface MapNode {
  maverick: Maverick;
  x: number;
  y: number;
  tier: Tier;
  defeated: boolean;
  Icon: LucideIcon;
}

export function TacticalMap() {
  const seriesId = useGameStore((s) => s.seriesId);
  const defeatedList = useProgressStore((s) => s.defeatedMavericks);
  const hydrated = useProgressStore((s) => s.hydrated);

  const { mavericks } = useMemo(() => getGameData(seriesId), [seriesId]);

  const nodes: MapNode[] = useMemo(
    () =>
      mavericks.slice(0, SLOTS.length).map((m, i) => {
        const defeated = defeatedList.includes(m.id);
        return {
          maverick: m,
          x: SLOTS[i].x,
          y: SLOTS[i].y,
          tier: tierOf(m, defeated),
          defeated,
          Icon: ELEMENT_ICON[m.element ?? "none"],
        };
      }),
    [mavericks, defeatedList],
  );

  // Default to the first still-active target so the panel shows content at rest.
  const firstActive = nodes.find((n) => !n.defeated) ?? nodes[0];
  const [selectedId, setSelectedId] = useState<string | undefined>(firstActive?.maverick.id);
  const [hoveredId, setHoveredId] = useState<string | undefined>();

  const activeId = hoveredId ?? selectedId;
  const active = nodes.find((n) => n.maverick.id === activeId);
  const selectNode = (id: string) => setSelectedId((cur) => (cur === id ? undefined : id));

  const cx = 100, cy = 100, r = 78;
  const meridianRx = [16, 38, 58, 74];
  const parallels = [-55, -30, 0, 30, 55].map((lat) => {
    const off = (lat / 90) * r * 0.92;
    return { cy: cy - off, rx: Math.sqrt(Math.max(0, r * r - off * off)), ry: Math.max(3, Math.abs(off) * 0.28 + 5) };
  });

  return (
    <div className="relative">
      <style>{`
        @keyframes tm-blink { 0%,100%{opacity:1;filter:brightness(1.3)} 50%{opacity:.5;filter:brightness(.7)} }
        @keyframes tm-ping { 0%{transform:scale(.4);opacity:.7} 80%{opacity:.05} 100%{transform:scale(2.5);opacity:0} }
        @keyframes tm-spin { to { transform: rotate(360deg) } }
        .tm-blink{animation:tm-blink 1.5s ease-in-out infinite}
        .tm-ping{animation:tm-ping 2.6s cubic-bezier(0,.2,.4,1) infinite}
        .tm-sweep{animation:tm-spin 7s linear infinite}
        .tm-ring{animation:tm-spin 44s linear infinite}
        @media (prefers-reduced-motion: reduce){
          .tm-blink,.tm-ping,.tm-sweep,.tm-ring{animation:none!important}
          .tm-ping{opacity:.22!important}
        }
      `}</style>

      <div className="relative mx-auto w-full" style={{ maxWidth: 340, aspectRatio: "1 / 1" }}>
        {/* globe */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="tm-sphere" cx="40%" cy="34%" r="72%">
              <stop offset="0%" stopColor="#0e2b33" />
              <stop offset="55%" stopColor="#0a1820" />
              <stop offset="100%" stopColor="#050b10" />
            </radialGradient>
            <radialGradient id="tm-atmos" cx="50%" cy="50%" r="50%">
              <stop offset="72%" stopColor="rgba(63,208,224,0)" />
              <stop offset="90%" stopColor="rgba(63,208,224,0.30)" />
              <stop offset="100%" stopColor="rgba(63,208,224,0)" />
            </radialGradient>
            <clipPath id="tm-clip"><circle cx={cx} cy={cy} r={r} /></clipPath>
          </defs>
          <circle cx={cx} cy={cy} r={r + 10} fill="url(#tm-atmos)" />
          <circle cx={cx} cy={cy} r={r} fill="url(#tm-sphere)" stroke="rgba(63,208,224,0.5)" strokeWidth="1" />
          <g clipPath="url(#tm-clip)">
            {meridianRx.map((rx, i) => (
              <ellipse key={"m" + i} cx={cx} cy={cy} rx={rx} ry={r} fill="none" stroke="rgba(240,167,66,0.28)" strokeWidth="0.6" />
            ))}
            <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(240,167,66,0.28)" strokeWidth="0.6" />
            {parallels.map((p, i) => (
              <ellipse key={"p" + i} cx={cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="none" stroke="rgba(240,167,66,0.24)" strokeWidth="0.6" />
            ))}
            <ellipse cx="78" cy="70" rx="34" ry="24" fill="rgba(63,208,224,0.06)" />
          </g>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(63,208,224,0.45)" strokeWidth="1" />
        </svg>

        {/* rotating dashed ring */}
        <svg viewBox="0 0 200 200" className="tm-ring pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(63,208,224,0.22)" strokeWidth="0.5" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(240,167,66,0.22)" strokeWidth="0.5" strokeDasharray="28 120" />
        </svg>

        {/* radar sweep */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 overflow-hidden rounded-full" aria-hidden
             style={{ width: "78%", height: "78%", transform: "translate(-50%,-50%)" }}>
          <div className="tm-sweep h-full w-full" style={{ background: "conic-gradient(from 0deg, transparent 0deg 315deg, rgba(63,208,224,0.14) 352deg, rgba(63,208,224,0.32) 360deg)", mixBlendMode: "screen" }} />
        </div>

        {/* nodes */}
        {hydrated &&
          nodes.map((n) => {
            const t = TIER[n.tier];
            const isActive = activeId === n.maverick.id;
            const size = isActive ? 34 : 27;
            const Icon = n.Icon;
            return (
              <div key={n.maverick.id} className="absolute" style={{ left: n.x + "%", top: n.y + "%", transform: "translate(-50%,-50%)", zIndex: isActive ? 30 : 20 }}>
                {!n.defeated &&
                  [0, 0.9, 1.8].map((d, i) => (
                    <span key={i} className="tm-ping absolute left-1/2 top-1/2 rounded-full"
                      style={{ width: 36, height: 36, marginLeft: -18, marginTop: -18, border: `1.5px solid ${t.color}`, animationDelay: d + "s" }} aria-hidden />
                  ))}
                <button
                  type="button"
                  className="relative grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tactical-cyan)]"
                  style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer", borderRadius: 6 }}
                  onMouseEnter={() => setHoveredId(n.maverick.id)}
                  onMouseLeave={() => setHoveredId(undefined)}
                  onFocus={() => setHoveredId(n.maverick.id)}
                  onBlur={() => setHoveredId(undefined)}
                  onClick={() => selectNode(n.maverick.id)}
                  aria-pressed={selectedId === n.maverick.id}
                  aria-label={`${n.maverick.name}, ${n.maverick.location}, ${t.label}`}
                >
                  <span className={cn(!n.defeated && "tm-blink", "grid place-items-center transition-all duration-200")}
                    style={{ width: size, height: size, clipPath: HEX, background: t.color, boxShadow: `0 0 ${isActive ? 16 : 8}px ${t.color}` }}>
                    <span className="grid place-items-center" style={{ width: size - 3, height: size - 3, clipPath: HEX, background: "#0a1016" }}>
                      <Icon size={isActive ? 14 : 11} style={{ color: t.color }} aria-hidden />
                    </span>
                  </span>
                </button>
              </div>
            );
          })}

        {/* crosshair reticle */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2" style={{ background: "var(--tactical-amber)" }} />
          <span className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2" style={{ background: "var(--tactical-amber)" }} />
          <span className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2" style={{ background: "var(--tactical-amber)" }} />
          <span className="absolute right-0 top-1/2 h-px w-2.5 -translate-y-1/2" style={{ background: "var(--tactical-amber)" }} />
        </div>
      </div>

      {/* INTEL SCAN readout */}
      {active && (
        <div className="mt-2 border bg-[var(--surface-inset)] p-2.5" style={{ borderColor: TIER[active.tier].color }}>
          <div className="flex items-center justify-between">
            <span className="tac-label inline-flex items-center gap-1.5 text-[0.55rem]" style={{ color: TIER[active.tier].color }}>
              <Satellite className="h-3 w-3" /> Intel Scan
            </span>
            {selectedId && (
              <button type="button" onClick={() => setSelectedId(undefined)} aria-label="Cerrar escaneo"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <XIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold uppercase text-[var(--text-primary)]">{active.maverick.name}</p>
              <p className="truncate text-[0.6rem] text-[var(--text-muted)]">{active.maverick.location}</p>
            </div>
            <span className="tac-label shrink-0 border px-1.5 py-0.5 text-[0.5rem]"
              style={{ color: TIER[active.tier].color, borderColor: TIER[active.tier].color, background: `color-mix(in srgb, ${TIER[active.tier].color} 12%, transparent)` }}>
              {TIER[active.tier].label}
            </span>
          </div>
          <Link href={`/targets/${active.maverick.slug}`}
            className="tac-label mt-2 inline-flex items-center gap-1 text-[0.55rem] text-[var(--tactical-amber)] hover:underline">
            Abrir dossier <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
