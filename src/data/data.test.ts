import { describe, it, expect } from "vitest";
import {
  gameBundles,
  allMavericks,
  allWeapons,
  allStages,
  allMavericksById,
  allWeaponsById,
} from "./registry";
import { x1Blueprints, x1Characters } from "./x1";
import {
  maverickSchema,
  weaponSchema,
  stageSchema,
  blueprintSchema,
  characterSchema,
  gameSchema,
} from "@/domain/schemas";

describe("schema conformance", () => {
  it("every maverick matches the schema", () => {
    for (const m of allMavericks) expect(() => maverickSchema.parse(m)).not.toThrow();
  });
  it("every weapon matches the schema", () => {
    for (const w of allWeapons) expect(() => weaponSchema.parse(w)).not.toThrow();
  });
  it("every stage matches the schema", () => {
    for (const s of allStages) expect(() => stageSchema.parse(s)).not.toThrow();
  });
  it("every game matches the schema", () => {
    for (const b of gameBundles) expect(() => gameSchema.parse(b.game)).not.toThrow();
  });
  it("X1 blueprints and characters match their schemas", () => {
    for (const bp of x1Blueprints) expect(() => blueprintSchema.parse(bp)).not.toThrow();
    for (const c of x1Characters) expect(() => characterSchema.parse(c)).not.toThrow();
  });
});

describe("global uniqueness", () => {
  it("maverick ids and slugs are globally unique", () => {
    const ids = allMavericks.map((m) => m.id);
    const slugs = allMavericks.map((m) => m.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("weapon ids are globally unique", () => {
    const ids = allWeapons.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("registry indexes cover every entity", () => {
    expect(Object.keys(allMavericksById).length).toBe(allMavericks.length);
    expect(Object.keys(allWeaponsById).length).toBe(allWeapons.length);
  });
});

describe("referential integrity", () => {
  it("every maverick's weakness and reward weapons exist", () => {
    for (const m of allMavericks) {
      expect(allWeaponsById[m.weaknessWeaponId], `${m.id} weakness`).toBeDefined();
      expect(allWeaponsById[m.weaponRewardId], `${m.id} reward`).toBeDefined();
    }
  });
  it("every weapon is obtained from a real maverick and is effective against real mavericks", () => {
    for (const w of allWeapons) {
      expect(allMavericksById[w.obtainedFrom], `${w.id} source`).toBeDefined();
      for (const target of w.effectiveAgainst) {
        expect(allMavericksById[target], `${w.id} target ${target}`).toBeDefined();
      }
    }
  });
  it("effectiveAgainst is consistent with the target's declared weakness", () => {
    for (const w of allWeapons) {
      for (const targetId of w.effectiveAgainst) {
        expect(allMavericksById[targetId].weaknessWeaponId).toBe(w.id);
      }
    }
  });
  it("every stage references a real maverick and has unique collectible ids", () => {
    const seen = new Set<string>();
    for (const s of allStages) {
      expect(allMavericksById[s.maverickId], `${s.id} maverick`).toBeDefined();
      for (const c of s.collectibles) {
        expect(seen.has(c.id), `duplicate collectible ${c.id}`).toBe(false);
        seen.add(c.id);
      }
    }
  });
});

describe("per-game weakness loop", () => {
  for (const bundle of gameBundles) {
    const { game, mavericks, weapons } = bundle;
    const weaponsById = Object.fromEntries(weapons.map((w) => [w.id, w]));
    const mavericksById = Object.fromEntries(mavericks.map((m) => [m.id, m]));

    describe(game.id.toUpperCase(), () => {
      it("has exactly 8 Mavericks and 8 weapons", () => {
        expect(mavericks.length).toBe(8);
        expect(weapons.length).toBe(8);
      });

      it("weakness weapons resolve to a boss within the same game", () => {
        for (const m of mavericks) {
          const weakness = weaponsById[m.weaknessWeaponId];
          expect(weakness, `${m.id} weakness in ${game.id}`).toBeDefined();
          expect(mavericksById[weakness.obtainedFrom], `${weakness.id} source in ${game.id}`).toBeDefined();
        }
      });

      it("forms a single closed weakness cycle over all 8 bosses", () => {
        // predecessor(m) = the boss that drops m's weakness weapon
        const predecessor = (id: string) =>
          weaponsById[mavericksById[id].weaknessWeaponId].obtainedFrom;

        const start = mavericks[0].id;
        const visited: string[] = [];
        let cursor = start;
        do {
          visited.push(cursor);
          cursor = predecessor(cursor);
          expect(visited.length).toBeLessThanOrEqual(8); // guard against short sub-loops
        } while (cursor !== start && visited.length <= 8);

        expect(cursor).toBe(start); // closed the loop
        expect(new Set(visited).size).toBe(8); // touched every boss exactly once
      });

      it("each boss drops a unique reward weapon owned by it", () => {
        const rewards = mavericks.map((m) => m.weaponRewardId);
        expect(new Set(rewards).size).toBe(8);
        for (const m of mavericks) {
          expect(weaponsById[m.weaponRewardId].obtainedFrom).toBe(m.id);
        }
      });
    });
  }
});
