import type { Blueprint } from "@/domain/types";

/**
 * Reploid blueprints. Positions are normalized 0..100 over the BlueprintViewer
 * viewbox so callouts render consistently across views/screens.
 * Illustrations are generated (SVG/CSS) — no extracted game art.
 */
export const x1Blueprints: Blueprint[] = [
  {
    id: "bp-x",
    slug: "x",
    name: "X",
    entityType: "hunter",
    modelNumber: "DLN-000X",
    role: "17th Elite Unit — Maverick Hunter",
    manufacturer: "Dr. Light (Light Labs)",
    series: "x1",
    description:
      "Prototype Reploid with a true ethical system and unlimited growth potential. Frame supports modular Light Armor upgrades across all four systems.",
    views: { front: "generated", side: "generated", rear: "generated" },
    modules: [
      { id: "x-head", name: "Head Unit", category: "systems", status: "upgradeable", description: "Advanced sensor array and targeting cortex. Helmet upgrade enables item scanning.", position: { x: 50, y: 14 } },
      { id: "x-core", name: "Core Frame", category: "frame", status: "standard", description: "Adaptive Reploid architecture — the seat of X's free will and weapon-copy system.", position: { x: 50, y: 40 } },
      { id: "x-arm", name: "X-Buster Interface", category: "armaments", status: "upgradeable", description: "Variable-output arm cannon. Arm upgrade adds a plasma charge shot.", position: { x: 72, y: 44 } },
      { id: "x-body", name: "Torso Armor", category: "armor", status: "upgradeable", description: "Body upgrade halves incoming damage via reactive plating.", position: { x: 50, y: 52 } },
      { id: "x-leg", name: "Mobility System", category: "frame", status: "upgradeable", description: "Leg upgrade grants dash and enhanced wall-jump control.", position: { x: 42, y: 80 } },
    ],
  },
  {
    id: "bp-zero",
    slug: "zero",
    name: "Zero",
    entityType: "hunter",
    modelNumber: "Unknown",
    role: "Commander — 17th Elite Unit",
    manufacturer: "Dr. Wily (origin classified)",
    series: "x1",
    description:
      "High-performance combat Reploid of unknown make. Superior reaction frame and integrated Z-Buster.",
    views: { front: "generated", side: "generated" },
    modules: [
      { id: "z-head", name: "Sensor Crest", category: "systems", status: "standard", description: "Long-range threat detection with hardened crest housing.", position: { x: 50, y: 14 } },
      { id: "z-core", name: "Combat Core", category: "frame", status: "experimental", description: "Overclocked reaction architecture enabling elite melee response.", position: { x: 50, y: 40 } },
      { id: "z-buster", name: "Z-Buster", category: "armaments", status: "standard", description: "Integrated arm cannon with rapid charge cycle.", position: { x: 72, y: 44 } },
      { id: "z-leg", name: "Assault Legs", category: "frame", status: "standard", description: "Reinforced high-mobility limbs for aggressive positioning.", position: { x: 42, y: 80 } },
    ],
  },
  {
    id: "bp-chill-penguin",
    slug: "chill-penguin",
    name: "Chill Penguin",
    entityType: "maverick",
    modelNumber: "TODO",
    role: "Arctic Base Commander",
    manufacturer: "Unknown",
    series: "x1",
    description:
      "Penguin-type Maverick built for cold-climate operations. Cryo systems allow terrain freezing and drone deployment.",
    views: { front: "generated", side: "generated" },
    modules: [
      { id: "cp-head", name: "Cryo Sensor", category: "systems", status: "standard", description: "Thermal-inverse targeting for low-visibility ice storms.", position: { x: 50, y: 16 } },
      { id: "cp-cryo", name: "Cryo Reactor", category: "systems", status: "standard", description: "Generates the freezing breath and ice-sculpture projectiles.", position: { x: 50, y: 42 } },
      { id: "cp-belly", name: "Slide Plating", category: "armor", status: "standard", description: "Low-friction underside enabling high-speed belly slides.", position: { x: 50, y: 62 } },
      { id: "cp-fan", name: "Blizzard Fans", category: "armaments", status: "standard", description: "Wall-mounted fans that drive X toward hazards.", position: { x: 74, y: 40 } },
    ],
  },
];

export const x1BlueprintsBySlug: Record<string, Blueprint> = Object.fromEntries(
  x1Blueprints.map((b) => [b.slug, b]),
);
