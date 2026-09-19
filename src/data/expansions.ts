import { buildGame, type GameSeed } from "./build";

/**
 * X2–X8 datasets. Bosses are listed in canonical weakness-chain order (each is
 * weak to the previous boss's weapon; the first closes the loop against the
 * last). Weakness/reward links and weapon effectiveness are derived by the
 * builder, so all eight loops match the verified in-game chains.
 */

const x2Seed: GameSeed = {
  id: "x2",
  title: "Mega Man X2",
  subtitle: "X-Hunters — Earth · 21XX",
  year: 1994,
  bosses: [
    { name: "Wire Sponge", weapon: "Strike Chain", element: "electric", location: "Weather Control Center", portrait: "🧽", threat: 3 },
    { name: "Wheel Gator", weapon: "Spin Wheel", element: "none", location: "Maverick Factory", portrait: "🐊", threat: 3 },
    { name: "Bubble Crab", weapon: "Bubble Splash", element: "water", location: "Deep-Sea Base", portrait: "🦀", threat: 3 },
    { name: "Flame Stag", weapon: "Speed Burner", element: "fire", location: "Volcanic Zone", portrait: "🦌", threat: 3 },
    { name: "Morph Moth", weapon: "Silk Shot", element: "none", location: "Orbital Junkyard", portrait: "🦋", threat: 3 },
    { name: "Magna Centipede", weapon: "Magnet Mine", element: "electric", location: "Security Facility", portrait: "🐛", threat: 4 },
    { name: "Crystal Snail", weapon: "Crystal Hunter", element: "none", location: "Crystal Mine", portrait: "🐌", threat: 3 },
    { name: "Overdrive Ostrich", weapon: "Sonic Slicer", element: "air", location: "Desert Highway", portrait: "🐦", threat: 3 },
  ],
};

const x3Seed: GameSeed = {
  id: "x3",
  title: "Mega Man X3",
  subtitle: "Doppler Uprising — Earth · 21XX",
  year: 1995,
  bosses: [
    { name: "Blizzard Buffalo", weapon: "Frost Shield", element: "ice", location: "Frozen Tundra", portrait: "🐃", threat: 3 },
    { name: "Toxic Seahorse", weapon: "Acid Burst", element: "water", location: "Hydro Plant", portrait: "🌊", threat: 3 },
    { name: "Tunnel Rhino", weapon: "Tornado Fang", element: "ground", location: "Mining Tunnels", portrait: "🦏", threat: 3 },
    { name: "Volt Catfish", weapon: "Triad Thunder", element: "electric", location: "Power Plant", portrait: "🐟", threat: 3 },
    { name: "Crush Crawfish", weapon: "Spinning Blade", element: "none", location: "Maverick Armory", portrait: "🦞", threat: 4 },
    { name: "Neon Tiger", weapon: "Ray Splasher", element: "none", location: "Jungle Preserve", portrait: "🐯", threat: 4 },
    { name: "Gravity Beetle", weapon: "Gravity Well", element: "genesis", location: "Gravity Facility", portrait: "🪲", threat: 4 },
    { name: "Blast Hornet", weapon: "Parasitic Bomb", element: "none", location: "Aerial Hangar", portrait: "🐝", threat: 4 },
  ],
};

const x4Seed: GameSeed = {
  id: "x4",
  title: "Mega Man X4",
  subtitle: "Repliforce War — Earth · 21XX",
  year: 1997,
  bosses: [
    { name: "Frost Walrus", weapon: "Frost Tower", element: "ice", location: "Frozen Base", portrait: "🦭", threat: 3 },
    { name: "Jet Stingray", weapon: "Ground Hunter", element: "water", location: "Ocean Speedway", portrait: "🐠", threat: 3 },
    { name: "Slash Beast", weapon: "Twin Slasher", element: "none", location: "Military Train", portrait: "🐆", threat: 4 },
    { name: "Web Spider", weapon: "Lightning Web", element: "electric", location: "Forest Reservoir", portrait: "🕷", threat: 3 },
    { name: "Split Mushroom", weapon: "Soul Body", element: "none", location: "Cyberspace Lab", portrait: "🍄", threat: 4 },
    { name: "Cyber Peacock", weapon: "Aiming Laser", element: "none", location: "Cyberspace Network", portrait: "🦚", threat: 4 },
    { name: "Storm Owl", weapon: "Double Cyclone", element: "air", location: "Sky Fortress", portrait: "🦉", threat: 4 },
    { name: "Magma Dragoon", weapon: "Rising Fire", element: "fire", location: "Magma Volcano Base", portrait: "🐉", threat: 5 },
  ],
};

const x5Seed: GameSeed = {
  id: "x5",
  title: "Mega Man X5",
  subtitle: "Eurasia Crisis — Earth · 21XX",
  year: 2000,
  bosses: [
    { name: "Crescent Grizzly", weapon: "Crescent Shot", element: "none", location: "Guard Base", portrait: "🐻", threat: 3 },
    { name: "Tidal Whale", weapon: "Goo Shaver", element: "water", location: "Ocean Platform", portrait: "🐋", threat: 3 },
    { name: "Volt Kraken", weapon: "Tri-Thunder", element: "electric", location: "Power Facility", portrait: "🦑", threat: 3 },
    { name: "Shining Firefly", weapon: "F-Laser", element: "none", location: "Laser Institute", portrait: "✨", threat: 4 },
    { name: "Dark Necrobat", weapon: "Dark Hold", element: "genesis", location: "Space Observatory", portrait: "🦇", threat: 4 },
    { name: "Spiral Pegasus", weapon: "Wing Spiral", element: "air", location: "Sky Base", portrait: "🦄", threat: 4 },
    { name: "Burn Dinorex", weapon: "Ground Fire", element: "fire", location: "Magma Area", portrait: "🦖", threat: 5 },
    { name: "Spike Rosered", weapon: "Spike Ball", element: "none", location: "Overgrown Ruins", portrait: "🌹", threat: 4 },
  ],
};

