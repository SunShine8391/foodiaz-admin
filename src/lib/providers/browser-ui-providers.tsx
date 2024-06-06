"use client";

import { TailwindIndicator } from "@/lib/providers/tailwind-indicator";
import { domAnimation, LazyMotion } from "framer-motion";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { ConfettiProvider } from "./confetti-provider";

export default function BrowserUIProviders({ children }: PropsWithChildren) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      <LazyMotion features={domAnimation} strict>
        <JotaiProvider>
          <ConfettiProvider />
          {children}
          <TailwindIndicator />
        </JotaiProvider>
      </LazyMotion>
    </NextThemeProvider>
  );
}
