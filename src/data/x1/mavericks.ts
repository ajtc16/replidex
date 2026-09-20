import type { Maverick } from "@/domain/types";

/**
 * Mega Man X1 boss Mavericks.
 * Weakness / reward relationships follow the classic X1 loop:
 *   Chill Penguin → Spark Mandrill → Armored Armadillo → Launch Octopus →
 *   Boomer Kuwanger → Sting Chameleon → Storm Eagle → Flame Mammoth → (loops)
 *
 * portrait uses an emoji glyph as an MVP placeholder (no copyrighted sprites).
 */
export const x1Mavericks: Maverick[] = [
  {
    id: "chill-penguin",
    slug: "chill-penguin",
    name: "Chill Penguin",
    series: "x1",
    species: "Penguin-type Reploid",
    element: "ice",
    location: "Arctic Base",
    description:
      "A cold, calculating Maverick who has sealed an ocean base in perpetual ice. Freezes anything that moves and covers his arena in slick terrain.",
    portrait: "chill-penguin",
    weaknessWeaponId: "fire-wave",
    weaponRewardId: "shotgun-ice",
    threatLevel: 3,
    abilities: [
      { id: "cp-slide", name: "Ice Slide", description: "Dashes across the floor on his belly at high speed." },
      { id: "cp-drone", name: "Penguin Drone", description: "Summons small sliding penguin drones to harass from the ground." },
      { id: "cp-breath", name: "Ice Breath", description: "Exhales a cone of freezing air that can freeze X in place." },
      { id: "cp-blizzard", name: "Wall Blizzard", description: "Activates fans that push X toward hazards while spawning ice." },
    ],
    attackPatterns: [
      { id: "cp-p1", name: "Slide Rush", description: "Leaps to a wall then slides across the arena.", counter: "Jump over the slide and punish on landing." },
      { id: "cp-p2", name: "Blizzard Sculptures", description: "Creates ice statues that slide toward X.", counter: "Destroy statues or use Fire Wave to melt them." },
    ],
    fieldNotes: [
      "Highly mobile but has limited recovery after a dash attack — punish the whiff.",
      "Fire Wave melts his ice sculptures and staggers him instantly.",
      "Defeating him first shuts down the freeze hazard in Flame Mammoth's refinery. TODO: verify cross-stage effect.",
    ],
  },
  {
    id: "spark-mandrill",
    slug: "spark-mandrill",
    name: "Spark Mandrill",
    series: "x1",
    species: "Mandrill-type Reploid",
    element: "electric",
    location: "Power Plant",
    description:
      "A brutish Maverick charged with raw voltage, guarding a hijacked power facility. Overloads the lighting and lunges through the dark.",
    portrait: "spark-mandrill",
    weaknessWeaponId: "shotgun-ice",
    weaponRewardId: "electric-spark",
    threatLevel: 3,
    abilities: [
      { id: "sm-punch", name: "Electric Surge", description: "Slams the ground, sending electricity along the floor and up the walls." },
      { id: "sm-cling", name: "Ceiling Cling", description: "Climbs and traverses the ceiling before dropping onto X." },
      { id: "sm-dash", name: "Charging Lunge", description: "Rushes across the arena with unstoppable momentum." },
    ],
    attackPatterns: [
      { id: "sm-p1", name: "Wall Traverse", description: "Bounces between walls and ceiling.", counter: "Shotgun Ice freezes him mid-motion; stack hits while frozen." },
      { id: "sm-p2", name: "Surge Slam", description: "Ground pound releasing electric arcs.", counter: "Jump the arcs and freeze on the way down." },
    ],
    fieldNotes: [
      "Shotgun Ice freezes him solid — chain hits to melt his health bar.",
      "The stage can black out; expect ambushes in the dark corridors.",
    ],
  },
  {
    id: "armored-armadillo",
    slug: "armored-armadillo",
    name: "Armored Armadillo",
    series: "x1",
    species: "Armadillo-type Reploid",
    element: "none",
    location: "Energy Mine",
    description:
      "A heavily plated Maverick who curls into an invulnerable ball and ricochets around a subterranean energy mine.",
    portrait: "armored-armadillo",
    weaknessWeaponId: "electric-spark",
    weaponRewardId: "rolling-shield",
    threatLevel: 3,
    abilities: [
      { id: "aa-roll", name: "Ball Roll", description: "Curls up and bounces around the room, deflecting normal shots." },
      { id: "aa-absorb", name: "Shot Absorb", description: "Absorbs buster fire with his armor and reflects it as a projectile." },
      { id: "aa-charge", name: "Horn Charge", description: "Rushes forward with his armored horn lowered." },
    ],
    attackPatterns: [
      { id: "aa-p1", name: "Ricochet Ball", description: "Bounces around unpredictably while curled.", counter: "Electric Spark strips his armor and stuns him out of the roll." },
      { id: "aa-p2", name: "Absorb & Fire", description: "Eats a charged shot then spits it back.", counter: "Avoid feeding him charged buster; use Electric Spark instead." },
    ],
    fieldNotes: [
      "Electric Spark blows off his armor and cancels the ball roll.",
      "The mine features rocket-cart rails — great for score/XP but hazardous.",
    ],
  },
  {
    id: "launch-octopus",
    slug: "launch-octopus",
    name: "Launch Octopus",
    series: "x1",
    species: "Octopus-type Reploid",
    element: "water",
    location: "Ocean Base",
    description:
      "A naval Maverick commanding a submerged fortress. Fills the water with homing missiles and whirlpools that drag X around.",
    portrait: "launch-octopus",
    weaknessWeaponId: "rolling-shield",
    weaponRewardId: "homing-torpedo",
    threatLevel: 4,
    abilities: [
      { id: "lo-missiles", name: "Homing Missiles", description: "Fires clusters of tracking missiles from his tentacles." },
      { id: "lo-whirl", name: "Whirlpool", description: "Spins to create a vortex that pulls X toward his blades." },
      { id: "lo-dart", name: "Tentacle Dart", description: "Detaches spinning tentacles that dart across the arena." },
    ],
    attackPatterns: [
      { id: "lo-p1", name: "Missile Barrage", description: "Saturates the screen with homing missiles.", counter: "Rolling Shield blocks missiles and deals heavy damage on contact." },
      { id: "lo-p2", name: "Vortex Pull", description: "Drags X into melee range.", counter: "Buster-jump against the pull; keep the shield up." },
    ],
    fieldNotes: [
      "Rolling Shield both damages him and negates his missile spam.",
      "Underwater physics increase jump height — recalibrate your spacing.",
    ],
  },
  {
    id: "boomer-kuwanger",
    slug: "boomer-kuwanger",
    name: "Boomer Kuwanger",
    series: "x1",
    species: "Stag Beetle-type Reploid",
    element: "none",
    location: "Central Tower",
    description:
      "A blinding-fast Maverick who teleports around a towering spire, snatching X with his horns and hurling him into walls.",
    portrait: "boomer-kuwanger",
    weaknessWeaponId: "homing-torpedo",
    weaponRewardId: "boomerang-cutter",
    threatLevel: 4,
    abilities: [
      { id: "bk-boomerang", name: "Boomerang Horn", description: "Launches his crescent horn as a returning blade." },
      { id: "bk-warp", name: "Warp Dash", description: "Teleports across the room to reposition instantly." },
      { id: "bk-grab", name: "Horn Toss", description: "Grabs X and slams him into the far wall." },
    ],
    attackPatterns: [
      { id: "bk-p1", name: "Blink Strike", description: "Vanishes and reappears beside X.", counter: "Homing Torpedo tracks him through the teleport." },
      { id: "bk-p2", name: "Grab & Slam", description: "Rushes in to grapple.", counter: "Stay airborne; punish the recovery frames." },
    ],
    fieldNotes: [
      "Homing Torpedo removes the guessing game against his warps.",
      "The tower features a hidden elevator route to a Heart Tank. TODO: confirm exact requirements.",
    ],
  },
  {
    id: "sting-chameleon",
    slug: "sting-chameleon",
    name: "Sting Chameleon",
    series: "x1",
    species: "Chameleon-type Reploid",
    element: "none",
    location: "Jungle Ruins",
    description:
      "A stealth Maverick lurking in overgrown ruins. Cloaks himself invisible and drops from the ceiling with a barbed tongue.",
    portrait: "sting-chameleon",
    weaknessWeaponId: "boomerang-cutter",
    weaponRewardId: "chameleon-sting",
    threatLevel: 4,
    abilities: [
      { id: "sc-cloak", name: "Active Camouflage", description: "Turns nearly invisible and stalks X." },
      { id: "sc-tongue", name: "Barbed Tongue", description: "Lashes out with a long tongue from range." },
      { id: "sc-spikes", name: "Ceiling Spikes", description: "Shakes the arena, dropping stalactite spikes from above." },
    ],
    attackPatterns: [
      { id: "sc-p1", name: "Cloaked Ambush", description: "Disappears then strikes.", counter: "Boomerang Cutter reveals and staggers him even while cloaked." },
      { id: "sc-p2", name: "Spike Rain", description: "Drops hazards from the ceiling.", counter: "Watch the wall for shadows and stay mobile." },
    ],
    fieldNotes: [
      "Boomerang Cutter interrupts his cloak and severs his tail segment.",
      "His stage hides the Body Armor upgrade capsule.",
    ],
  },
  {
    id: "storm-eagle",
    slug: "storm-eagle",
    name: "Storm Eagle",
    series: "x1",
    species: "Eagle-type Reploid",
    element: "air",
    location: "Airport",
    description:
      "An aerial Maverick who has commandeered an airborne carrier. Rules the skies with gale-force winds that shove X off the deck.",
    portrait: "storm-eagle",
    weaknessWeaponId: "chameleon-sting",
    weaponRewardId: "storm-tornado",
    threatLevel: 4,
    abilities: [
      { id: "se-gust", name: "Wind Gust", description: "Beats his wings to push X toward the edge of the platform." },
      { id: "se-dive", name: "Dive Bomb", description: "Swoops across the arena talons-first." },
      { id: "se-eggs", name: "Storm Eggs", description: "Drops eggs that hatch into small attacking birds." },
    ],
    attackPatterns: [
      { id: "se-p1", name: "Gale Push", description: "Sustained wind to force a fall.", counter: "Chameleon Sting staggers him and cancels the wind." },
      { id: "se-p2", name: "Talon Dive", description: "Fast diagonal dive.", counter: "Dash under the dive and return fire." },
    ],
    fieldNotes: [
      "Chameleon Sting stops his wind and stun-locks him.",
      "Beating Storm Eagle disables searchlights and blackouts in Spark Mandrill's plant. TODO: verify.",
      "His stage carries the Head/Helmet upgrade and a Sub Tank.",
    ],
  },
  {
    id: "flame-mammoth",
    slug: "flame-mammoth",
    name: "Flame Mammoth",
    series: "x1",
    species: "Mammoth-type Reploid",
    element: "fire",
    location: "Weapons Refinery",
    description:
      "A hulking Maverick stomping through a molten refinery. Floods the floor with oil and fire and quakes the ground with every step.",
    portrait: "flame-mammoth",
    weaknessWeaponId: "storm-tornado",
    weaponRewardId: "fire-wave",
    threatLevel: 3,
    abilities: [
      { id: "fm-flame", name: "Fire Trunk", description: "Sprays a stream of flame from his trunk across the floor." },
      { id: "fm-stomp", name: "Ground Quake", description: "Slams down to stun X and shake loose debris." },
      { id: "fm-oil", name: "Oil Spray", description: "Coats the floor in oil that ignites into fire pillars." },
    ],
    attackPatterns: [
      { id: "fm-p1", name: "Fire Sweep", description: "Sprays flame low across the arena.", counter: "Storm Tornado pierces him and interrupts the spray." },
      { id: "fm-p2", name: "Quake Stun", description: "Stomps to freeze X's footing.", counter: "Stay airborne during the stomp windows." },
    ],
    fieldNotes: [
      "Storm Tornado tears through his bulk for massive damage.",
      "Clearing Chill Penguin first freezes the oil, neutralizing the fire hazard in this stage.",
      "Holds the charged Arm/Buster upgrade capsule.",
    ],
  },
];

export const x1MavericksById: Record<string, Maverick> = Object.fromEntries(
  x1Mavericks.map((m) => [m.id, m]),
);
