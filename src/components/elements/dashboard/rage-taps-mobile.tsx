"use client"

import { Heading } from "@/components/elements/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { MostRageChart } from "@/components/views/dashboard/Usage/usageChart2";
import { rageTapsAtom, rageTapsPeriodAtom } from "@/lib/jotai/app-usage/rage-taps";
import { getDateRangeText } from "@/lib/utils";
import { RageTapsItem } from "@/types/dashboard/app-usage";
import { useAtom, useAtomValue } from "jotai";

export default function RageTapsMobile() {
  const [period, setPeriod] = useAtom(rageTapsPeriodAtom);
  const rageTaps = useAtomValue(rageTapsAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Screens with the Most Rage Taps
              </Heading>
              <Heading level={"10"} className="text-start">
                {(rageTaps.state === 'hasData')
                  ? getDateRangeText(rageTaps.data.range.cur.start, rageTaps.data.range.cur.end)
                  : rageTaps.state
                }
              </Heading>
            </div>
            <Select>
              <SelectTrigger className="w-[68px]">
                <SelectValue placeholder="7D" />
              </SelectTrigger>
              <SelectContent className="h-[150px]">
                <SelectGroup>
                  <SelectItem value="1d">1D</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                  <SelectItem value="1m">1M</SelectItem>
                  <SelectItem value="3m">3M</SelectItem>
                  <SelectItem value="6m">6M</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-2 items-center">
        {(rageTaps.state === 'hasData')
          ? (rageTaps.data.result.length > 0)
            ? (
              <>
                <MostRageChart
                  data={rageTaps.data.result.map((item: RageTapsItem) => item.value)}
                  labels={rageTaps.data.result.map((item: RageTapsItem) => item.page_name)}
                />
                <div className="text-sm font-normal">Event Count</div>
              </>
            )
            : <div className="text-center p-8">No data available</div>
          : <Skeleton className="w-full h-12" />
        }
      </CardContent>
    </Card>
  );
}