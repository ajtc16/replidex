/**
 * REPLIDEX domain model.
 * Presentation-agnostic. Data files in src/data conform to these shapes.
 * Structured so X2–X8 can be added later without schema changes.
 */

export type ElementType =
  | "ice"
  | "fire"
  | "electric"
  | "water"
  | "air"
  | "ground"
  | "genesis"
  | "none";

export type SeriesId = "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8";

export type CollectibleType =
  | "heart-tank"
  | "sub-tank"
  | "armor-upgrade"
  | "secret";

export type EntityClassification =
  | "maverick"
  | "hunter"
  | "reploid"
  | "human"
  | "commander";

export interface Game {
  id: SeriesId;
  title: string;
  subtitle: string;
  releaseYear: number;
  mavericks: string[]; // maverick ids
}

export interface Ability {
  id: string;
  name: string;
  description: string;
}

export interface AttackPattern {
  id: string;
  name: string;
  description: string;
  counter?: string;
}

export interface Maverick {
  id: string;
  slug: string;
  name: string;
  series: SeriesId;
  species?: string;
  element?: ElementType;
  location: string;
  description: string;
  portrait: string; // path or emoji/glyph fallback for MVP
  stageImage?: string;
  weaknessWeaponId: string;
  weaponRewardId: string;
  abilities: Ability[];
  attackPatterns: AttackPattern[];
  fieldNotes?: string[];
  threatLevel?: number; // 1..5
}

export interface Weapon {
  id: string;
  name: string;
  owner: string; // e.g. "X"
  obtainedFrom: string; // maverick id the weapon is looted from
  element?: ElementType;
  effectiveAgainst: string[]; // maverick ids
  description: string;
}

export interface StageCollectible {
  id: string;
  type: CollectibleType;
  name: string;
  description: string;
  requires?: string[]; // weapon/armor ids needed to obtain
}

export interface Stage {
  id: string;
  maverickId: string;
  name: string;
  location: string;
  collectibles: StageCollectible[];
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  role: string;
  classification: EntityClassification;
  affiliation: string;
  description: string;
  portrait: string;
}

export interface BlueprintModule {
  id: string;
  name: string;
  category: "frame" | "systems" | "armor" | "armaments";
  description: string;
  status?: "standard" | "upgradeable" | "experimental";
  /** Normalized 0..100 coordinates over the blueprint viewbox. */
  position?: { x: number; y: number };
}

export interface Blueprint {
  id: string;
  slug: string;
  name: string;
  entityType: "reploid" | "maverick" | "hunter" | "armor" | "weapon";
  modelNumber?: string;
  role?: string;
  manufacturer?: string;
  series?: SeriesId;
  description: string;
  views: {
    front?: string;
    side?: string;
    rear?: string;
    exploded?: string;
  };
  modules: BlueprintModule[];
}

export interface PlayerProgress {
  defeatedMavericks: string[];
  collectedItems: string[];
  acquiredWeapons: string[];
  armorUpgrades: string[];
}

/* --- Derived / view-model helpers --- */

export type TargetStatus = "complete" | "available" | "locked";

export interface WeaknessEdge {
  fromMaverickId: string; // maverick that drops the weapon
  weaponId: string;
  toMaverickId: string; // maverick weak to that weapon
}

export interface RouteNode {
  order: number;
  maverick: Maverick;
  status: TargetStatus;
  weaponReward?: Weapon;
  weakness?: Weapon;
  reason: string;
}
