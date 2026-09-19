import type {
  ElementType,
  Game,
  Maverick,
  SeriesId,
  Stage,
  Weapon,
} from "@/domain/types";

/**
 * Data builder for X2–X8. Bosses are declared in canonical weakness-chain
 * order: each boss[i] is weak to the weapon dropped by boss[i-1], and boss[0]
 * closes the loop against boss[last]. All id/weakness/reward relationships are
 * derived from that order, so the verified chains cannot drift out of sync.
 *
 * Mechanics (names, elements, weakness/reward links) are accurate. Deeper flavor
 * (detailed attack patterns, stage collectible placement) is intentionally light
 * and flagged TODO rather than invented.
 */
export interface BossSeed {
  name: string;
  weapon: string; // special weapon this boss drops
  element?: ElementType;
  location: string;
  portrait: string; // emoji glyph placeholder
  species?: string;
  threat?: number;
  description?: string;
}

export interface GameSeed {
  id: SeriesId;
  title: string;
  subtitle: string;
  year: number;
  bosses: BossSeed[]; // in canonical weakness order
}

export interface BuiltGame {
  game: Game;
  mavericks: Maverick[];
  weapons: Weapon[];
  stages: Stage[];
}

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function buildGame(seed: GameSeed): BuiltGame {
  const { id, bosses } = seed;
  const n = bosses.length;
  const weaponId = (w: string) => `${id}-${kebab(w)}`;

  const mavericks: Maverick[] = bosses.map((b, i) => {
    const prev = bosses[(i - 1 + n) % n]; // drops the weapon this boss is weak to
    const mid = kebab(b.name);
    return {
      id: mid,
      slug: mid,
      name: b.name,
      series: id,
      species: b.species,
      element: b.element ?? "none",
      location: b.location,
      description:
        b.description ??
        `${b.name} has gone Maverick and seized control of the ${b.location}. Wields the ${b.weapon} against all who approach.`,
      portrait: b.portrait,
      weaknessWeaponId: weaponId(prev.weapon),
      weaponRewardId: weaponId(b.weapon),
      threatLevel: b.threat ?? 3,
      abilities: [
        {
          id: `${mid}-armament`,
          name: b.weapon,
          description: `Deploys the ${b.weapon} — copied to X's arsenal once this Maverick is neutralized.`,
        },
      ],
      attackPatterns: [
        {
          id: `${mid}-signature`,
          name: "Signature Assault",
          description: `Controls the ${b.location} with aggressive, arena-wide pressure.`,
          counter: `${prev.weapon} staggers this target — exploit the weakness on sight.`,
        },
      ],
      fieldNotes: [
        `Confirmed weakness: ${prev.weapon}, recovered from ${prev.name}.`,
        "TODO: detailed attack patterns and stage collectibles pending field verification.",
      ],
    };
  });

  const weapons: Weapon[] = bosses.map((b, i) => {
    const next = bosses[(i + 1) % n]; // the boss weak to this weapon
    return {
      id: weaponId(b.weapon),
      name: b.weapon,
      owner: "X",
      obtainedFrom: kebab(b.name),
      element: b.element ?? "none",
      effectiveAgainst: [kebab(next.name)],
      description: `${b.weapon}, recovered from ${b.name}. Highly effective against ${next.name}.`,
    };
  });

  const stages: Stage[] = bosses.map((b) => ({
    id: `stage-${kebab(b.name)}`,
    maverickId: kebab(b.name),
    name: b.location,
    location: b.location,
    collectibles: [], // TODO: catalogue heart tanks / sub tanks / upgrades per stage
  }));

  const game: Game = {
    id,
    title: seed.title,
    subtitle: seed.subtitle,
    releaseYear: seed.year,
    mavericks: mavericks.map((m) => m.id),
  };

  return { game, mavericks, weapons, stages };
}
