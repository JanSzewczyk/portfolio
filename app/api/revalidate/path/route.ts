import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { env } from "~/data/env/server";
import { createLogger } from "~/lib/logger";
import { pingIndexNow } from "~/lib/seo/indexnow";

type WebhookPayload = { path?: string };

const revalidateLogger = createLogger({
  endpoint: "/api/revalidate/path",
  module: "api"
});

export async function POST(req: NextRequest) {
  revalidateLogger.info("Revalidate webhook received");

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = "Invalid signature";
      revalidateLogger.warn({ body, isValidSignature }, "Invalid webhook signature");
      return new Response(JSON.stringify({ body, isValidSignature, message }), {
        status: 401
      });
    }

    if (!body?.path) {
      const message = "Bad Request";
      revalidateLogger.warn({ body }, "Missing path in webhook payload");
      return new Response(JSON.stringify({ body, message }), { status: 400 });
    }

    revalidatePath(body.path);
    // Regenerate the statically-prerendered sitemap so its <lastmod> reflects this publish.
    revalidatePath("/sitemap.xml");

    // Proactively notify search engines so re-indexing is triggered on publish rather than
    // waiting for the next scheduled crawl. Best-effort — never blocks the revalidation result.
    await pingIndexNow([body.path]);

    const message = `Updated route: ${body.path}`;
    revalidateLogger.info({ path: body.path }, "Route revalidated successfully");
    return NextResponse.json({ body, message });
  } catch (err) {
    revalidateLogger.error({ err }, "Error during revalidation");
    return new Response((err as Error).message, { status: 500 });
  }
}
