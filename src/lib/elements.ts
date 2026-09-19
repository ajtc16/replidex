import type { ElementType } from "@/domain/types";

export interface ElementMeta {
  label: string;
  color: string; // css var
  glyph: string;
}

export const ELEMENT_META: Record<ElementType, ElementMeta> = {
  ice: { label: "Ice", color: "var(--el-ice)", glyph: "❄" },
  fire: { label: "Fire", color: "var(--el-fire)", glyph: "🔥" },
  electric: { label: "Electric", color: "var(--el-electric)", glyph: "⚡" },
  water: { label: "Water", color: "var(--el-water)", glyph: "💧" },
  air: { label: "Air", color: "var(--el-air)", glyph: "🌪" },
  ground: { label: "Ground", color: "var(--el-ground)", glyph: "⛰" },
  genesis: { label: "Genesis", color: "var(--el-genesis)", glyph: "✦" },
  none: { label: "Neutral", color: "var(--el-none)", glyph: "◈" },
};

export function elementMeta(el?: ElementType): ElementMeta {
  return ELEMENT_META[el ?? "none"];
}
