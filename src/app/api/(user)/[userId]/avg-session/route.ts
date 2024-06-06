import { getUserAvgSessionDuration } from "@/lib/bigquery";
import { Duration } from "@/types/dashboard/app-usage";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { userId } }: {
  params: {
    userId: string
  }
}) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const duration = search.get("duration");

  if (duration === null) {
    return NextResponse.error();
  }

  return NextResponse.json(await getUserAvgSessionDuration(duration as Duration, userId));
}
