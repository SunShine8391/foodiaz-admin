"use server";

import { getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import bigquery from "../bigquery";

const projectd = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const getRageTaps = async (duration: Duration) => {
  const range = getDateRange(duration);

  const [curJob] = await bigquery.createQueryJob({
    query: (
      `SELECT
        ep.value.string_value as page_name,
        SUM(1) as value
      FROM
        \`${projectd}.analytics_437037520.events_*\`,
        UNNEST(event_params) as ep
      WHERE
        event_name = 'rage_taps'
        AND ep.key = 'page_name'
        AND event_timestamp >= UNIX_MICROS(TIMESTAMP "${range.cur.start}")
        AND event_timestamp <= UNIX_MICROS(TIMESTAMP "${range.cur.end}")
      GROUP BY
        ep.value.string_value`
    )
  });

  const [curRows] = await curJob.getQueryResults();

  return {
    range,
    result: curRows
  };
};
