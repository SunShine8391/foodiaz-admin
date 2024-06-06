import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { userIdAtom } from "./atoms";

export const avgSessionUserPeriodAtom = atom<Duration>("7d");

const avgSessionUserAtomAsync = atom(async (get) => {
  const duration = get(avgSessionUserPeriodAtom);
  const userId = get(userIdAtom);
  if (!userId) return null;
  return (await fetch(`/api/${userId}/avg-session?duration=${duration}`)).json();
});

export const avgSessionUserAtom = loadable(avgSessionUserAtomAsync);
