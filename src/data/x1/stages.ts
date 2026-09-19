import type { Stage } from "@/domain/types";

/**
 * X1 stage intel. Collectible placements reflect well-known routes.
 * `requires` lists weapon/armor ids needed; TODO markers flag uncertain specifics.
 */
export const x1Stages: Stage[] = [
  {
    id: "stage-chill-penguin",
    maverickId: "chill-penguin",
    name: "Arctic Base",
    location: "Snow Field / Frozen Ocean Base",
    collectibles: [
      {
        id: "leg-upgrade",
        type: "armor-upgrade",
        name: "Leg Parts (Dash Boots)",
        description:
          "Light Armor leg capsule granting the Dash ability. Found in an open area on the lower path.",
      },
      {
        id: "heart-chill-penguin",
        type: "heart-tank",
        name: "Heart Tank",
        description:
          "Reachable by dashing up a slope. TODO: confirm whether Dash is strictly required.",
        requires: ["leg-upgrade"],
      },
    ],
  },
  {
    id: "stage-spark-mandrill",
    maverickId: "spark-mandrill",
    name: "Power Plant",
    location: "Hijacked Power Facility",
    collectibles: [
      {
        id: "heart-spark-mandrill",
        type: "heart-tank",
        name: "Heart Tank",
        description: "Behind a breakable section reached via the upper conveyor route.",
        requires: ["boomerang-cutter"],
      },
      {
        id: "sub-spark-mandrill",
        type: "sub-tank",
        name: "Sub Tank",
        description: "Along a high ledge accessible after gaining Dash. TODO: verify path.",
        requires: ["leg-upgrade"],
      },
    ],
  },
  {
    id: "stage-armored-armadillo",
    maverickId: "armored-armadillo",
    name: "Energy Mine",
    location: "Subterranean Mine Shaft",
    collectibles: [
      {
        id: "heart-armored-armadillo",
        type: "heart-tank",
        name: "Heart Tank",
        description: "Requires a wall-jump climb off the mine-cart track.",
        requires: ["leg-upgrade"],
      },
      {
        id: "sub-armored-armadillo",
        type: "sub-tank",
        name: "Sub Tank",
        description: "Hidden on a side rail during the cart sequence.",
      },
    ],
  },
  {
    id: "stage-launch-octopus",
    maverickId: "launch-octopus",
    name: "Ocean Base",
    location: "Submerged Naval Fortress",
    collectibles: [
      {
        id: "heart-launch-octopus",
        type: "heart-tank",
        name: "Heart Tank",
        description: "Under the water in an alcove near the mid-stage. TODO: confirm exact spot.",
      },
    ],
  },
  {
    id: "stage-boomer-kuwanger",
    maverickId: "boomer-kuwanger",
    name: "Central Tower",
    location: "High-Rise Command Spire",
    collectibles: [
      {
        id: "heart-boomer-kuwanger",
        type: "heart-tank",
        name: "Heart Tank",
        description: "Reached by taking the higher elevator branch quickly.",
        requires: ["boomerang-cutter"],
      },
    ],
  },
  {
    id: "stage-sting-chameleon",
    maverickId: "sting-chameleon",
    name: "Jungle Ruins",
    location: "Overgrown Ruins",
    collectibles: [
      {
        id: "body-upgrade",
        type: "armor-upgrade",
        name: "Body Parts (Armor)",
        description:
          "Light Armor body capsule that halves damage taken. Found in a hidden underground cave.",
        requires: ["leg-upgrade"],
      },
      {
        id: "heart-sting-chameleon",
        type: "heart-tank",
        name: "Heart Tank",
        description: "On a ledge among the tree canopy.",
      },
    ],
  },
  {
    id: "stage-storm-eagle",
    maverickId: "storm-eagle",
    name: "Airport",
    location: "Airborne Carrier",
    collectibles: [
      {
        id: "head-upgrade",
        type: "armor-upgrade",
        name: "Head Parts (Helmet)",
        description:
          "Light Armor head capsule enabling head-break of certain blocks. On top of the control tower.",
      },
      {
        id: "sub-storm-eagle",
        type: "sub-tank",
        name: "Sub Tank",
        description: "Along the upper deck of the carrier.",
      },
      {
        id: "heart-storm-eagle",
        type: "heart-tank",
        name: "Heart Tank",
        description: "Near the start on a raised platform.",
      },
    ],
  },
  {
    id: "stage-flame-mammoth",
    maverickId: "flame-mammoth",
    name: "Weapons Refinery",
    location: "Molten Manufacturing Plant",
    collectibles: [
      {
        id: "arm-upgrade",
        type: "armor-upgrade",
        name: "Arm Parts (Buster)",
        description:
          "Light Armor arm capsule upgrading the X-Buster charge. Clear Chill Penguin first to freeze the oil for safe access.",
        requires: ["chill-penguin"],
      },
      {
        id: "heart-flame-mammoth",
        type: "heart-tank",
        name: "Heart Tank",
        description: "Across a pit of conveyor magnets on the upper path.",
      },
      {
        id: "sub-flame-mammoth",
        type: "sub-tank",
        name: "Sub Tank",
        description: "Guarded by fire; easier with Chill Penguin cleared. TODO: verify.",
      },
    ],
  },
];

export const x1StagesByMaverickId: Record<string, Stage> = Object.fromEntries(
  x1Stages.map((s) => [s.maverickId, s]),
);
