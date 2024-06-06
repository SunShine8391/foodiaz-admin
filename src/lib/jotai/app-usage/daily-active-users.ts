import { Duration } from "@/types/dashboard/app-usage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const dailyActiveUsersPeriodAtom = atom<Duration>("7d");

const dailyActiveUsersAsyncAtom = atom(async (get) => {
  const duration = get(dailyActiveUsersPeriodAtom);
  return (await fetch(`/api/dashboard/daily-active-users?duration=${duration}`)).json();
});

export const dailyActiveUsersAtom = loadable(dailyActiveUsersAsyncAtom);
