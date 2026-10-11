import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { env } from "~/data/env/server";
import { createLogger } from "~/lib/logger";

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
      revalidateLogger.withMetadata({ body, isValidSignature }).warn("Invalid webhook signature");
      return new Response(JSON.stringify({ body, isValidSignature, message }), {
        status: 401
      });
    }

    if (!body?.path) {
      const message = "Bad Request";
      revalidateLogger.withMetadata({ body }).warn("Missing path in webhook payload");
      return new Response(JSON.stringify({ body, message }), { status: 400 });
    }

    revalidatePath(body.path);
    // Regenerate the statically-prerendered sitemap so its <lastmod> reflects this publish.
    revalidatePath("/sitemap.xml");

    const message = `Updated route: ${body.path}`;
    revalidateLogger.withMetadata({ path: body.path }).info("Route revalidated successfully");
    return NextResponse.json({ body, message });
  } catch (err) {
    revalidateLogger.withError(err).error("Error during revalidation");
    return new Response((err as Error).message, { status: 500 });
  }
}
