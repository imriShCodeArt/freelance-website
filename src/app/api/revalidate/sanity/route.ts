import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import {
  type SanityWebhookDocument,
  revalidateForSanityDocument,
} from "@/lib/sanity/revalidate-published-tags";

/**
 * Sanity GROQ webhook (document changes). Configure in sanity.io/manage → API → Webhooks.
 *
 * - URL: `https://<host>/api/revalidate/sanity`
 * - Secret: same value as `SANITY_REVALIDATE_SECRET` (signing secret in the webhook form)
 * - Projection should include fields needed for routing, e.g.
 *   `{ _type, _id, locale, "slug": slug.current }`
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 503 },
    );
  }

  const { isValidSignature, body } = await parseBody<SanityWebhookDocument>(
    request,
    secret,
    true,
  );

  if (isValidSignature !== true) {
    return NextResponse.json({ ok: false, error: "Invalid webhook signature" }, { status: 401 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Empty or invalid body" }, { status: 400 });
  }

  if (!body._type) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing _type in webhook payload; add it to the GROQ projection (e.g. { _type, _id, locale, \"slug\": slug.current }).",
      },
      { status: 400 },
    );
  }

  const { tags, handled } = revalidateForSanityDocument(body);

  return NextResponse.json({
    ok: true,
    handled,
    revalidatedTags: tags,
    documentType: body._type ?? null,
  });
}
