import { Person } from "@/types";
import { routes } from "./routes";
import { HiUsers, HiMiniChartPie } from "react-icons/hi2";
import { RiSettingsFill } from "react-icons/ri";

export const navLinks = [
  {
    icon: HiUsers,
    label: "User Management",
    mobile: "Management",
    link: routes.user.management,
    name: "user",
  },
  {
    icon: HiMiniChartPie,
    label: "Dashboard",
    mobile: "Dashboard",
    link: routes.dashboard.ingredients,
    name: "dashboard",
  },
  {
    icon: RiSettingsFill,
    label: "Settings",
    mobile: "Settings",
    link: routes.settings.user,
    name: "setting",
  },
];

export const dashboardLinks = [
  {
    icon: HiUsers,
    label: "Ingredients",
    link: routes.dashboard.ingredients,
    name: "ingredients",
  },
  {
    icon: HiUsers,
    label: "Recipes",
    link: routes.dashboard.recipes,
    name: "recipes",
  },
  {
    icon: HiUsers,
    label: "App Usage",
    link: routes.dashboard.usage,
    name: "usage",
  },
  {
    icon: HiUsers,
    label: "Database Metrics",
    link: routes.dashboard.metrics,
    name: "metrics",
  },
];

export const settingLinks = [
  {
    icon: HiUsers,
    label: "Internal Users",
    link: routes.settings.user,
    name: "internal",
  },
  {
    icon: HiUsers,
    label: "Account Settings",
    link: routes.settings.home,
    name: "accountSettings",
  },
];

export const settingPageLinks = ["/internal-user", "/setting"];

export const dashboardPageLinks = [
  "/ingredients",
  "/metrics",
  "/recipes",
  "/usage",
];

export const people: Person[] = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export const userPageLinks = ["/"];

export const DEFAULT_PAGE_SIZE = 20;

export const regionOptions = [
  "All",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Burundi",
  "India",
  "Kosovo",
  "Mexico",
  "Pakistan",
  "Peru",
  "Turkey",
  "Türkiye",
  "United States",
  "United States of America",
];

export const deviceOptions = ["All", "Android", "iOS"];

export const subscriptionOptions = ["All", "Premium", "Free"];

export const goalList = [
  { value: "eatHealthier", name: "Eat Healthier", color: "#FF5D00" },
  {
    value: "expandCookingSkills",
    name: "Expand Cooking Skills",
    color: "#DC86F3",
  },
  { value: "saveMoney", name: "Save Money", color: "#57A9EE" },
  { value: "simplifyMealtime", name: "Simplify Meal Time", color: "#75CF9A" },
];

export const REGION_COLORS = [
  "#FF5D00",
  "#DC86F3",
  "#57A9EE",
  "#75CF9A",
  "#FFCB7D",
];

export const DEVICE_COLORS = ["#FF5D00", "#FF9E66"];

export const CHART_COLORS = [
  "#FF5D00",
  "#DC86F3",
  "#955FD8",
  "#6371F6",
  "#57A9EE",
  "#92CDFF",
  "#58DCCC",
  "#75CF9A",
  "#FFCB7D",
  "#EE484F",
  "#FF9E66F"
];