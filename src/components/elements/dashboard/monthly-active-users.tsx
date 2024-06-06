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
import { MonthlyActiveChart } from "@/components/views/dashboard/Usage/usageChart4";
import { monthlyActiveUsersAtom, monthlyActiveUsersPeriodAtom } from "@/lib/jotai/app-usage/monthly-active-users";
import { Months } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";

export default function MonthlyActiveUsers() {
  const [period, setPeriod] = useAtom(monthlyActiveUsersPeriodAtom);
  const [monthlyActiveUsers] = useAtom(monthlyActiveUsersAtom);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Monthly Active Users
              </Heading>
              <Heading level={"10"} className="text-start">
                {monthlyActiveUsers.state === 'hasData' ? monthlyActiveUsers.data.range : monthlyActiveUsers.state}
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Months)}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="7D" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                <SelectGroup>
                  <SelectItem value="6m">6 months</SelectItem>
                  <SelectItem value="1y">1 year</SelectItem>
                  <SelectItem value="3y">3 years</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {monthlyActiveUsers.state === 'hasData' ? (
          <MonthlyActiveChart data={monthlyActiveUsers.data} />
        ) : (
          <Skeleton className="w-full h-52" />
        )}
      </CardContent>
    </Card>
  );
}
