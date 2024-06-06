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
import { AcquisitionChart } from "@/components/views/dashboard/Usage/usageChart5";
import { acquisitionSourceAtom, acquisitionSourcePeriodAtom } from "@/lib/jotai/app-usage/acquisition-source";
import { getDateRangeText } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";
import { replace, upperFirst } from "lodash";

export default function AcquisitionSourceMobile() {
  const [period, setPeriod] = useAtom(acquisitionSourcePeriodAtom);
  const [acquisition] = useAtom(acquisitionSourceAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Acquisition Source
              </Heading>
              <Heading level={"10"} className="text-start">
                {acquisition.state === 'hasData'
                  ? getDateRangeText(acquisition.data.range.cur.start, acquisition.data.range.cur.end)
                  : acquisition.state
                }
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
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
      <CardContent className="text-center">
        {acquisition.state === 'hasData' ? (
          <AcquisitionChart
            labels={acquisition.data.result.map((item: any) => upperFirst(replace(item.label, '-', ' ')))}
            data={acquisition.data.result.map((item: any) => item.value)}
          />
        ) : (
          <Skeleton className="w-full h-6" />
        )}
      </CardContent>
    </Card>
  );
}