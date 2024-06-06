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
import PurposeChart from "@/components/views/dashboard/Usage/usageChart1";
import { appPurposeAtom, appPurposePeriodAtom } from "@/lib/jotai/app-usage/purpose-app-usage";
import { Months } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";
import { sum } from "lodash";
import { GoDotFill } from "react-icons/go";

export default function PurposeAppUsageMobile() {
  const [period, setPeriod] = useAtom(appPurposePeriodAtom);
  const [purposeAppUsage] = useAtom(appPurposeAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Purpose of Using App
              </Heading>
              <Heading level={"10"} className="text-start">
                {purposeAppUsage.state === 'hasData'
                  ? purposeAppUsage.data.range.startDate + ' - ' + purposeAppUsage.data.range.endDate
                  : purposeAppUsage.state
                }
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Months)}>
              <SelectTrigger className="w-[68px]">
                <SelectValue placeholder="7D" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                <SelectGroup>
                  <SelectItem value="6m">6M</SelectItem>
                  <SelectItem value="1y">1Y</SelectItem>
                  <SelectItem value="3y">3Y</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <PurposeChart
            data={(purposeAppUsage.state === 'hasData')
              ? purposeAppUsage.data.goalAnalytics ?? []
              : []
            }
            height={(purposeAppUsage.state === 'hasData') ? 200 : 0}
          />
          {purposeAppUsage.state === 'hasData' ? (
            <>
              <div className="flex flex-col gap-3 w-full">
                {purposeAppUsage.data.goalAnalytics?.map(({ color, name, value }, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-2">
                        <GoDotFill size={20} color={color} />
                        <Heading level={"11"}>{name}</Heading>
                      </div>
                      <div className="flex flex-row items-center gap-20">
                        <Heading level={"11"} className="font-semibold">
                          {(
                            (value / (sum(purposeAppUsage.data.goalAnalytics.map((item) => item.value)) ?? 1)) * 100
                          ).toFixed(2)}
                          %
                        </Heading>
                        <Heading level={"11"}>{value}</Heading>
                      </div>
                    </div>
                    <Separator />
                  </div>
                )) ?? []}
              </div>
            </>
          ) : (
            <Skeleton className="w-full h-6" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}