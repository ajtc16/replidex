import type { Game } from "@/domain/types";
import { x1Mavericks } from "./mavericks";

export const x1Game: Game = {
  id: "x1",
  title: "Mega Man X",
  subtitle: "Maverick Uprising — Earth · 21XX",
  releaseYear: 1993,
  mavericks: x1Mavericks.map((m) => m.id),
};

export * from "./mavericks";
export * from "./weapons";
export * from "./stages";
export * from "./characters";
export * from "./blueprints";
export * from "./intel";
