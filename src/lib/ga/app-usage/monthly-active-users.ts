"use server";

import { serviceAccount } from "@/config";
import { Months } from "@/types/dashboard/app-usage";
import { getMonthRange, getMonthsArray, insertHyphenYearMonth } from "../../utils";
import analytics from "../analytics";

export const getMonthlyActiveUsers = async (months: Months) => {
  const range = getMonthRange(months);

  const [response] = await analytics.runReport({
    property: `properties/${serviceAccount.projectId}`,
    dateRanges: [
      {
        startDate: range.startDate,
        endDate: range.endDate,
      },
    ],
    dimensions: [{ name: "yearMonth" }],
    metrics: [{ name: "activeUsers" }],
    orderBys: [
      {
        dimension: {
          dimensionName: "yearMonth",
        },
      },
    ],
  });

  const labels = response.rows?.map((item) => item.dimensionValues?.at(0)?.value ?? "") ?? [];
  const data = response.rows?.map((item) => parseInt(item.metricValues?.at(0)?.value ?? "0")) ?? [];

  let addLabels: string[] = [];
  let addData: number[] = [];
  if (labels[0] !== undefined) {
    let additionals = getMonthsArray(range.startDate, insertHyphenYearMonth(labels[0]));
    addData = Array.from({ length: additionals.length }, (_) => 0);
    addLabels = additionals.map((item) => item.toISOString().slice(0, 7));
  }

  return {
    range: range.startDate.substring(0, 7) + " - " + range.endDate.substring(0, 7),
    labels: [...addLabels, ...labels],
    data: [...addData, ...data],
  };
};
