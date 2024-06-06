"use server";

import { devide, getDateRange } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import bigquery from "../bigquery";

export const getUserAvgSessionDuration = async (duration: Duration, userId: string) => {
  const range = getDateRange(duration);

  const [curJob] = await bigquery.createQueryJob({
    query: (
      `SELECT
        SUM(CAST(ep.value.string_value AS INT64)) as sum
      FROM
        (
          SELECT
            DATE(TIMESTAMP_MICROS(event_timestamp)) as event_date,
            event_params, event_param.value.string_value as userId
          FROM
            \`foodiaz-e2575.analytics_437037520.events_*\`,
            UNNEST(event_params) AS event_param
          WHERE
            event_name="app_session"
            AND event_timestamp >= UNIX_MICROS(TIMESTAMP "${range.cur.start}")
            AND event_timestamp <= UNIX_MICROS(TIMESTAMP "${range.cur.end}")
            AND event_param.key = "userId"
            AND event_param.value.string_value = '${userId}'
        ),
        UNNEST(event_params) as ep
      WHERE
        ep.key = 'duration_in_seconds'
      GROUP BY userId`
    )
  });

  const [prevJob] = await bigquery.createQueryJob({
    query: (
      `SELECT
        SUM(CAST(ep.value.string_value AS INT64)) as sum
      FROM
        (
          SELECT
            DATE(TIMESTAMP_MICROS(event_timestamp)) as event_date,
            event_params, event_param.value.string_value as userId
          FROM
            \`foodiaz-e2575.analytics_437037520.events_*\`,
            UNNEST(event_params) AS event_param
          WHERE
            event_name="app_session"
            AND event_timestamp >= UNIX_MICROS(TIMESTAMP "${range.prev.start}")
            AND event_timestamp <= UNIX_MICROS(TIMESTAMP "${range.prev.end}")
            AND event_param.key = "userId"
            AND event_param.value.string_value = '${userId}'
        ),
        UNNEST(event_params) as ep
      WHERE
        ep.key = 'duration_in_seconds'
      GROUP BY userId`
    )
  });

  const [curRows] = await curJob.getQueryResults();
  const [prevRows] = await prevJob.getQueryResults();

  const curValue = curRows[0]?.sum ?? 0;
  const prevValue = prevRows[0]?.sum ?? 0;

  return {
    range,
    curValue,
    prevRows,
    rateChange: devide(curValue, prevValue)
  };
};
