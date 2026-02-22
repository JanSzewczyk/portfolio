import * as React from "react";

import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "~/components/ui/disable-draft-mode";
import { SanityLive } from "~/lib/sanity/live";

export default async function Layout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <React.Fragment>
      {children}

      {/* Sanity Live Content API - enables real-time updates */}
      <SanityLive />
      {/* Visual Editing overlays - only in draft mode */}
      {isDraftMode ? (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      ) : null}
    </React.Fragment>
  );
}
