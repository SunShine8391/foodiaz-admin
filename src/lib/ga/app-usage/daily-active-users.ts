"use server";

import { serviceAccount } from "@/config";
import { Duration } from "@/types/dashboard/app-usage";
import { getDateRange, getDaysArray, insertHyphenDateString } from "../../utils";
import analytics from "../analytics";

export const getDailyActiveUsers = async (duration: Duration) => {
  const range = getDateRange(duration);

  const [response] = await analytics.runReport({
    property: `properties/${serviceAccount.projectId}`,
    dateRanges: [
      {
        startDate: range.cur.start,
        endDate: range.cur.end,
      },
    ],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "activeUsers" }],
    orderBys: [
      {
        dimension: {
          dimensionName: "date",
        },
      },
    ],
  });

  const labels = response.rows?.map((item) => item.dimensionValues?.at(0)?.value ?? "") ?? [];
  const data = response.rows?.map((item) => parseInt(item.metricValues?.at(0)?.value ?? "0")) ?? [];

  let addLabels: string[] = [];
  let addData: number[] = [];
  if (labels[0] !== undefined) {
    let additionals= getDaysArray(range.cur.start, insertHyphenDateString(labels[0]));
    addData = Array.from({ length: additionals.length }, _ => 0);
    addLabels = additionals.map(item => item.toISOString().slice(0, 10));
  }

  return {
    range: range.cur,
    labels: [ ...addLabels, ...labels ],
    data: [ ...addData, ...data ],
  };
};
