"use server";

import { getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import bigquery from "../bigquery";

const projectd = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const getUserPopularFeatures = async (duration: Duration, userId: string) => {
  const range = getDateRange(duration);

  const [curJob] = await bigquery.createQueryJob({
    query: (
      `SELECT
        ep.value.string_value as label,
        SUM(1) as value
      FROM
        (
          SELECT
            *
          FROM
            \`${projectd}.analytics_437037520.events_*\`,
            UNNEST(event_params) AS nep
          WHERE
            event_name = 'popular_feature'
            AND nep.key = 'userId'
            AND nep.value.string_value = '${userId}'
            AND event_timestamp >= UNIX_MICROS(TIMESTAMP "${range.cur.start}")
            AND event_timestamp <= UNIX_MICROS(TIMESTAMP "${range.cur.end}")
        ),
        UNNEST(event_params) as ep
      WHERE
        ep.key = 'page_name'
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
