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
import { Chart } from "@/components/views/user-management/barChart";
import { appOpensUserAtom, appOpensUserPeriodAtom, userIdAtom } from "@/lib/jotai";
import { getDateRangeText } from "@/lib/utils";
import { AppOpensItem, Duration } from "@/types/dashboard/app-usage";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export default function AppOpens({
  userId
}: {
  userId: string;
}) {
  const [_, setUserId] = useAtom(userIdAtom);
  const [period, setPeriod] = useAtom(appOpensUserPeriodAtom);
  const appOpens = useAtomValue(appOpensUserAtom);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                App Opens
              </Heading>
              <Heading level={"10"} className="text-start">
                {(appOpens.state === 'hasData')
                  ? appOpens.data && getDateRangeText(appOpens.data.range.cur.start, appOpens.data.range.cur.end)
                  : appOpens.state
                }
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="7D" />
              </SelectTrigger>
              <SelectContent className="h-[150px]">
                <SelectGroup>
                  <SelectItem value="1d">1 day</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="1m">1 month</SelectItem>
                  <SelectItem value="3m">3 months</SelectItem>
                  <SelectItem value="6m">6 months</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(appOpens.state === 'hasData')
          ? (appOpens.data.result.length > 0)
            ? (
              <Chart
                data={
                  appOpens.data?.result.map((item: AppOpensItem) => ({
                    name: item.event_date.value,
                    total: item.value,
                  })) ?? []
                }
              />
            )
            : <div className="text-center p-8">No data available</div>
          : <Skeleton className="w-full h-52" />
        }
      </CardContent>
    </Card>
  );
}