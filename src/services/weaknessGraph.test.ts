import { describe, it, expect } from "vitest";
import { buildWeaknessGraph, getWeaknessChainFor } from "./weaknessGraph";
import { computeCompletion } from "./progress";
import { generateLogs } from "./logs";
import { getGameData } from "@/data/registry";
import { emptyProgress } from "./progress";

const x1 = getGameData("x1");

describe("buildWeaknessGraph", () => {
  it("produces one edge per boss forming a closed cycle", () => {
    const edges = buildWeaknessGraph(x1.mavericks, x1.weaponsById);
    expect(edges.length).toBe(8);
    // each boss is a target exactly once and a source exactly once
    expect(new Set(edges.map((e) => e.toMaverickId)).size).toBe(8);
    expect(new Set(edges.map((e) => e.fromMaverickId)).size).toBe(8);
  });
});

describe("getWeaknessChainFor", () => {
  it("resolves incoming and outgoing links for Chill Penguin", () => {
    const chain = getWeaknessChainFor(
      x1.mavericks.find((m) => m.id === "chill-penguin")!,
      x1.mavericks,
      x1.weaponsById,
    );
    expect(chain.incoming?.maverick.id).toBe("flame-mammoth");
    expect(chain.incoming?.weapon.id).toBe("fire-wave");
    expect(chain.outgoing?.weapon.id).toBe("shotgun-ice");
    expect(chain.outgoing?.maverick.id).toBe("spark-mandrill");
  });
});

describe("computeCompletion", () => {
  it("is 0% with no progress and counts bosses as they fall", () => {
    const empty = computeCompletion(emptyProgress, x1.mavericks.length, x1.stages);
    expect(empty.percent).toBe(0);
    expect(empty.bossesTotal).toBe(8);

    const one = computeCompletion(
      { ...emptyProgress, defeatedMavericks: ["chill-penguin"] },
      x1.mavericks.length,
      x1.stages,
    );
    expect(one.bossesDefeated).toBe(1);
    expect(one.percent).toBeGreaterThan(0);
  });
});

describe("generateLogs", () => {
  it("emits a standby entry with no progress", () => {
    const logs = generateLogs(emptyProgress, {}, {}, []);
    expect(logs.length).toBe(1);
    expect(logs[0].kind).toBe("intel");
  });

  it("logs a defeat and the recovered weapon", () => {
    const byId = Object.fromEntries(x1.mavericks.map((m) => [m.id, m]));
    const logs = generateLogs(
      { ...emptyProgress, defeatedMavericks: ["chill-penguin"] },
      byId,
      x1.weaponsById,
      x1.stages,
    );
    const actions = logs.map((l) => l.action);
    expect(actions.some((a) => a.includes("Defeated Chill Penguin"))).toBe(true);
    expect(actions.some((a) => a.includes("Shotgun Ice"))).toBe(true);
  });
});
