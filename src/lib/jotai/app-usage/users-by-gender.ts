import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const usersByGenderPeriodAtom = atom<Duration>("1m");

const usersByGenderAtomAsync = atom(async (get) => {
  const duration = get(usersByGenderPeriodAtom);
  return (await fetch(`/api/dashboard/users-by-gender?duration=${duration}`)).json();
});

export const usersByGenderAtom = loadable(usersByGenderAtomAsync);
