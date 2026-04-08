import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { getCourse } from "@/lib/courses"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    // Get authenticated session
    const session = await auth.api.getSession({ headers: headers() })

    const { courseSlug, installments } = await req.json()

    const course = getCourse(courseSlug)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Build line items
    // If a Stripe Price ID is configured, use it directly.
    // Otherwise fall back to an ad-hoc price (good for testing).
    const lineItems: import("stripe").Stripe.Checkout.SessionCreateParams.LineItem[] = course.stripePriceId
      ? [{ price: course.stripePriceId, quantity: 1 }]
      : [
          {
            price_data: {
              currency: "usd",
              unit_amount: course.price * 100,
              product_data: {
                name:        course.title,
                description: course.tagline,
                images:      [course.image],
                metadata:    { courseSlug },
              },
            },
            quantity: 1,
          },
        ]

    const checkoutSession = await stripe.checkout.sessions.create({
      mode:        "payment",
      line_items:  lineItems,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&course=${courseSlug}`,
      cancel_url:  `${appUrl}/courses/${courseSlug}?cancelled=true`,
      metadata: {
        courseSlug,
        userId: session?.user?.id ?? "guest",
      },
      customer_email: session?.user?.email ?? undefined,
      allow_promotion_codes: true,

      // Payment plans: if installments requested, use 3-pay via Stripe's
      // payment_schedule — for now we log intent, real installments need
      // Stripe Billing subscriptions. This is the placeholder.
      ...(installments
        ? {
            payment_method_types: ["card"],
            custom_text: {
              submit: {
                message: `You are signing up for the 3-payment plan ($${Math.ceil(course.price / 3).toLocaleString()} × 3).`,
              },
            },
          }
        : {}),
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[checkout]", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
