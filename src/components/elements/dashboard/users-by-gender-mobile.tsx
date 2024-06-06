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
import UserGenderChart from "@/components/views/dashboard/Usage/usageChart7";
import { usersByGenderAtom, usersByGenderPeriodAtom } from "@/lib/jotai/app-usage/users-by-gender";
import { getDateRangeText } from "@/lib/utils";
import { Duration, UsersByGenderItem } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";
import { sum } from "lodash";
import { GoDotFill } from "react-icons/go";

export default function UsersByGenderMobile() {
  const [period, setPeriod] = useAtom(usersByGenderPeriodAtom);
  const [users] = useAtom(usersByGenderAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <Heading level={"9"} className="text-start">
                Users by Gender
              </Heading>
              <Heading level={"10"} className="text-start">
                {(users.state === 'hasData')
                  ? getDateRangeText(users.data.range.cur.start, users.data.range.cur.end)
                  : users.state
                }
              </Heading>
            </div>
            <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
              <SelectTrigger className="w-[68px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-40">
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
      <CardContent>
        <div className="flex flex-col gap-5 items-center justify-center">
          <UserGenderChart
            data={(users.state === 'hasData') ? users.data.result : []}
            height={(users.state !== 'hasData' || users.data.result.length === 0) ? 0 : 200}
          />
          {(users.state === 'hasData')
            ? (users.data.result.length === 0)
              ? (
                <div className="w-full h-12 flex justify-center">
                  No data available
                </div>
              )
              : (
                <div className="flex flex-col gap-3 w-full">
                  {(users.data.result.map((item: UsersByGenderItem) => (
                    <>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-2">
                          <GoDotFill size={20} color="#DC86F3" />
                          <Heading level={"11"}>{item.gender}</Heading>
                        </div>
                        <div className="flex flex-row items-center gap-10">
                          <Heading level={"11"} className="font-semibold">
                            {(function () {
                              const total = sum(users.data.result.map((item: UsersByGenderItem) => item.value));
                              if (total === 0) return '0%';
                              return ((item.value / total) * 100).toFixed(2) + '%';
                            })()}
                          </Heading>
                          <Heading level={"11"}>{item.value}</Heading>
                        </div>
                      </div>
                      <Separator />
                    </>
                  )))}
                </div>
              )
            : (
              <Skeleton className="w-full h-12" />
            )
          }

        </div>
      </CardContent>
    </Card>
  );
}