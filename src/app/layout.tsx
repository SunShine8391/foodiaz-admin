import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster as SonnerToast } from "sonner";
import BrowserUIProviders from "@/lib/providers/browser-ui-providers";
import { AuthContextProvider } from "@/lib/providers/auth-provider";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from 'jotai'

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Foodiaz",
  description: "Foodiaz Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-montserrat antialiased",
          montserrat.variable
        )}
      >
        <SonnerToast position="top-right" richColors closeButton duration={2000} />
        <BrowserUIProviders>
          <Provider>
            <AuthContextProvider>
              <MantineProvider>{children}</MantineProvider>
            </AuthContextProvider>
          </Provider>
        </BrowserUIProviders>
      </body>
    </html>
  );
}
