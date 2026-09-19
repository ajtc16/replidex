import type { PlayerProgress, Stage } from "@/domain/types";

export const emptyProgress: PlayerProgress = {
  defeatedMavericks: [],
  collectedItems: [],
  acquiredWeapons: [],
  armorUpgrades: [],
};

export interface CompletionSummary {
  bossesDefeated: number;
  bossesTotal: number;
  heartTanks: number;
  heartTanksTotal: number;
  subTanks: number;
  subTanksTotal: number;
  armorUpgrades: number;
  armorUpgradesTotal: number;
  /** Overall 0..100 across all tracked categories. */
  percent: number;
}

export function computeCompletion(
  progress: PlayerProgress,
  mavericksTotal: number,
  stages: Stage[],
): CompletionSummary {
  const allCollectibles = stages.flatMap((s) => s.collectibles);
  const byType = (t: string) => allCollectibles.filter((c) => c.type === t);

  const heartTanksTotal = byType("heart-tank").length;
  const subTanksTotal = byType("sub-tank").length;
  const armorTotal = byType("armor-upgrade").length;

  const collected = new Set(progress.collectedItems);
  const countCollected = (t: string) =>
    byType(t).filter((c) => collected.has(c.id)).length;

  const bossesDefeated = progress.defeatedMavericks.length;
  const heartTanks = countCollected("heart-tank");
  const subTanks = countCollected("sub-tank");
  const armorUpgrades = countCollected("armor-upgrade");

  const done = bossesDefeated + heartTanks + subTanks + armorUpgrades;
  const total =
    mavericksTotal + heartTanksTotal + subTanksTotal + armorTotal || 1;

  return {
    bossesDefeated,
    bossesTotal: mavericksTotal,
    heartTanks,
    heartTanksTotal,
    subTanks,
    subTanksTotal,
    armorUpgrades,
    armorUpgradesTotal: armorTotal,
    percent: Math.round((done / total) * 100),
  };
}
