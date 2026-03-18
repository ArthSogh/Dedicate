"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { WizardView } from "@/components/views/wizard-view"
import { useAppStore } from "@/lib/store"

export default function OrderPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { giftConfig, resetGiftConfig } = useAppStore()

  async function handleFinalize() {
    setLoading(true)
    setError(null)

    const uploadedUrls: string[] = []

    // 1. Upload photos to Supabase Storage if any
    if (giftConfig.images.length > 0) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError("Vous devez être connecté pour créer un cadeau.")
        setLoading(false)
        router.push("/auth/login")
        return
      }

      for (const file of giftConfig.images) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from("gift_photos")
          .upload(filePath, file)

        if (uploadError) {
          setError(`Erreur upload photo : ${uploadError.message}`)
          setLoading(false)
          return
        }

        const { data: { publicUrl } } = supabase.storage
          .from("gift_photos")
          .getPublicUrl(filePath)
          
        uploadedUrls.push(publicUrl)
      }
    }

    // Map v0's "tone" to our backend's template_id
    const templateMapping: Record<string, string> = {
      poetique: "romantic",
      minimaliste: "minimal",
      fun: "birthday",
      luxueux: "minimal"
    }

    const templateId = giftConfig.tone ? templateMapping[giftConfig.tone as string] || "romantic" : "romantic"
    const accessPassword = Math.random().toString(36).substring(2, 10)

    // 2. Create the gift via API
    const res = await fetch("/api/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient_name: giftConfig.recipientName || "Inconnu",
        custom_message: giftConfig.message || "Un message spécial",
        access_password: accessPassword,
        template_id: templateId,
        photos: uploadedUrls,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Erreur inconnue")
      setLoading(false)
      return
    }

    resetGiftConfig()

    // Redirect to Stripe Checkout or fallback to success page
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl
    } else {
      router.push(`/order/success?slug=${data.gift.slug}&password=${accessPassword}`)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-coral border-t-transparent" />
          <p className="font-serif text-2xl font-semibold text-foreground">Préparation de votre écrin...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-600 shadow-xl">
          {error}
        </div>
      )}
      <WizardView 
        onBack={() => router.push("/dashboard")} 
        onFinalize={handleFinalize} 
      />
    </>
  )
}

