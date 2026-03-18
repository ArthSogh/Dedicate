import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.text()
  const sig = (await headers()).get("Stripe-Signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err: any) {
    console.error("Webhook Error:", err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any

    // Retrieve the gift ID from the client_reference_id
    const giftId = session.client_reference_id

    if (giftId) {
      const supabase = await createClient()

      // Mettre à jour le statut du cadeau pour l'activer
      const { error } = await supabase
        .from("gifts")
        .update({ status: "active" })
        .eq("id", giftId)

      if (error) {
        console.error("Erreur lors de l'activation du cadeau :", error.message)
        return NextResponse.json({ error: "Database update failed" }, { status: 500 })
      }
      
      console.log(`Cadeau ${giftId} activé avec succès suite au paiement !`)
    }
  }

  return NextResponse.json({ received: true })
}
