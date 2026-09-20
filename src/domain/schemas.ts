import { z } from "zod";

/**
 * Runtime schemas mirroring domain/types.ts. Used by the data-integrity test
 * suite (and available for validating any externally-sourced data later).
 * Kept structurally in sync with the TypeScript types.
 */

export const elementSchema = z.enum([
  "ice",
  "fire",
  "electric",
  "water",
  "air",
  "ground",
  "genesis",
  "none",
]);

export const seriesSchema = z.enum([
  "x1",
  "x2",
  "x3",
  "x4",
  "x5",
  "x6",
  "x7",
  "x8",
]);

export const abilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

export const attackPatternSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  counter: z.string().optional(),
});

export const maverickSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  series: seriesSchema,
  species: z.string().optional(),
  element: elementSchema.optional(),
  location: z.string().min(1),
  description: z.string().min(1),
  portrait: z.string().min(1),
  stageImage: z.string().optional(),
  weaknessWeaponId: z.string().min(1),
  weaponRewardId: z.string().min(1),
  abilities: z.array(abilitySchema),
  attackPatterns: z.array(attackPatternSchema),
  fieldNotes: z.array(z.string()).optional(),
  threatLevel: z.number().int().min(1).max(5).optional(),
});

export const weaponSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  owner: z.string().min(1),
  obtainedFrom: z.string().min(1),
  element: elementSchema.optional(),
  effectiveAgainst: z.array(z.string()),
  description: z.string().min(1),
});

export const collectibleSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["heart-tank", "sub-tank", "armor-upgrade", "secret"]),
  name: z.string().min(1),
  description: z.string().min(1),
  requires: z.array(z.string()).optional(),
});

export const stageSchema = z.object({
  id: z.string().min(1),
  maverickId: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  collectibles: z.array(collectibleSchema),
});

export const blueprintModuleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["frame", "systems", "armor", "armaments"]),
  description: z.string().min(1),
  status: z.enum(["standard", "upgradeable", "experimental"]).optional(),
  position: z.object({ x: z.number(), y: z.number() }).optional(),
});

export const blueprintSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  entityType: z.enum(["reploid", "maverick", "hunter", "armor", "weapon"]),
  modelNumber: z.string().optional(),
  role: z.string().optional(),
  manufacturer: z.string().optional(),
  series: seriesSchema.optional(),
  description: z.string().min(1),
  views: z.object({
    front: z.string().optional(),
    side: z.string().optional(),
    rear: z.string().optional(),
    exploded: z.string().optional(),
  }),
  modules: z.array(blueprintModuleSchema),
});

export const characterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  classification: z.enum(["maverick", "hunter", "reploid", "human", "commander"]),
  affiliation: z.string().min(1),
  description: z.string().min(1),
  portrait: z.string().min(1),
});

export const gameSchema = z.object({
  id: seriesSchema,
  title: z.string().min(1),
  subtitle: z.string().min(1),
  releaseYear: z.number().int(),
  mavericks: z.array(z.string()),
});
