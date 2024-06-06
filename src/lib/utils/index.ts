import { Duration } from "@/types/dashboard/app-usage";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "../firebase";

export * from "./date-utils";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string, options?: RequestInit) => {
  let accessToken = "";
  if (auth.currentUser) {
    accessToken = await auth.currentUser.getIdToken();
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      ...options,
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fixedNumber = (n: number, digits: number = 2) => n.toFixed(digits);

export const getImgUrlFromName = (name: string) => `${BASE_URL}/Admin/GetMostPurchasedIngredient/${name}`;

export const devide = (a: number | null | undefined, b: number | null | undefined) => {
  let nA = a ?? 0;
  let nB = b ?? 0;

  if (nB === 0) {
    if (nA === 0) return 0;
    if (nA > 0) return 1;
    return -1;
  }

  if (nA === 0) {
    if (nB > 0) {
      return -1;
    }
    return 1;
  }

  return (nA - nB) / nB;
};

export const percentage = (a: number) => `${(a * 100).toPrecision(3)}%`;

export const getComparingText = (duration: Duration) => {
  switch (duration) {
    case "1d":
      return "vs yesterday";
    case "7d":
      return "vs previous 7 days";
    case "1m":
      return "vs previous month";
    case "3m":
      return "vs previous 3 months";
    case "6m":
      return "vs previous 6 months";
  }
};

export function genNum() {
  var arr = [], // target array
    source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], // source array
    sourceLen = source.length,
    i,
    r;

  for (i = 0; i < 5; i++) {
    r = Math.floor(Math.random() * (sourceLen - i)); // pick a random index
    // remove it from the source and add it to the target
    arr.push(source.splice(r, 1)[0]);
  }

  // return it
  return arr.join("");
}