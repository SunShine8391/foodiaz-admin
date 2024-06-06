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
import { dailyActiveUsersPeriodAtom, dailyActiveUsersAtom } from "@/lib/jotai";
import { Duration } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";

export default function DailyActiveUsers() {
  const [period, setPeriod] = useAtom(dailyActiveUsersPeriodAtom);
  const [dailyActiveUsers] = useAtom(dailyActiveUsersAtom);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Daily Active Users
              </Heading>
              <Heading level={"10"} className="text-start">
                {dailyActiveUsers.state === "hasData" ? (
                  dailyActiveUsers.data.range.start + ' - ' + dailyActiveUsers.data.range.end
                ) : dailyActiveUsers.state}
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="7D" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                <SelectGroup>
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
      <CardContent className="text-center">
        {dailyActiveUsers.state === "hasData" ? (
          <DailyActiveChart data={dailyActiveUsers.data} />
        ) : (
          <Skeleton className="w-full h-52" />
        )}
      </CardContent>
    </Card>
  );
}