"use client";

import { Button } from "@szum-tech/design-system";
import Link from "next/link";
import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Button asChild>
        <Link href="/api/draft-mode/disable">Disable Draft Mode</Link>
      </Button>
    </div>
  );
}
