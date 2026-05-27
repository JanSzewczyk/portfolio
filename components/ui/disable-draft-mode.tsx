"use client";

import { Button } from "@szum-tech/design-system/components/button";
import Link from "next/link";
import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool === true) {
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
