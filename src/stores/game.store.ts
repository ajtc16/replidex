"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SeriesId } from "@/domain/types";
import { DEFAULT_SERIES } from "@/data/registry";

interface GameState {
  seriesId: SeriesId;
  hydrated: boolean;
  _setHydrated: () => void;
  setSeries: (id: SeriesId) => void;
}

/** The player's active "current hunt" game, used by Command and Route. */
export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      seriesId: DEFAULT_SERIES,
      hydrated: false,
      _setHydrated: () => set({ hydrated: true }),
      setSeries: (id) => set({ seriesId: id }),
    }),
    {
      name: "replidex.game.v1",
      onRehydrateStorage: () => (state) => state?._setHydrated(),
      partialize: (s) => ({ seriesId: s.seriesId }),
    },
  ),
);
