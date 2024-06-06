"use server";

import { serviceAccount } from "@/config";
import { getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import analytics from "../analytics";

export const getUsersByGender = async (duration: Duration) => {
  const range = getDateRange(duration);
  const [response] = await analytics.runReport({
    property: `properties/${serviceAccount.projectId}`,
    dateRanges: [
      {
        startDate: range.cur.start,
        endDate: range.cur.end,
      },
    ],
    dimensions: [{ name: "userGender" }],
    metrics: [{ name: "totalUsers" }],
  });

  const result =
    response.rows?.map((item) => ({
      gender: item.dimensionValues?.[0]?.value,
      value: item.metricValues?.[0]?.value,
    })) ?? [];

  return {
    range,
    result,
  };
};
