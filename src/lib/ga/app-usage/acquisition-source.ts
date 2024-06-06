"use server";

import { serviceAccount } from "@/config";
import { Duration } from "@/types/dashboard/app-usage";
import { getDateRange } from "../../utils";
import analytics from "../analytics";

export const getAcquisitionSource = async (duration: Duration) => {
  const range = getDateRange(duration);

  const [response] = await analytics.runReport({
    property: `properties/${serviceAccount.projectId}`,
    dateRanges: [
      {
        startDate: range.cur.start,
        endDate: range.cur.end,
      },
    ],
    dimensions: [{ name: "sessionManualSource" }],
    metrics: [{ name: "sessions" }],
  });

  const result =
    response.rows?.map((item) => ({
      label: item.dimensionValues?.[0]?.value,
      value: item.metricValues?.[0]?.value,
    })) ?? [];

  return {
    range,
    result,
  };
};
