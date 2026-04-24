// app/api/webhooks/lemonsqueezy/route.ts
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const VARIANTS = {
  [process.env.NEXT_PUBLIC_LS_VARIANT_JOB_STANDARD!]: "standard",
  [process.env.NEXT_PUBLIC_LS_VARIANT_JOB_FEATURED!]: "featured",
  [process.env.NEXT_PUBLIC_LS_VARIANT_BASIC!]: "basic",
  [process.env.NEXT_PUBLIC_LS_VARIANT_PREMIUM!]: "premium",
  [process.env.NEXT_PUBLIC_LS_VARIANT_ENTERPRISE!]: "enterprise",
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  // 1. Verify signature
  const secret = process.env.LS_WEBHOOK_SECRET!;
  const hash = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.meta.event_name;

  // 2. Handle order_created
  if (event === "order_created") {
    const attrs = payload.data.attributes;
    const email = attrs.user_email;
    const orderId = String(payload.data.id);
    const variantId = String(attrs.first_order_item.variant_id);
    const planType = (VARIANTS as Record<string, string>)[variantId] ?? "standard";

    // 3. تفعيل الـ listing في Supabase
    const { error } = await supabase
      .from("job_listings")
      .update({
        status: "active",
        plan: planType,
        activated_at: new Date().toISOString(),
        order_id: orderId,
      })
      .eq("contact_email", email)
      .eq("status", "pending");

    if (error) {
      console.error("Supabase error:", error);
      return new Response("DB Error", { status: 500 });
    }
  }

  // 4. Handle refund — deactivate listing
  if (event === "order_refunded") {
    const orderId = String(payload.data.id);

    await supabase
      .from("job_listings")
      .update({ status: "inactive" })
      .eq("order_id", orderId);
  }

  return new Response("OK", { status: 200 });
}