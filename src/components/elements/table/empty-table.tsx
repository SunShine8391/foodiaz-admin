"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/elements/headings";
import { Text } from "@/components/elements/typography";

import { EmptyTableIcon, SvgHalfCirclePattern } from "./empty-table-icon";

export interface EmptyTableProps {
  icon?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  button?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

/**
 * @description EmptyTable is supposed to be as a placeholder within tables when no data available.
 * It provides a brief information about the reasons why table is empty and visually shows that current state
 * is expected and valid.
 * */
export const EmptyTable: React.FC<EmptyTableProps> = ({
  icon,
  title = "No data yet",
  description,
  button,
  buttonLabel = "Create new",
  onButtonClick,
}) => {
  return (
    <div className="container flex h-full w-full flex-col items-center justify-center gap-6 text-center">
      <EmptyTableIcon className="h-30 w-40" />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Heading level={6} className="font-semibold text-muted-foreground">
          {title}
        </Heading>
        {description && <Text level="sub">{description}</Text>}
      </div>

      {button ? (
        <>{button}</>
      ) : (
        <Button onClick={onButtonClick}>{buttonLabel}</Button>
      )}
    </div>
  );
};
