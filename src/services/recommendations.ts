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
  // Canonical opener = first boss in the (weakness-ordered) list for this game.
  const openerId = mavericks[0]?.id;
  const coldOpen = progress.defeatedMavericks.length === 0 && owned.size === 0;

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
      } else if (coldOpen && m.id === openerId) {
        // No weapons yet — nudge toward the canonical opener for this game.
        score += 20;
        reason = `No weapons acquired. Recommended opener — drops ${
          weaponsById[m.weaponRewardId]?.name ?? "the first chain weapon"
        } to start the exploit chain.`;
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
  // The mavericks list is already in canonical weakness-chain order for its game.
  const weaknessOrder = mavericks.map((m) => m.id);

  // Beginner route front-loads the lowest-threat targets (fought with the
  // buster) rather than juggling weapons; ties break toward the weakness loop.
  const loopIndex = (id: string) => weaknessOrder.indexOf(id);
  const beginnerOrder = [...weaknessOrder].sort((a, b) => {
    const ta = mavericks.find((m) => m.id === a)?.threatLevel ?? 3;
    const tb = mavericks.find((m) => m.id === b)?.threatLevel ?? 3;
    return ta - tb || loopIndex(a) - loopIndex(b);
  });

  const order = mode === "weakness" ? weaknessOrder : beginnerOrder;

  const owned = ownedWeaponIds(progress, mavericks);
  let frontAssigned = false; // the first undefeated node is the current "front"

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
      } else if (mode === "beginner") {
        // Beginner mode leans on the buster: nothing is gated behind weapons.
        status = "available";
      } else if (haveWeakness || !frontAssigned) {
        // Weakness mode: exploitable now, or this is the current front.
        status = "available";
        frontAssigned = true;
      } else {
        status = "locked";
      }

      let reason: string;
      if (defeated) {
        reason = `Neutralized.${weaponReward ? ` ${weaponReward.name} acquired.` : ""}`;
      } else if (haveWeakness && weaknessWeapon) {
        reason = `You possess ${weaknessWeapon.name} — exploit the weakness for a fast clear.`;
      } else if (index === 0) {
        reason =
          mode === "beginner"
            ? "Lowest-threat opener. Clear it with the standard X-Buster."
            : "Recommended opener. Drops the weapon that starts the exploit chain.";
      } else if (mode === "beginner") {
        reason = "Manageable buster fight — no weapon dependency required.";
      } else if (weaknessWeapon) {
        reason = `Locked — defeat the previous target to obtain ${weaknessWeapon.name}.`;
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
