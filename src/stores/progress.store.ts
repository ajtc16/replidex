"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayerProgress } from "@/domain/types";
import { allMavericksById } from "@/data/registry";

interface ProgressState extends PlayerProgress {
  hydrated: boolean;
  _setHydrated: () => void;

  defeatMaverick: (id: string) => void;
  restoreMaverick: (id: string) => void;
  toggleMaverick: (id: string) => void;

  collectItem: (id: string) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;

  addArmorUpgrade: (id: string) => void;
  removeArmorUpgrade: (id: string) => void;

  resetProgress: () => void;
}

const addUnique = (arr: string[], id: string) =>
  arr.includes(id) ? arr : [...arr, id];
const remove = (arr: string[], id: string) => arr.filter((x) => x !== id);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      defeatedMavericks: [],
      collectedItems: [],
      acquiredWeapons: [],
      armorUpgrades: [],
      hydrated: false,
      _setHydrated: () => set({ hydrated: true }),

      defeatMaverick: (id) =>
        set((s) => {
          const reward = allMavericksById[id]?.weaponRewardId;
          return {
            defeatedMavericks: addUnique(s.defeatedMavericks, id),
            acquiredWeapons: reward
              ? addUnique(s.acquiredWeapons, reward)
              : s.acquiredWeapons,
          };
        }),
      restoreMaverick: (id) =>
        set((s) => {
          const reward = allMavericksById[id]?.weaponRewardId;
          return {
            defeatedMavericks: remove(s.defeatedMavericks, id),
            acquiredWeapons: reward
              ? remove(s.acquiredWeapons, reward)
              : s.acquiredWeapons,
          };
        }),
      toggleMaverick: (id) =>
        set((s) => {
          const isDefeated = s.defeatedMavericks.includes(id);
          const reward = allMavericksById[id]?.weaponRewardId;
          if (isDefeated) {
            return {
              defeatedMavericks: remove(s.defeatedMavericks, id),
              acquiredWeapons: reward
                ? remove(s.acquiredWeapons, reward)
                : s.acquiredWeapons,
            };
          }
          return {
            defeatedMavericks: addUnique(s.defeatedMavericks, id),
            acquiredWeapons: reward
              ? addUnique(s.acquiredWeapons, reward)
              : s.acquiredWeapons,
          };
        }),

      collectItem: (id) =>
        set((s) => ({ collectedItems: addUnique(s.collectedItems, id) })),
      removeItem: (id) =>
        set((s) => ({ collectedItems: remove(s.collectedItems, id) })),
      toggleItem: (id) =>
        set((s) => ({
          collectedItems: s.collectedItems.includes(id)
            ? remove(s.collectedItems, id)
            : addUnique(s.collectedItems, id),
        })),

      addArmorUpgrade: (id) =>
        set((s) => ({ armorUpgrades: addUnique(s.armorUpgrades, id) })),
      removeArmorUpgrade: (id) =>
        set((s) => ({ armorUpgrades: remove(s.armorUpgrades, id) })),

      resetProgress: () =>
        set({
          defeatedMavericks: [],
          collectedItems: [],
          acquiredWeapons: [],
          armorUpgrades: [],
        }),
    }),
    {
      name: "replidex.progress.v1",
      onRehydrateStorage: () => (state) => state?._setHydrated(),
      partialize: (s) => ({
        defeatedMavericks: s.defeatedMavericks,
        collectedItems: s.collectedItems,
        acquiredWeapons: s.acquiredWeapons,
        armorUpgrades: s.armorUpgrades,
      }),
    },
  ),
);
