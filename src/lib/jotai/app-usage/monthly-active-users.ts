import { Months } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const monthlyActiveUsersPeriodAtom = atom<Months>("6m");

const monthlyActiveUsersAsyncAtom = atom(async (get) => {
  const duration = get(monthlyActiveUsersPeriodAtom);
  return (await fetch(`/api/dashboard/monthly-active-users?duration=${duration}`)).json();
});

export const monthlyActiveUsersAtom = loadable(monthlyActiveUsersAsyncAtom);
