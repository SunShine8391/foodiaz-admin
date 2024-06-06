"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { authRoutes, routes } from "@/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useContext } from "react";
import { auth } from "../firebase";

const isInAuthRoute = (path: string) => {
  return authRoutes.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

const LoadingDiv = () => (
  <div className="w-screen h-screen flex justify-center items-center opacity-60">
    <LoadingSpinner className="w-24 h-24"/>
  </div>
);

export const AuthContext = React.createContext<{ user: User | null }>({
  user: null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.refresh();
        const isAuthRoute = isInAuthRoute(pathname);

        if (!isAuthRoute) {
          router.push(routes.auth.signIn);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) return <LoadingDiv />;

  if (user || (!user && isInAuthRoute(pathname))) {
    return (
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
  }

  return <LoadingDiv />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContextProvider.`);
  }

  return context;
};
