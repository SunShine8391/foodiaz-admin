import { DEVICE_COLORS, REGION_COLORS, deviceOptions, regionOptions } from "@/config";
import { getUsersCount } from "@/lib/firebase/firestore";
import { getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import { where } from "firebase/firestore";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const usersByDevicePeriodAtom = atom<Duration>("1m");

const usersByDeviceAsyncAtom = atom(async (get) => {
  const duration = get(usersByDevicePeriodAtom);
  const range = getDateRange(duration);

  const deviceUsers = await Promise.all(
    deviceOptions.map(async (value) => {
      const count = await getUsersCount([
        where("device_type", "==", value),
        where("createdAt", ">=", range.cur.start),
        where("createdAt", "<=", range.cur.end),
      ]);
      return count;
    })
  );

  const result = deviceOptions
    .map((name, index) => ({
      name,
      color: "",
      value: deviceUsers?.[index] ?? 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 2)
    .map((item, index) => ({
      ...item,
      color: DEVICE_COLORS[index]
    }))

  return {
    range,
    result,
  };
});

export const usersByDeviceAtom = loadable(usersByDeviceAsyncAtom);
