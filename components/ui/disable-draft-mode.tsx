"use client";

import { Button } from "@szum-tech/design-system";
import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  console.log("Environment: ", environment || "unknown");

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Button asChild>
        <a href="/api/draft-mode/disable">Disable Draft Mode</a>
      </Button>
    </div>
  );
}
