import { atom } from "jotai";

export const filterAtom = atom({
  search: "",
  region: "All",
  deviceType: "All",
  subscription: "All"
});
