"use client";

import * as React from "react";
import { type SelectTriggerProps } from "@radix-ui/react-select";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Heading } from "../elements/headings";

export type Props = {
  className?: SelectTriggerProps;
  label: string;
  options?: string[];
  value?: string;
  onValueChange?: (value: string) => void;
};

export function StyleSwitcher({
  className,
  label,
  options = ["All"],
  value,
  onValueChange,
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "flex flex-row gap-2 h-10 rounded-[10px] px-3 w-fit text-sm focus:border focus:border-solid focus:border-[#FF5D00]",
          className
        )}
      >
        <Heading level={"10"} className="text-sm">
          {label}:
        </Heading>
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, index) => (
          <SelectItem key={index} value={item} className="text-sm">
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
