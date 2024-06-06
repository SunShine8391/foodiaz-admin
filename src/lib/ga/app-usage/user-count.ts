"use server";

import { serviceAccount } from "@/config";
import { Duration } from "@/types/dashboard/app-usage";
import { devide, getDateRange } from "../../utils";
import analytics from "../analytics";

export const getUserCount = async (duration: Duration) => {
  const range = getDateRange(duration);
  const requests = [
    {
      dateRanges: [
        {
          startDate: range.cur.start,
          endDate: range.cur.end,
        },
      ],
      metrics: [{ name: "totalUsers" }],
      keepEmptyRows: true,
    },
    {
      dateRanges: [
        {
          startDate: range.prev.start,
          endDate: range.prev.end,
        },
      ],
      metrics: [{ name: "totalUsers" }],
      keepEmptyRows: true,
    },
  ];

  const [response] = await analytics.batchRunReports({
    property: `properties/${serviceAccount.projectId}`,
    requests,
  });

  // return response;

  const curValue = Number(response?.reports?.at(0)?.rows?.at(0)?.metricValues?.at(0)?.value ?? 0);
  const prevValue = Number(response?.reports?.at(1)?.rows?.at(0)?.metricValues?.at(0)?.value ?? 0);

  return {
    range,
    curValue,
    prevValue,
    rateChange: devide(curValue, prevValue),
  };
};