const x6Seed: GameSeed = {
  id: "x6",
  title: "Mega Man X6",
  subtitle: "Nightmare Investigation — Earth · 22XX",
  year: 2001,
  bosses: [
    { name: "Commander Yammark", weapon: "Yammar Option", element: "none", location: "Amazon Wetlands", portrait: "🦟", threat: 3 },
    { name: "Ground Scaravich", weapon: "Ground Dash", element: "ground", location: "Buried Ruins", portrait: "🪲", threat: 3 },
    { name: "Blaze Heatnix", weapon: "Magma Blade", element: "fire", location: "Magma Core", portrait: "🔥", threat: 4 },
    { name: "Blizzard Wolfang", weapon: "Ice Burst", element: "ice", location: "Frozen Peak", portrait: "🐺", threat: 4 },
    { name: "Rainy Turtloid", weapon: "Meteor Rain", element: "water", location: "Toxic Rainfront", portrait: "🐢", threat: 4 },
    { name: "Metal Shark Player", weapon: "Metal Anchor", element: "none", location: "Recycling Plant", portrait: "🦈", threat: 4 },
    { name: "Shield Sheldon", weapon: "Guard Shell", element: "none", location: "Laser Laboratory", portrait: "🐚", threat: 4 },
    { name: "Infinity Mijinion", weapon: "Ray Arrow", element: "electric", location: "Weapons Depot", portrait: "👾", threat: 5 },
  ],
};

const x7Seed: GameSeed = {
  id: "x7",
  title: "Mega Man X7",
  subtitle: "Red Alert Insurgency — Earth · 22XX",
  year: 2003,
  bosses: [
    { name: "Soldier Stonekong", weapon: "Gaea Shield", element: "ground", location: "Ancient Tomb", portrait: "🦍", threat: 3 },
    { name: "Tornado Tonion", weapon: "Volt Tornado", element: "electric", location: "Power Plant", portrait: "🧅", threat: 3 },
    { name: "Splash Warfly", weapon: "Splash Laser", element: "water", location: "Hydro Reservoir", portrait: "🪰", threat: 3 },
    { name: "Flame Hyenard", weapon: "Circle Blaze", element: "fire", location: "Wildfire Zone", portrait: "🔥", threat: 4 },
    { name: "Ride Boarski", weapon: "Moving Wheel", element: "none", location: "Central Highway", portrait: "🐗", threat: 3 },
    { name: "Snipe Anteator", weapon: "Sniper Missile", element: "none", location: "Cyber Field", portrait: "🐜", threat: 4 },
    { name: "Wind Crowrang", weapon: "Wind Cutter", element: "air", location: "Sky Base", portrait: "🐦", threat: 4 },
    { name: "Vanishing Gungaroo", weapon: "Explosion", element: "none", location: "Battle Simulator", portrait: "🦘", threat: 4 },
  ],
};

const x8Seed: GameSeed = {
  id: "x8",
  title: "Mega Man X8",
  subtitle: "Jakob Elevator Incident — Earth · 22XX",
  year: 2004,
  bosses: [
    { name: "Bamboo Pandamonium", weapon: "Green Spinner", element: "none", location: "Nature Reserve", portrait: "🐼", threat: 3 },
    { name: "Optic Sunflower", weapon: "Shining Ray", element: "none", location: "Solar Institute", portrait: "🌻", threat: 3 },
    { name: "Dark Mantis", weapon: "Shadow Runner", element: "genesis", location: "Stealth Base", portrait: "🦗", threat: 4 },
    { name: "Gravity Antonion", weapon: "Squeeze Bomb", element: "genesis", location: "Gravity Complex", portrait: "🐜", threat: 4 },
    { name: "Earthrock Trilobyte", weapon: "Crystal Wall", element: "ground", location: "Gem Quarry", portrait: "🪨", threat: 3 },
    { name: "Gigabolt Man-O-War", weapon: "Thunder Dancer", element: "electric", location: "Metro Line", portrait: "🪼", threat: 4 },
    { name: "Avalanche Yeti", weapon: "Drift Diamond", element: "ice", location: "Frozen Facility", portrait: "🧊", threat: 4 },
    { name: "Burn Rooster", weapon: "Melt Creeper", element: "fire", location: "Inferno Core", portrait: "🐓", threat: 4 },
  ],
};

export const builtX2 = buildGame(x2Seed);
export const builtX3 = buildGame(x3Seed);
export const builtX4 = buildGame(x4Seed);
export const builtX5 = buildGame(x5Seed);
export const builtX6 = buildGame(x6Seed);
export const builtX7 = buildGame(x7Seed);
export const builtX8 = buildGame(x8Seed);
