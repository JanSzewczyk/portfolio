import * as React from "react";

import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "~/components/ui/disable-draft-mode";
import { env } from "~/data/env/server";
import { SanityLive } from "~/lib/sanity/live";

export default async function Layout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();
  const disableDraftModeUrl = `/api/draft-mode/disable?secret=${encodeURIComponent(env.SANITY_REVALIDATE_SECRET)}`;

  return (
    <React.Fragment>
      {children}

      {/* Sanity Live Content API - enables real-time updates */}
      <SanityLive />
      {/* Visual Editing overlays - only in draft mode */}
      {isDraftMode ? (
        <>
          <DisableDraftMode disableUrl={disableDraftModeUrl} />
          <VisualEditing />
        </>
      ) : null}
    </React.Fragment>
  );
}
