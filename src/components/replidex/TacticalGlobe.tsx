import { cn } from "@/lib/cn";

interface Marker {
  cx: number;
  cy: number;
  tone: string;
  label?: string;
}

interface TacticalGlobeProps {
  markers?: Marker[];
  className?: string;
}

/**
 * Pure SVG/CSS tactical globe — no external map APIs.
 * A wireframe sphere with latitude/longitude lines, a rotating scan ring,
 * and Maverick activity markers.
 */
export function TacticalGlobe({ markers = [], className }: TacticalGlobeProps) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[280px]", className)}>
      {/* rotating outer scan ring */}
      <svg
        viewBox="0 0 200 200"
        className="slow-spin absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle cx="100" cy="100" r="96" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="color-mix(in srgb, var(--tactical-cyan) 30%, transparent)" strokeWidth="0.5" strokeDasharray="30 120" />
      </svg>

      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" role="img" aria-label="Tactical deployment globe">
        <defs>
          <radialGradient id="globe-fill" cx="42%" cy="35%" r="75%">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--tactical-cyan) 22%, var(--surface-inset))" />
            <stop offset="70%" stopColor="var(--surface-inset)" />
            <stop offset="100%" stopColor="#04070a" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="74" fill="url(#globe-fill)" stroke="color-mix(in srgb, var(--tactical-cyan) 45%, transparent)" strokeWidth="1" />

        {/* latitude lines */}
        {[-48, -24, 0, 24, 48].map((off) => (
          <ellipse
            key={`lat${off}`}
            cx="100"
            cy={100 + off}
            rx={Math.sqrt(Math.max(0, 74 * 74 - off * off))}
            ry={Math.max(3, Math.abs(off) * 0.32 + 4)}
            fill="none"
            stroke="color-mix(in srgb, var(--tactical-cyan) 20%, transparent)"
            strokeWidth="0.5"
          />
        ))}
        {/* longitude lines */}
        {[18, 37, 55].map((rx, i) => (
          <ellipse
            key={`lon${i}`}
            cx="100"
            cy="100"
            rx={rx}
            ry="74"
            fill="none"
            stroke="color-mix(in srgb, var(--tactical-cyan) 16%, transparent)"
            strokeWidth="0.5"
          />
        ))}
        <line x1="100" y1="26" x2="100" y2="174" stroke="color-mix(in srgb, var(--tactical-cyan) 16%, transparent)" strokeWidth="0.5" />

        {/* activity markers */}
        {markers.map((m, i) => (
          <g key={i}>
            <circle cx={m.cx} cy={m.cy} r="6" fill="none" stroke={m.tone} strokeWidth="0.75" className="status-pulse" style={{ color: m.tone }} />
            <circle cx={m.cx} cy={m.cy} r="2" fill={m.tone} />
          </g>
        ))}
      </svg>

      {/* crosshair reticle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-[var(--tactical-amber)]" />
        <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-[var(--tactical-amber)]" />
        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[var(--tactical-amber)]" />
        <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[var(--tactical-amber)]" />
      </div>
    </div>
  );
}
