import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const rageTapsPeriodAtom = atom<Duration>("7d");

const rageTapsAtomAsync = atom(async (get) => {
  const duration = get(rageTapsPeriodAtom);
  return (await fetch(`/api/dashboard/rage-taps?duration=${duration}`)).json();
});

export const rageTapsAtom = loadable(rageTapsAtomAsync);
