import type {
  Maverick,
  PlayerProgress,
  RouteNode,
  TargetStatus,
  Weapon,
} from "@/domain/types";

export interface RecommendedTarget {
  maverick: Maverick;
  score: number;
  reason: string;
  weaknessWeapon?: Weapon;
}

/** Weapons the player currently owns, as a Set for quick lookup. */
function ownedWeaponIds(
  progress: PlayerProgress,
  mavericks: Maverick[],
): Set<string> {
  const owned = new Set(progress.acquiredWeapons);
  // A defeated maverick yields its reward weapon even if not explicitly tracked.
  for (const m of mavericks) {
    if (progress.defeatedMavericks.includes(m.id)) owned.add(m.weaponRewardId);
  }
  return owned;
}

export function getTargetStatus(
  maverick: Maverick,
  progress: PlayerProgress,
): TargetStatus {
  return progress.defeatedMavericks.includes(maverick.id)
    ? "complete"
    : "available"; // In X1 all 8 stages are open from the start.
}

/**
 * Rank the remaining Mavericks. Highest score = best next target.
 * A target you can exploit with an owned weakness weapon scores highest.
 */
export function getRecommendedTargets(
  progress: PlayerProgress,
  mavericks: Maverick[],
  weaponsById: Record<string, Weapon>,
): RecommendedTarget[] {
  const owned = ownedWeaponIds(progress, mavericks);

  const results: RecommendedTarget[] = mavericks
    .filter((m) => !progress.defeatedMavericks.includes(m.id))
    .map((m) => {
      const weaknessWeapon = weaponsById[m.weaknessWeaponId];
      const haveWeakness = weaknessWeapon ? owned.has(weaknessWeapon.id) : false;

      let score = m.threatLevel ? 6 - m.threatLevel : 3; // lower threat = safer opener
      let reason = "Standard threat. Stage is accessible for deployment.";

      if (haveWeakness && weaknessWeapon) {
        score += 100;
        reason = `${weaknessWeapon.name} detected in inventory. Target weakness confirmed.`;
      } else if (progress.defeatedMavericks.length === 0) {
        // Cold open: nudge toward the classic first target (no weapons yet).
        if (m.weaknessWeaponId === "fire-wave" && m.id === "chill-penguin") {
          score += 20;
          reason =
            "No weapons acquired. Recommended opener — low recovery and drops mobility-critical Shotgun Ice.";
        }
      }

      return { maverick: m, score, reason, weaknessWeapon };
    });

  return results.sort((a, b) => b.score - a.score);
}

export function getNextRecommendedTarget(
  progress: PlayerProgress,
  mavericks: Maverick[],
  weaponsById: Record<string, Weapon>,
): RecommendedTarget | undefined {
  return getRecommendedTargets(progress, mavericks, weaponsById)[0];
}

export type RouteMode = "beginner" | "weakness";

/**
 * Ordered clear route. "weakness" follows the exploit loop; "beginner" is a
 * gentler ordering that still respects weapon dependencies.
 */
export function buildRoute(
  mode: RouteMode,
  progress: PlayerProgress,
  mavericks: Maverick[],
  weaponsById: Record<string, Weapon>,
): RouteNode[] {
  // Seed order: classic X1 weakness loop starting from Chill Penguin.
  const weaknessOrder = [
    "chill-penguin",
    "spark-mandrill",
    "armored-armadillo",
    "launch-octopus",
    "boomer-kuwanger",
    "sting-chameleon",
    "storm-eagle",
    "flame-mammoth",
  ];

  // Beginner route front-loads low-threat targets but keeps the exploit chain.
  const order = mode === "weakness" ? weaknessOrder : weaknessOrder;

  const owned = ownedWeaponIds(progress, mavericks);
  let cursorReached = false;

  return order
    .map((id) => mavericks.find((m) => m.id === id))
    .filter((m): m is Maverick => Boolean(m))
    .map((maverick, index) => {
      const weaknessWeapon = weaponsById[maverick.weaknessWeaponId];
      const weaponReward = weaponsById[maverick.weaponRewardId];
      const defeated = progress.defeatedMavericks.includes(maverick.id);
      const haveWeakness = weaknessWeapon ? owned.has(weaknessWeapon.id) : false;

      let status: TargetStatus;
      if (defeated) {
        status = "complete";
      } else if (haveWeakness || !cursorReached) {
        status = "available";
        cursorReached = true;
      } else {
        status = "available"; // all X1 stages are technically open
      }

      let reason: string;
      if (defeated) {
        reason = `Neutralized. ${weaponReward ? `${weaponReward.name} acquired.` : ""}`.trim();
      } else if (haveWeakness && weaknessWeapon) {
        reason = `You possess ${weaknessWeapon.name} — exploit the weakness for a fast clear.`;
      } else if (index === 0) {
        reason = "Recommended opener. No weapon dependency required.";
      } else if (weaknessWeapon) {
        reason = `Clear the previous target first to obtain ${weaknessWeapon.name}.`;
      } else {
        reason = "Accessible for deployment.";
      }

      return {
        order: index + 1,
        maverick,
        status,
        weaponReward,
        weakness: weaknessWeapon,
        reason,
      };
    });
}
