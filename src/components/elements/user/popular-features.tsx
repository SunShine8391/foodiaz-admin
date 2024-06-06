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
import ChartPie from "@/components/views/user-management/pieChart";
import { CHART_COLORS } from "@/config";
import { userIdAtom } from "@/lib/jotai";
import { popularFeaturesUserAtom, popularFeaturesUserPeriodAtom } from "@/lib/jotai/user/popular-features";
import { getDateRangeText } from "@/lib/utils";
import { Duration, PopularFeatureItem, WithUserId } from "@/types/dashboard/app-usage";
import { useAtom, useAtomValue } from "jotai";
import { sum } from "lodash";
import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";

export default function PopularFeatures({ userId }: WithUserId) {
  const [_, setUserId] = useAtom(userIdAtom);
  const [period, setPeriod] = useAtom(popularFeaturesUserPeriodAtom);
  const popularFeatures = useAtomValue(popularFeaturesUserAtom);

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
                Popular Features
              </Heading>
              <Heading level={"10"} className="text-start">
                {(popularFeatures.state === 'hasData')
                  ? getDateRangeText(popularFeatures.data.range.cur.start, popularFeatures.data.range.cur.end)
                  : popularFeatures.state
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
      <CardContent>
        {(popularFeatures.state === 'hasData')
          ? (popularFeatures.data.result.length > 0)
            ? (
              <div className="flex flex-row gap-5">
                <ChartPie data={popularFeatures.data.result}  />
                <div className="flex flex-col gap-3 w-full">
                  {popularFeatures.data.result?.map((item: PopularFeatureItem, index: number) => (
                    <>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-2">
                          <GoDotFill size={20} color={CHART_COLORS[index % CHART_COLORS.length]} />
                          <Heading level={"11"}>{item.label}</Heading>
                        </div>
                        <Heading level={"11"}>
                          {(function () {
                            const total = sum(popularFeatures.data.result?.map((item: PopularFeatureItem) => item.value) ?? []);
                            if (total === 0) return '0%';
                            return (item.value / total * 100).toFixed(2) + '%';
                          })()}
                        </Heading>
                      </div>
                      <Separator />
                    </>
                  ))}
                </div>
              </div>
            )
            : (
              <div className="text-center p-8">
                No data available
              </div>
            )
          : <Skeleton className="w-full h-52" />
        }
      </CardContent>
    </Card>
  );
}