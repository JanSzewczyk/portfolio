"use client";

import { Button } from "@szum-tech/design-system";
import Link from "next/link";
import { useIsPresentationTool } from "next-sanity/hooks";

type DisableDraftModeProps = {
  disableUrl: string;
};

export function DisableDraftMode({ disableUrl }: DisableDraftModeProps) {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool === true) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Button asChild>
        <Link href={disableUrl}>Disable Draft Mode</Link>
      </Button>
    </div>
  );
}
