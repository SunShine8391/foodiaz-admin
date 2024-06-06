import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { userIdAtom } from "./atoms";

export const popularFeaturesUserPeriodAtom = atom<Duration>("7d");

const popularFeaturesUserAtomAsync = atom(async (get) => {
  const duration = get(popularFeaturesUserPeriodAtom);
  const userId = get(userIdAtom);
  if (!userId) return null;
  return (await fetch(`/api/${userId}/popular-features?duration=${duration}`)).json();
});

export const popularFeaturesUserAtom = loadable(popularFeaturesUserAtomAsync);
