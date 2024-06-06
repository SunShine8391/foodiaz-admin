import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        xs: "1rem",
        sm: "2rem",
        lg: "3rem",
      },
      screens: {
        xxs: "380px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1780px",
        "4xl": "2160px", // only need to control product grid mode in ultra 4k device
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      fontSize: {
        xs: ["0.625rem", { lineHeight: "0.75rem" }], // 10px/12px
        sm: ["0.75rem", { lineHeight: "1rem" }], // 12px/16px // smTall // 12px/18px
        md: ["0.875rem", { lineHeight: "1.125rem" }], // 14px/18px // mdTall // 14px/20px
        base: ["1rem", { lineHeight: "1.25rem" }], // 16px/20px // baseTall // 16px/24px
        lg: ["1.125rem", { lineHeight: "1.5rem" }], // 18px/24px // lgTall // 18px/28px // lgTitle // 18px/22px
        xl: ["1.375rem", { lineHeight: "1.625rem", letterSpacing: "-0.22px" }], // 22px/26px // smTitle
        "2xl": [
          "1.5rem",
          // "1.625rem",
          { lineHeight: "1.875rem", letterSpacing: "-0.26px" },
        ], // 24px/30px // mdTitle
        "3xl": ["1.75rem", { lineHeight: "2rem", letterSpacing: "-0.26px" }], // 28px/32px // baseTitle
        "4xl": ["2rem", { lineHeight: "2.25rem", letterSpacing: "-0.64px" }], // 32px/36px // lgTitle
        // Displays
        "5xl": ["2.5rem", { lineHeight: "2.75rem", letterSpacing: "-0.8px" }], // 40px/44px // xsDisplay
        "6xl": ["3rem", { lineHeight: "3.375rem", letterSpacing: "-0.96px" }], // 48px/54px // smDisplay
        "7xl": ["3.75rem", { lineHeight: "4.25rem", letterSpacing: "-2.4px" }], // 60px/68px // mdDisplay
        "8xl": ["4.5rem", { lineHeight: "4.625rem", letterSpacing: "-2.88px" }], // 72px/74px // lgDisplay
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        "89.5": "358px",
        "134.25": "537px",
      },
      backgroundImage: {
        "auth-background": "url('/background/auth.png')",
      },
      boxShadow: {
        "bottom-bar": "4px 0px 16px rgba(51, 51, 51, 0.10)",
      },
      maxWidth: {
        "dashboard-top-bar": "calc( 100vw - 32px )",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
