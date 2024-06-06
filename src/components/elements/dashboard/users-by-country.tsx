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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import UserCountryChart from "@/components/views/dashboard/Usage/usageChart6";
import { usersByCountryAtom, usersByCountryPeriodAtom } from "@/lib/jotai/app-usage/users-by-country";
import { getDateRangeText } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";
import { sum } from "lodash";
import { GoDotFill } from "react-icons/go";

export default function UsersByCountry() {
  const [period, setPeriod] = useAtom(usersByCountryPeriodAtom);
  const [regionAnalytics] = useAtom(usersByCountryAtom);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Users by Country
              </Heading>
              <Heading level={"10"} className="text-start">
                {regionAnalytics.state === 'hasData'
                  ? getDateRangeText(regionAnalytics.data.range.cur.start, regionAnalytics.data.range.cur.end)
                  : regionAnalytics.state
                }
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-40">
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
      <CardContent className="text-center">
        {regionAnalytics.state === 'hasData'
          ? (
            <div className="flex flex-row gap-5 items-center">
              <UserCountryChart data={regionAnalytics.data.result ?? []} />
              <div className="flex flex-col gap-3 w-full">
                {regionAnalytics.data.result?.map(({ name, value, color }, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-2">
                        <GoDotFill size={20} color={color} />
                        <Heading level={"11"}>{name}</Heading>
                      </div>
                      <div className="flex flex-row items-center gap-10">
                        <Heading level={"11"} className="font-semibold">
                          {(function () {
                            const total = sum(regionAnalytics.data.result.map(({ value }) => value));
                            if (total === 0) return '0%';
                            return ((value / total) * 100).toFixed(2) + '%';
                          })()}
                        </Heading>
                        <Heading level={"11"}>{value}</Heading>
                      </div>
                    </div>
                    <Separator />
                  </div>
                )) ?? []}
              </div>
            </div>
          ) : (
            <Skeleton className="w-full h-52" />
          )
        }
      </CardContent>
    </Card>
  );
}