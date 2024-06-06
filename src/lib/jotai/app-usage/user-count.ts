import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const userCountPeriodAtom = atom<Duration>("7d");

const userCountAsyncAtom = atom(async (get) => {
  const duration = get(userCountPeriodAtom);
  return (await fetch(`/api/dashboard/user-count?duration=${duration}`)).json();
});

export const userCountAtom = loadable(userCountAsyncAtom);
