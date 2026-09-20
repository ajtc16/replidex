import { XSchematic } from "./XSchematic";
export type SchematicView = "front" | "side" | "rear";

/**
 * Stylized, generated reploid schematic in blueprint line-art.
 * No copyrighted sprites — pure SVG geometry. viewBox is 0 0 200 300, with the
 * figure laid out so BlueprintModule positions (normalized %) line up with the
 * head (~14%), core (~40%), arms (~44%) and legs (~80%).
 */
export function ReploidSchematic({ view, entityId }: { view: SchematicView; entityId?: string }) {
  if (entityId === "x") return <XSchematic view={view} />;
  const stroke = "var(--tactical-cyan)";
  const faint = "color-mix(in srgb, var(--tactical-cyan) 35%, transparent)";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.4,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };
  const thin = { ...common, strokeWidth: 0.7, stroke: faint };

  return (
    <svg viewBox="0 0 200 300" className="h-full w-full" role="img" aria-label={`${view} schematic`}>
      {/* center axis */}
      <line x1="100" y1="10" x2="100" y2="290" {...thin} strokeDasharray="4 5" />

      {view === "front" && <FrontView common={common} thin={thin} />}
      {view === "side" && <SideView common={common} thin={thin} />}
      {view === "rear" && <RearView common={common} thin={thin} />}
    </svg>
  );
}

type P = { common: object; thin: object };

function FrontView({ common, thin }: P) {
  return (
    <g>
      {/* head */}
      <path d="M85 28 Q85 16 100 16 Q115 16 115 28 L115 48 Q115 56 100 56 Q85 56 85 48 Z" {...common} />
      <line x1="90" y1="34" x2="110" y2="34" {...thin} />
      <circle cx="94" cy="40" r="2" {...common} />
      <circle cx="106" cy="40" r="2" {...common} />
      {/* neck */}
      <path d="M94 56 L94 62 L106 62 L106 56" {...common} />
      {/* torso core */}
      <path d="M78 64 L122 64 L128 92 Q128 118 118 140 L82 140 Q72 118 72 92 Z" {...common} />
      <circle cx="100" cy="102" r="11" {...common} />
      <circle cx="100" cy="102" r="4" {...thin} />
      <line x1="100" y1="64" x2="100" y2="140" {...thin} />
      <line x1="80" y1="118" x2="120" y2="118" {...thin} />
      {/* shoulders + arms */}
      <path d="M78 66 Q66 68 62 82 L62 118 Q62 128 70 132 L78 128 L74 84 Z" {...common} />
      <path d="M122 66 Q134 68 138 82 L138 118 Q138 128 130 132 L122 128 L126 84 Z" {...common} />
      {/* forearms / busters */}
      <path d="M60 120 L54 150 Q54 158 62 158 L70 156 L70 128 Z" {...common} />
      <path d="M140 120 L146 150 Q146 158 138 158 L130 156 L130 128 Z" {...common} />
      {/* pelvis */}
      <path d="M84 142 L116 142 L118 158 L82 158 Z" {...common} />
      {/* legs */}
      <path d="M84 160 L82 210 L90 250 L98 250 L98 160 Z" {...common} />
      <path d="M116 160 L118 210 L110 250 L102 250 L102 160 Z" {...common} />
      <line x1="86" y1="196" x2="97" y2="196" {...thin} />
      <line x1="103" y1="196" x2="114" y2="196" {...thin} />
      {/* boots */}
      <path d="M86 250 L86 266 Q86 272 94 272 L102 272 L100 250 Z" {...common} />
      <path d="M114 250 L114 266 Q114 272 106 272 L98 272 L100 250 Z" {...common} />
    </g>
  );
}

function SideView({ common, thin }: P) {
  return (
    <g>
      {/* head profile */}
      <path d="M92 30 Q88 16 104 16 Q120 18 118 34 L118 48 Q116 56 104 56 L94 54 Z" {...common} />
      <circle cx="108" cy="38" r="2.2" {...common} />
      {/* crest */}
      <path d="M104 16 L96 8 L112 14" {...thin} />
      {/* torso */}
      <path d="M94 56 L94 62 Q84 70 84 96 Q84 124 96 142 L118 140 Q122 116 120 92 Q118 70 110 62 L108 56 Z" {...common} />
      <circle cx="104" cy="100" r="7" {...common} />
      {/* backpack / thruster */}
      <path d="M84 74 L74 78 L74 108 L84 112" {...common} />
      <line x1="76" y1="86" x2="82" y2="86" {...thin} />
      <line x1="76" y1="98" x2="82" y2="98" {...thin} />
      {/* arm */}
      <path d="M108 70 Q118 74 118 96 L114 150 Q114 158 122 158 L128 154 L124 96 Q124 76 114 70 Z" {...common} />
      {/* pelvis + leg */}
      <path d="M92 142 L120 142 L120 160 L92 160 Z" {...common} />
      <path d="M96 160 L92 212 L88 250 L112 250 L110 210 L114 160 Z" {...common} />
      <line x1="96" y1="198" x2="110" y2="198" {...thin} />
      {/* boot */}
      <path d="M88 250 L82 268 Q82 272 90 272 L120 272 L118 262 L112 250 Z" {...common} />
    </g>
  );
}

function RearView({ common, thin }: P) {
  return (
    <g>
      {/* head */}
      <path d="M85 28 Q85 16 100 16 Q115 16 115 28 L115 48 Q115 56 100 56 Q85 56 85 48 Z" {...common} />
      <line x1="100" y1="18" x2="100" y2="54" {...thin} />
      {/* neck */}
      <path d="M94 56 L94 62 L106 62 L106 56" {...common} />
      {/* back torso + thruster pack */}
      <path d="M78 64 L122 64 L128 92 Q128 118 118 140 L82 140 Q72 118 72 92 Z" {...common} />
      <rect x="86" y="72" width="28" height="46" rx="3" {...common} />
      <line x1="100" y1="72" x2="100" y2="118" {...thin} />
      <circle cx="93" cy="126" r="4" {...common} />
      <circle cx="107" cy="126" r="4" {...common} />
      {/* arms */}
      <path d="M78 66 Q66 68 62 82 L62 118 Q62 128 70 132 L78 128 L74 84 Z" {...common} />
      <path d="M122 66 Q134 68 138 82 L138 118 Q138 128 130 132 L122 128 L126 84 Z" {...common} />
      <path d="M60 120 L54 150 Q54 158 62 158 L70 156 L70 128 Z" {...common} />
      <path d="M140 120 L146 150 Q146 158 138 158 L130 156 L130 128 Z" {...common} />
      {/* pelvis + legs */}
      <path d="M84 142 L116 142 L118 158 L82 158 Z" {...common} />
      <path d="M84 160 L82 210 L90 250 L98 250 L98 160 Z" {...common} />
      <path d="M116 160 L118 210 L110 250 L102 250 L102 160 Z" {...common} />
      <path d="M86 250 L86 266 Q86 272 94 272 L102 272 L100 250 Z" {...common} />
      <path d="M114 250 L114 266 Q114 272 106 272 L98 272 L100 250 Z" {...common} />
    </g>
  );
}
