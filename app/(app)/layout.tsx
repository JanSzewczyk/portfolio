import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import * as React from "react";
import { DisableDraftMode } from "~/components/ui/disable-draft-mode";

const SanityLive = dynamic(() => import("~/lib/sanity/live").then((m) => m.SanityLive));

export default async function Layout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <React.Fragment>
      {children}

      <SanityLive includeDrafts={isDraftMode} />
      {isDraftMode ? (
        <React.Fragment>
          <DisableDraftMode />
          <VisualEditing />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
