"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Client error boundary — log to the browser console. The server-side Pino logger must NOT be
    // imported here: it pulls Pino into the client bundle and does not run in the browser.
    // biome-ignore lint/suspicious/noConsole: client error boundary logs to the browser console
    console.error("Application error occurred", {
      digest: error.digest,
      message: error.message,
      stack: error.stack
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 font-bold text-2xl">Something went wrong!</h2>
        <p className="mb-4 text-gray-600">An unexpected error has occurred.</p>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => reset()}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
