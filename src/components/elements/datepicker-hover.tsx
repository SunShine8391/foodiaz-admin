import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";

interface PropType {
  onSearch: (date: DateRange) => void;
}

export default function DatePickerOnHover({ onSearch }: PropType) {
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="shadow">
          {dateRange
            ? `${dateRange.from?.toLocaleDateString() ?? ''} - ${dateRange.to?.toLocaleDateString() ?? ''}`
            : "Select Period"
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-max px-0">
        <Calendar mode='range' selected={dateRange} onSelect={(range) => {
          setDateRange(range); range && onSearch(range)
        }} />
      </PopoverContent>
    </Popover>
  );
}
