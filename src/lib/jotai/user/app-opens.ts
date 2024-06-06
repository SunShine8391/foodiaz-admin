import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { userIdAtom } from "./atoms";

export const appOpensUserPeriodAtom = atom<Duration>("7d");

const appOpensUserAtomAsync = atom(async (get) => {
  const duration = get(appOpensUserPeriodAtom);
  const userId = get(userIdAtom);
  if (!userId) return null;
  return (await fetch(`/api/${userId}/app-opens?duration=${duration}`)).json();
});

export const appOpensUserAtom = loadable(appOpensUserAtomAsync);
