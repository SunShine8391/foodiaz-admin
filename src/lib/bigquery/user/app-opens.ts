"use server";

import { getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import bigquery from "../bigquery";

const projectd = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const getUserAppOpens = async (duration: Duration, userId: string) => {
  const range = getDateRange(duration);

  const [curJob] = await bigquery.createQueryJob({
    query: (
      `SELECT
        SUM(1) as value,
        DATE(TIMESTAMP_MICROS(event_timestamp)) as event_date,
      FROM
        \`${projectd}.analytics_437037520.events_*\`,
        UNNEST(event_params) as ep
      WHERE
        event_name = 'app_opened'
        AND ep.key = 'userId'
        AND ep.value.string_value = '${userId}'
        AND event_timestamp >= UNIX_MICROS(TIMESTAMP "${range.cur.start}")
        AND event_timestamp <= UNIX_MICROS(TIMESTAMP "${range.cur.end}")
      GROUP BY
        event_date`
    )
  });

  const [curRows] = await curJob.getQueryResults();

  return {
    range,
    result: curRows
  };
};
