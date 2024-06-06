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
import { DailyActiveChart } from "@/components/views/dashboard/Usage/usageChart3";
import { dailyActiveUsersAtom, dailyActiveUsersPeriodAtom } from "@/lib/jotai";
import { Duration } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";

export default function DailyActiveUsersMobile() {
  const [period, setPeriod] = useAtom(dailyActiveUsersPeriodAtom);
  const [dailyActiveUsers] = useAtom(dailyActiveUsersAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Daily Active Users
              </Heading>
              <Heading level={"10"} className="text-start">
                Dec 1, 2023 - Dec 7, 2023
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
              <SelectTrigger className="w-[68px]">
                <SelectValue placeholder="7D" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                <SelectGroup>
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
        {dailyActiveUsers.state === "hasData" ? (
          <DailyActiveChart data={dailyActiveUsers.data} />
        ) : (
          <Skeleton className="w-full h-6" />
        )}
      </CardContent>
    </Card>
  );
}
