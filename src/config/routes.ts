import { Route } from "next";

export const routes = {
  auth: {
    forgotPassword: "/forgot-password" as Route<string>,
    forgotPasswordCode: "/forgot-password/code" as Route<string>,
    resetPassword: "/forgot-password/reset" as Route<string>,
    signIn: "/sign-in" as Route<string>,
    twoFactorAuthentication: "/two-factor" as Route<string>,
    resetTwoFactor: "/two-factor/reset" as Route<string>,
  },
  dashboard: {
    ingredients: "/ingredients" as Route<string>,
    metrics: "/metrics" as Route<string>,
    recipes: "/recipes" as Route<string>,
    usage: "/usage" as Route<string>,
  },
  user: {
    management: "/" as Route<string>,
    profile: (id: string) => `/${id}` as Route<string>,
  },
  settings: {
    user: "/internal-user" as Route<string>,
    home: "/setting" as Route<string>,
  },
};

export const authRoutes = Object.values(routes.auth);
