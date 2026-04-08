import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

/**
 * Stripe Webhook Handler
 *
 * Set up in Stripe Dashboard → Webhooks → Add endpoint:
 *   URL: https://your-domain.com/api/webhooks/stripe
 *   Events: checkout.session.completed
 *
 * Add STRIPE_WEBHOOK_SECRET to your env vars.
 *
 * When an enrollment is confirmed here, you should:
 *   1. Look up the user by email / metadata.userId
 *   2. Append courseSlug to their purchasedCourses field in your DB
 *   3. Optionally send a welcome email via Resend/SendGrid
 */
export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error"
    console.error("[webhook] Signature verification failed:", message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const courseSlug = session.metadata?.courseSlug
      const userId     = session.metadata?.userId

      console.log(
        `[webhook] Purchase confirmed — course: ${courseSlug}, user: ${userId}, amount: $${(session.amount_total ?? 0) / 100}`
      )

      /**
       * TODO: Grant access
       *
       * Example with Better Auth + SQLite:
       *
       * import Database from "better-sqlite3"
       * const db = new Database("./db.sqlite")
       * const user = db.prepare("SELECT * FROM user WHERE id = ?").get(userId)
       * const purchased = JSON.parse(user?.purchasedCourses || "[]")
       * if (!purchased.includes(courseSlug)) purchased.push(courseSlug)
       * db.prepare("UPDATE user SET purchasedCourses = ? WHERE id = ?")
       *   .run(JSON.stringify(purchased), userId)
       *
       * Then send a welcome email:
       * await sendEnrollmentEmail({ to: session.customer_email, courseSlug })
       */
      break
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent  // eslint-disable-line @typescript-eslint/no-unused-vars
      console.error("[webhook] Payment failed:", pi.id, pi.last_payment_error?.message)
      break
    }

    default:
      console.log("[webhook] Unhandled event type:", event.type)
  }

  return NextResponse.json({ received: true })
}
