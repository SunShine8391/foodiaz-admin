"use server";

import { serviceAccount } from "@/config";
import { Duration } from "@/types/dashboard/app-usage";
import { devide, getDateRange } from "../../utils";
import analytics from "../analytics";

export const getAvgSessionDuration = async (duration: Duration) => {
  const range = getDateRange(duration);
  const requests = [
    {
      dateRanges: [
        {
          startDate: range.cur.start,
          endDate: range.cur.end,
        },
      ],
      metrics: [{ name: "userEngagementDuration" }, { name: "sessions" }],
      keepEmptyRows: true,
    },
    {
      dateRanges: [
        {
          startDate: range.prev.start,
          endDate: range.prev.end,
        },
      ],
      metrics: [{ name: "userEngagementDuration" }, { name: "sessions" }],
      keepEmptyRows: true,
    },
  ];

  const [response] = await analytics.batchRunReports({
    property: `properties/${serviceAccount.projectId}`,
    requests,
  });

  let curValue = 0;
  let prevValue = 0;

  const cur = response?.reports?.at(0)?.rows?.at(0)?.metricValues;
  const prev = response?.reports?.at(1)?.rows?.at(0)?.metricValues;

  const curDuration = Number(cur?.at(0)?.value) || 0;
  const curSessions = Number(cur?.at(1)?.value) || 0;
  curValue = curSessions === 0 ? 0 : curDuration / curSessions;

  const preDuration = Number(prev?.at(0)?.value) || 0;
  const prevSessions = Number(prev?.at(1)?.value) || 0;
  prevValue = prevSessions === 0 ? 0 : preDuration / prevSessions;

  return {
    range,
    curValue,
    prevValue,
    rateChange: devide(curValue, prevValue),
  };
};
