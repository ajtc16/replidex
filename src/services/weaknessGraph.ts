import type { Maverick, Weapon, WeaknessEdge } from "@/domain/types";

/**
 * Build the weakness graph programmatically:
 *   Maverick A drops Weapon A; Weapon A is the weakness of Maverick B
 *   => edge A --(Weapon A)--> B
 * No arrows are hardcoded in the UI; components render from these edges.
 */
export function buildWeaknessGraph(
  mavericks: Maverick[],
  weaponsById: Record<string, Weapon>,
): WeaknessEdge[] {
  const edges: WeaknessEdge[] = [];
  for (const target of mavericks) {
    const weakness = weaponsById[target.weaknessWeaponId];
    if (!weakness) continue;
    const source = mavericks.find((m) => m.id === weakness.obtainedFrom);
    if (!source) continue;
    edges.push({
      fromMaverickId: source.id,
      weaponId: weakness.id,
      toMaverickId: target.id,
    });
  }
  return edges;
}

/**
 * The chain centered on a given maverick:
 *   [who drops OUR weakness weapon] -> weapon -> [this maverick] -> our weapon -> [who is weak to it]
 */
export interface WeaknessChainView {
  incoming?: { maverick: Maverick; weapon: Weapon };
  center: Maverick;
  outgoing?: { weapon: Weapon; maverick: Maverick };
}

export function getWeaknessChainFor(
  maverick: Maverick,
  mavericks: Maverick[],
  weaponsById: Record<string, Weapon>,
): WeaknessChainView {
  const view: WeaknessChainView = { center: maverick };

  const weaknessWeapon = weaponsById[maverick.weaknessWeaponId];
  if (weaknessWeapon) {
    const source = mavericks.find((m) => m.id === weaknessWeapon.obtainedFrom);
    if (source) view.incoming = { maverick: source, weapon: weaknessWeapon };
  }

  const rewardWeapon = weaponsById[maverick.weaponRewardId];
  if (rewardWeapon) {
    const victim = mavericks.find((m) =>
      rewardWeapon.effectiveAgainst.includes(m.id),
    );
    if (victim) view.outgoing = { weapon: rewardWeapon, maverick: victim };
  }

  return view;
}
