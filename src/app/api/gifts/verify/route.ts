import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  const body = await request.json()
  const { slug, password } = body

  if (!slug || !password) {
    return NextResponse.json({ error: "Slug et mot de passe requis" }, { status: 400 })
  }

  const supabase = await createClient()

  // Get the gift by slug
  const { data: gift, error: giftError } = await supabase
    .from("gifts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .single()

  if (giftError || !gift) {
    return NextResponse.json({ error: "Cadeau introuvable ou expiré" }, { status: 404 })
  }

  // Verify password
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex")

  if (passwordHash !== gift.access_password_hash) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
  }

  // Get gift content
  const { data: content } = await supabase
    .from("gift_content")
    .select("*")
    .eq("gift_id", gift.id)
    .single()

  return NextResponse.json({
    success: true,
    gift: {
      recipient_name: gift.recipient_name,
      template_id: content?.template_id || "romantic",
      custom_message: content?.custom_message || "",
      photos: content?.photos || [],
      settings: content?.settings || {},
    },
  })
}
