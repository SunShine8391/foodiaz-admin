import { getUserCount } from "@/lib/ga";
import { Duration } from "@/types/dashboard/app-usage";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const duration = search.get("duration");

  if (duration === null) {
    return NextResponse.error();
  }

  return NextResponse.json(await getUserCount(duration as Duration));
}
