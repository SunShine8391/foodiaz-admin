"use client"

import { Heading } from "@/components/elements/headings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { userIdAtom } from "@/lib/jotai";
import { avgSessionUserAtom, avgSessionUserPeriodAtom } from "@/lib/jotai/user/avg-session";
import { devide, fromSecondsToString, getDateRangeText, percentage } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";

export default function AvgSessionDurationMobile({
  userId
}: {
  userId: string;
}) {
  const [_, setUserId] = useAtom(userIdAtom);
  const [period, setPeriod] = useAtom(avgSessionUserPeriodAtom);
  const avgSession = useAtomValue(avgSessionUserAtom);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-5 h-fit"
      style={{
        boxShadow: "0px 2px 8px 0px rgba(51, 51, 51, 0.13)",
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <Heading level={"9"} className="text-start">
            Avg. Session Duration
          </Heading>
          <Heading level={"10"} className="text-start">
            {(avgSession.state === 'hasData')
              ? getDateRangeText(avgSession.data.range.cur.start, avgSession.data.range.cur.end)
              : avgSession.state
            }
          </Heading>
        </div>
        <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
          <SelectTrigger className="w-16">
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
      {(avgSession.state === 'hasData')
        ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Heading level={"12"}>
              {fromSecondsToString(avgSession.data.curValue)}
            </Heading>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-1 items-center">
                <Heading level={"11"} className="text-[#0D9A47]">
                  {percentage(devide(avgSession.data.curValue, avgSession.data.prevValue))}
                </Heading>
                <HiOutlineArrowRightCircle
                  color="#0D9A47"
                  size={16}
                  style={{
                    transform: (avgSession.data.rateChange < 0) ? "rotate(45deg)" : "rotate(-45deg)"
                  }}
                />
              </div>
              <Heading level={"11"} className="text-[#919191]">
                vs previous 7 days
              </Heading>
            </div>
          </div>
        )
        : <Skeleton className="w-full h-6" />
      }
    </div>
  );
}