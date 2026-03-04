import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/data/env/server";
import { createLogger } from "~/lib/logger";

const draftModeLogger = createLogger({ module: "api", endpoint: "/api/draft-mode/disable" });

export async function GET(request: NextRequest) {
  draftModeLogger.info("Draft mode disable requested");

  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== env.SANITY_REVALIDATE_SECRET) {
    draftModeLogger.warn("Draft mode disable denied due to invalid secret");
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  (await draftMode()).disable();

  draftModeLogger.info("Draft mode disabled, redirecting to home");
  return NextResponse.redirect(new URL("/", request.url));
}
