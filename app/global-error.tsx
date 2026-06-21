"use client";

import { Button } from "@szum-tech/design-system/components/button";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Client error boundary — log to the browser console. The server-side Pino logger must NOT be
    // imported here: it pulls Pino into the client bundle and does not run in the browser.
    // biome-ignore lint/suspicious/noConsole: client error boundary logs to the browser console
    console.error("Global error occurred", {
      digest: error.digest,
      message: error.message,
      stack: error.stack
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-2xl">Something went wrong!</h2>
            <p className="mb-4 text-gray-600">A critical error has occurred.</p>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
