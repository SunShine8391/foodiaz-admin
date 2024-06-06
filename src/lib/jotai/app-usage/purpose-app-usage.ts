import { goalList } from "@/config";
import { getUsersCount } from "@/lib/firebase/firestore";
import { getMonthRange } from "@/lib/utils";
import { Months } from "@/types/dashboard/app-usage";
import { where } from "firebase/firestore";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const appPurposePeriodAtom = atom<Months>("6m");

const appPurposeAsyncAtom = atom(async (get) => {
  const duration = get(appPurposePeriodAtom);
  const range = getMonthRange(duration);

  const goalUsers = await Promise.all(
    goalList.map(async ({ value }) => {
      const count = await getUsersCount([
        where("goal", "==", value),
        where("createdAt", ">=", range.startDate),
        where("createdAt", "<=", range.endDate),
      ]);
      return count;
    })
  );

  return {
    goalAnalytics: goalList.map(({ name, color }, index) => ({
      name,
      color,
      value: goalUsers?.[index] ?? 0,
    })),
    range,
  };
});

export const appPurposeAtom = loadable(appPurposeAsyncAtom);
