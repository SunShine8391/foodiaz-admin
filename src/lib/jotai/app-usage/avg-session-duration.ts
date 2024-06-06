import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const avgSessionPeriodAtom = atom<Duration>("7d");

const avgSessionAtomAsync = atom(async (get) => {
  const duration = get(avgSessionPeriodAtom);
  return (await fetch(`/api/dashboard/app-usage?duration=${duration}`)).json();
});

export const avgSessionAtom = loadable(avgSessionAtomAsync);
