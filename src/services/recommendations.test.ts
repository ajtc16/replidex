import { describe, it, expect } from "vitest";
import {
  buildRoute,
  getNextRecommendedTarget,
  getRecommendedTargets,
  type RouteMode,
} from "./recommendations";
import { emptyProgress } from "./progress";
import { getGameData } from "@/data/registry";
import type { PlayerProgress } from "@/domain/types";

const x1 = getGameData("x1");
const withDefeat = (...ids: string[]): PlayerProgress => ({
  ...emptyProgress,
  defeatedMavericks: ids,
});

describe("getRecommendedTargets", () => {
  it("recommends the canonical opener on a cold start", () => {
    const next = getNextRecommendedTarget(emptyProgress, x1.mavericks, x1.weaponsById);
    expect(next?.maverick.id).toBe("chill-penguin");
  });

  it("prioritises a target whose weakness weapon is owned", () => {
    // Defeating Chill Penguin grants Shotgun Ice → Spark Mandrill's weakness.
    const next = getNextRecommendedTarget(
      withDefeat("chill-penguin"),
      x1.mavericks,
      x1.weaponsById,
    );
    expect(next?.maverick.id).toBe("spark-mandrill");
    expect(next?.reason).toMatch(/Shotgun Ice/);
  });

  it("excludes already-defeated targets", () => {
    const results = getRecommendedTargets(
      withDefeat("chill-penguin"),
      x1.mavericks,
      x1.weaponsById,
    );
    expect(results.some((r) => r.maverick.id === "chill-penguin")).toBe(false);
    expect(results.length).toBe(7);
  });
});

describe("buildRoute", () => {
  const modes: RouteMode[] = ["weakness", "beginner", "collect", "minimal"];

  it.each(modes)("returns all 8 nodes for mode %s", (mode) => {
    const route = buildRoute(mode, emptyProgress, x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
    expect(route.length).toBe(8);
    expect(route.map((n) => n.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    // every game maverick appears exactly once
    expect(new Set(route.map((n) => n.maverick.id)).size).toBe(8);
  });

  it("weakness mode gates later targets until their weapon is owned", () => {
    const route = buildRoute("weakness", emptyProgress, x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
    expect(route[0].status).toBe("available"); // opener
    expect(route[1].status).toBe("locked"); // needs Shotgun Ice
  });

  it("weakness mode unlocks the next target after a defeat", () => {
    const route = buildRoute("weakness", withDefeat("chill-penguin"), x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
    const spark = route.find((n) => n.maverick.id === "spark-mandrill");
    const penguin = route.find((n) => n.maverick.id === "chill-penguin");
    expect(penguin?.status).toBe("complete");
    expect(spark?.status).toBe("available");
  });

  it("non-weakness modes never lock a stage", () => {
    for (const mode of ["beginner", "collect", "minimal"] as RouteMode[]) {
      const route = buildRoute(mode, emptyProgress, x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
      expect(route.every((n) => n.status !== "locked")).toBe(true);
    }
  });

  it("beginner mode orders by ascending threat", () => {
    const route = buildRoute("beginner", emptyProgress, x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
    const threats = route.map((n) => n.maverick.threatLevel ?? 3);
    const sorted = [...threats].sort((a, b) => a - b);
    expect(threats).toEqual(sorted);
  });

  it("collect mode front-loads the stage granting the leg (dash) upgrade", () => {
    // Chill Penguin's stage grants the leg upgrade required by other collectibles.
    const route = buildRoute("collect", emptyProgress, x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
    expect(route[0].maverick.id).toBe("chill-penguin");
  });

  it("minimal mode follows the canonical weakness order", () => {
    const route = buildRoute("minimal", emptyProgress, x1.mavericks, x1.weaponsById, x1.stagesByMaverickId);
    expect(route.map((n) => n.maverick.id)).toEqual(x1.mavericks.map((m) => m.id));
  });
});
