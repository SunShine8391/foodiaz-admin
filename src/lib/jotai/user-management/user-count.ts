import { getUsersCount } from "@/lib/firebase/firestore";
import { where } from "firebase/firestore";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

const usersCountAsyncAtom = atom(async (get) => {
  const total = await getUsersCount();
  const premium = await getUsersCount([
    where('subscription', '==', 'premium')
  ]);
  const free = await getUsersCount([
    where('subscription', '==', 'free')
  ]);

  return {
    total,
    premium,
    free
  };
});

export const usersCountAtom = loadable(usersCountAsyncAtom);
