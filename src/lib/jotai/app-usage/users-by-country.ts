import { REGION_COLORS, regionOptions } from "@/config";
import { getUsersCount } from "@/lib/firebase/firestore";
import { getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import { where } from "firebase/firestore";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const usersByCountryPeriodAtom = atom<Duration>("1m");

const usersByCountryAsyncAtom = atom(async (get) => {
  const duration = get(usersByCountryPeriodAtom);
  const range = getDateRange(duration);

  const regionUsers = await Promise.all(
    regionOptions.map(async (value) => {
      const count = await getUsersCount([
        where("region", "==", value),
        where("createdAt", ">=", range.cur.start),
        where("createdAt", "<=", range.cur.end),
      ]);
      return count;
    })
  );

  const result = regionOptions
    .map((name, index) => ({
      name,
      value: regionUsers?.[index] ?? 0,
      color: "",
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      color: REGION_COLORS[index],
    }));

  return {
    range,
    result,
  };
});

export const usersByCountryAtom = loadable(usersByCountryAsyncAtom);
