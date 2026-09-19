import type {
  Maverick,
  PlayerProgress,
  Stage,
  Weapon,
} from "@/domain/types";

export interface TacticalLogEntry {
  id: string;
  actor: string; // "X", "Zero", etc.
  action: string;
  detail: string;
  kind: "combat" | "weapon" | "recovery" | "intel";
}

/**
 * Derive the tactical log feed from live player progress.
 * Newest-relevant entries first. Purely a function of state — no side effects.
 */
export function generateLogs(
  progress: PlayerProgress,
  mavericksById: Record<string, Maverick>,
  weaponsById: Record<string, Weapon>,
  stages: Stage[],
): TacticalLogEntry[] {
  const logs: TacticalLogEntry[] = [];
  const collectibleById = new Map(
    stages.flatMap((s) => s.collectibles.map((c) => [c.id, c] as const)),
  );

  // Defeated Mavericks + their recovered weapon.
  for (const id of progress.defeatedMavericks) {
    const m = mavericksById[id];
    if (!m) continue;
    logs.push({
      id: `log-defeat-${id}`,
      actor: "X",
      action: `Defeated ${m.name}`,
      detail: `${m.location} secured. Threat neutralized.`,
      kind: "combat",
    });
    const reward = weaponsById[m.weaponRewardId];
    if (reward) {
      logs.push({
        id: `log-weapon-${reward.id}`,
        actor: "X",
        action: `Obtained ${reward.name}`,
        detail: `Weapon data copied from ${m.name}.`,
        kind: "weapon",
      });
    }
  }

  // Recovered collectibles.
  for (const itemId of progress.collectedItems) {
    const c = collectibleById.get(itemId);
    if (!c) continue;
    logs.push({
      id: `log-item-${itemId}`,
      actor: "X",
      action: `Recovered ${c.name}`,
      detail: c.type.replace("-", " ").toUpperCase(),
      kind: "recovery",
    });
  }

  if (logs.length === 0) {
    logs.push({
      id: "log-standby",
      actor: "Zero",
      action: "Scouted Maverick Signal",
      detail: "Awaiting first deployment. Select a target to begin the log.",
      kind: "intel",
    });
  }

  return logs.reverse();
}
