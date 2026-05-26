import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import * as React from "react";
import { DisableDraftMode } from "~/components/ui/disable-draft-mode";

// SanityLive subscribes to the Live Content API in the browser, which ships
// @sanity/client + rxjs into the client bundle. Published content on this
// portfolio does not need real-time refresh for anonymous visitors, so the
// component is loaded lazily and only mounted in draft mode (alongside the
// editing overlays). This keeps the live-content JS out of the initial bundle
// for everyone else, reducing LCP element render delay.
const SanityLive = dynamic(() => import("~/lib/sanity/live").then((m) => m.SanityLive));

export default async function Layout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <React.Fragment>
      {children}

      {/* Live updates + Visual Editing overlays - only in draft mode */}
      {isDraftMode ? (
        <React.Fragment>
          <SanityLive />
          <DisableDraftMode />
          <VisualEditing />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
