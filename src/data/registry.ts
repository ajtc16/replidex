import type { Game, Maverick, SeriesId, Stage, Weapon } from "@/domain/types";
import {
  x1Game,
  x1Mavericks,
  x1Weapons,
  x1Stages,
} from "./x1";
import type { BuiltGame } from "./build";
import {
  builtX2,
  builtX3,
  builtX4,
  builtX5,
  builtX6,
  builtX7,
  builtX8,
} from "./expansions";

const x1Bundle: BuiltGame = {
  game: x1Game,
  mavericks: x1Mavericks,
  weapons: x1Weapons,
  stages: x1Stages,
};

/** All games, in release order. X1 is hand-authored; X2–X8 are built from seeds. */
export const gameBundles: BuiltGame[] = [
  x1Bundle,
  builtX2,
  builtX3,
  builtX4,
  builtX5,
  builtX6,
  builtX7,
  builtX8,
];

export const games: Game[] = gameBundles.map((b) => b.game);
export const gamesById: Record<string, Game> = Object.fromEntries(
  games.map((g) => [g.id, g]),
);

export const allMavericks: Maverick[] = gameBundles.flatMap((b) => b.mavericks);
export const allWeapons: Weapon[] = gameBundles.flatMap((b) => b.weapons);
export const allStages: Stage[] = gameBundles.flatMap((b) => b.stages);

export const allMavericksById: Record<string, Maverick> = Object.fromEntries(
  allMavericks.map((m) => [m.id, m]),
);
export const allWeaponsById: Record<string, Weapon> = Object.fromEntries(
  allWeapons.map((w) => [w.id, w]),
);
export const allStagesByMaverickId: Record<string, Stage> = Object.fromEntries(
  allStages.map((s) => [s.maverickId, s]),
);

const bundlesById: Record<string, BuiltGame> = Object.fromEntries(
  gameBundles.map((b) => [b.game.id, b]),
);

export interface GameData {
  game: Game;
  mavericks: Maverick[];
  weapons: Weapon[];
  weaponsById: Record<string, Weapon>;
  stages: Stage[];
  stagesByMaverickId: Record<string, Stage>;
}

/** Everything a per-game screen (Command, Route) needs for one series. */
export function getGameData(seriesId: SeriesId): GameData {
  const bundle = bundlesById[seriesId] ?? x1Bundle;
  return {
    game: bundle.game,
    mavericks: bundle.mavericks,
    weapons: bundle.weapons,
    weaponsById: Object.fromEntries(bundle.weapons.map((w) => [w.id, w])),
    stages: bundle.stages,
    stagesByMaverickId: Object.fromEntries(
      bundle.stages.map((s) => [s.maverickId, s]),
    ),
  };
}

export const DEFAULT_SERIES: SeriesId = "x1";
