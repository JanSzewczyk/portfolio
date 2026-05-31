import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createLogger } from "~/lib/logger";

const draftModeLogger = createLogger({
  endpoint: "/api/draft-mode/disable",
  module: "api"
});

export async function GET(request: NextRequest) {
  draftModeLogger.info("Draft mode disable requested");

  (await draftMode()).disable();

  draftModeLogger.info("Draft mode disabled, redirecting to home");
  return NextResponse.redirect(new URL("/", request.url));
}
