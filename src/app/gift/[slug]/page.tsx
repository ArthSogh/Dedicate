"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { GiftLockedView } from "@/components/views/gift-locked-view"
import { GiftUnlockedView } from "@/components/views/gift-unlocked-view"

interface GiftData {
  recipient_name: string
  template_id: string
  custom_message: string
  photos: string[]
  settings: Record<string, unknown>
}

export default function GiftPage() {
  const params = useParams()
  const slug = params.slug as string
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [giftData, setGiftData] = useState<GiftData | null>(null)

  async function handleUnlock(password: string) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/gifts/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Mot de passe incorrect")
        setLoading(false)
        return
      }

      setGiftData(data.gift)
    } catch (e: any) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (!giftData) {
    return <GiftLockedView onUnlock={handleUnlock} error={error} isLoading={loading} />
  }

  return <GiftUnlockedView giftData={giftData} />
}

