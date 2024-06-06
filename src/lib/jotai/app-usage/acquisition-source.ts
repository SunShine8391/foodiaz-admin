import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const acquisitionSourcePeriodAtom = atom<Duration>("7d");

const acquisitionSourceAtomAsync = atom(async (get) => {
  const duration = get(acquisitionSourcePeriodAtom);
  return (await fetch(`/api/dashboard/acquisition-source?duration=${duration}`)).json();
});

export const acquisitionSourceAtom = loadable(acquisitionSourceAtomAsync);
