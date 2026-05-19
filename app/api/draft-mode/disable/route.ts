import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createLogger } from "~/lib/logger";

const draftModeLogger = createLogger({
  module: "api",
  endpoint: "/api/draft-mode/disable",
});

export async function GET(request: NextRequest) {
  draftModeLogger.info("Draft mode disable requested");

  (await draftMode()).disable();

  draftModeLogger.info("Draft mode disabled, redirecting to home");
  return NextResponse.redirect(new URL("/", request.url));
}
