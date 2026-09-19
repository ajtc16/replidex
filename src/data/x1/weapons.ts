import type { Weapon } from "@/domain/types";

/**
 * Mega Man X1 special weapons. Each is looted from the Maverick that owns it,
 * and is the weakness of exactly one other Maverick (the classic loop).
 */
export const x1Weapons: Weapon[] = [
  {
    id: "shotgun-ice",
    name: "Shotgun Ice",
    owner: "X",
    obtainedFrom: "chill-penguin",
    element: "ice",
    effectiveAgainst: ["spark-mandrill"],
    description:
      "Fires a spread of freezing ice. Can be used as a rideable ice platform and freezes certain enemies solid.",
  },
  {
    id: "electric-spark",
    name: "Electric Spark",
    owner: "X",
    obtainedFrom: "spark-mandrill",
    element: "electric",
    effectiveAgainst: ["armored-armadillo"],
    description:
      "Releases a vertical arc of electricity that splits on contact with walls. Powers dormant lifts.",
  },
  {
    id: "rolling-shield",
    name: "Rolling Shield",
    owner: "X",
    obtainedFrom: "armored-armadillo",
    element: "none",
    effectiveAgainst: ["launch-octopus"],
    description:
      "Deploys a rolling energy barrier that blocks projectiles and can be launched forward as an orb.",
  },
  {
    id: "homing-torpedo",
    name: "Homing Torpedo",
    owner: "X",
    obtainedFrom: "launch-octopus",
    element: "water",
    effectiveAgainst: ["boomer-kuwanger"],
    description:
      "Launches self-guiding torpedoes that seek the nearest target. Effective against fast, evasive enemies.",
  },
  {
    id: "boomerang-cutter",
    name: "Boomerang Cutter",
    owner: "X",
    obtainedFrom: "boomer-kuwanger",
    element: "none",
    effectiveAgainst: ["sting-chameleon"],
    description:
      "Throws a curved blade that returns to the user and can sever certain enemy parts and grab distant items.",
  },
  {
    id: "chameleon-sting",
    name: "Chameleon Sting",
    owner: "X",
    obtainedFrom: "sting-chameleon",
    element: "none",
    effectiveAgainst: ["storm-eagle"],
    description:
      "Fires a three-way piercing energy sting. When charged, grants brief invincibility.",
  },
  {
    id: "storm-tornado",
    name: "Storm Tornado",
    owner: "X",
    obtainedFrom: "storm-eagle",
    element: "air",
    effectiveAgainst: ["flame-mammoth"],
    description:
      "Unleashes a horizontal tornado that pierces through multiple enemies across the screen.",
  },
  {
    id: "fire-wave",
    name: "Fire Wave",
    owner: "X",
    obtainedFrom: "flame-mammoth",
    element: "fire",
    effectiveAgainst: ["chill-penguin"],
    description:
      "Spews a stream of flame along the ground. Charged, it forms a defensive pillar of fire.",
  },
];

export const x1WeaponsById: Record<string, Weapon> = Object.fromEntries(
  x1Weapons.map((w) => [w.id, w]),
);
