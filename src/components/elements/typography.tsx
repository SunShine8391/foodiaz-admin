import { createElement, forwardRef, memo } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const textVariants = cva("font-normal font-montserrat text-foreground", {
  variants: {
    level: {
      lgTitle: "text-4xl",
      baseTitle: "text-3xl",
      mdTitle: "text-2xl",
      smTitle: "text-xl",
      xsTitle: "text-lg leading-lgTitle",
      sub: "text-base leading-baseTall md:text-lg md:leading-lgTall text-muted-foreground tracking-wide",
      lgTall: "text-base leading-baseTall md:text-lg md:leading-lgTall",
      lg: "text-base md:text-lg",
      baseTall: "text-md leading-mdTall md:text-base md:leading-mdTall",
      base: "text-md md:text-base",
      mdTall: "text-sm leading-smTall md:text-md md:leading-mdTall",
      md: "text-sm md:text-md",
      smTall: "text-sm leading-smTall",
      sm: "text-sm",
      caption: "text-caption",
      xs: "text-xs",
    },
  },
  defaultVariants: {
    level: "md",
  },
});

interface TextProps
  extends ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const Text = memo(
  forwardRef<HTMLHeadingElement, TextProps>(
    ({ level = "base", as = "p", className, ...props }, _ref) => {
      return createElement(as, {
        ref: _ref,
        className: cn(textVariants({ level: level }), className),
        ...props,
      });
    }
  )
);

Text.displayName = "Text";
