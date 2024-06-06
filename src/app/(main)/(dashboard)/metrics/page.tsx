"use client";

import { useEffect, useState } from "react";
import DatabaseMetricsDesktop from "@/components/views/dashboard/Metrics/databaseMetricsDesktop";
import DatabaseMetricsMobile from "@/components/views/dashboard/Metrics/databaseMetricsMobile";
import { DatabaseMetricsType } from '@/types/dashboard';
import { fetchData } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

export default function MetricsPage() {
  const [databaseMetrics, setDatabaseMetrics] = useState<DatabaseMetricsType>(null);

  useEffect(() => {
    fetchData(`${BASE_URL}/Admin/DatabaseMetrics`).then((res) => {
      if (res.Success && res.Result.Metrics[0]) {
        setDatabaseMetrics(res.Result.Metrics[0]);
      }
    });
  }, []);

  return (
    <>
      <div className="hidden sm:block">
        <DatabaseMetricsDesktop databaseMetrics={databaseMetrics} />
      </div>
      <div className="block sm:hidden">
        <DatabaseMetricsMobile databaseMetrics={databaseMetrics} />
      </div>
    </>
  );
}
