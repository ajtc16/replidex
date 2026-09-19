import type { Character } from "@/domain/types";

/** Core X1 named characters (non-boss). */
export const x1Characters: Character[] = [
  {
    id: "x",
    slug: "x",
    name: "X",
    role: "Maverick Hunter — 17th Elite Unit",
    classification: "hunter",
    affiliation: "Maverick Hunters",
    description:
      "The first Reploid built with true free will and the capacity to choose. Wields the adaptive X-Buster and can copy defeated Maverick weapons.",
    portrait: "🔵",
  },
  {
    id: "zero",
    slug: "zero",
    name: "Zero",
    role: "Commander — 17th Elite Unit",
    classification: "hunter",
    affiliation: "Maverick Hunters",
    description:
      "A powerful, mysterious Hunter and X's closest ally. Sacrifices himself to breach Sigma's fortress and unlock X's full potential.",
    portrait: "🔴",
  },
  {
    id: "vile",
    slug: "vile",
    name: "Vile",
    role: "Rogue Hunter / Sigma's Enforcer",
    classification: "maverick",
    affiliation: "Sigma's Rebellion",
    description:
      "A ride-armor specialist expelled from the Hunters for excessive force. Now hunts X directly on Sigma's orders.",
    portrait: "🟣",
  },
  {
    id: "sigma",
    slug: "sigma",
    name: "Sigma",
    role: "Final Threat — Former Hunter Commander",
    classification: "commander",
    affiliation: "Sigma's Rebellion",
    description:
      "Once the greatest Maverick Hunter, now the mastermind of the Reploid uprising. Commands the Maverick army from a fortified stronghold.",
    portrait: "💀",
  },
  {
    id: "dr-cain",
    slug: "dr-cain",
    name: "Dr. Cain",
    role: "Reploid Pioneer / Hunter Founder",
    classification: "human",
    affiliation: "Maverick Hunters",
    description:
      "The archaeologist who discovered Dr. Light's capsule and reverse-engineered Reploid technology, founding the Maverick Hunters.",
    portrait: "🧬",
  },
];

export const x1CharactersById: Record<string, Character> = Object.fromEntries(
  x1Characters.map((c) => [c.id, c]),
);
