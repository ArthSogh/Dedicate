"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

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

  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [giftData, setGiftData] = useState<GiftData | null>(null)

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch("/api/gifts/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Erreur inconnue")
      setLoading(false)
      return
    }

    setGiftData(data.gift)
    setLoading(false)
  }

  // ── LOCKED STATE: PASSWORD FORM ──
  if (!giftData) {
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Un cadeau t'attend</h1>
        <p style={{ color: "#666", marginBottom: 24 }}>
          Entre le mot de passe pour découvrir ton cadeau.
        </p>

        {error && (
          <div style={{ background: "#fee", border: "1px solid #f88", padding: 12, borderRadius: 8, marginBottom: 16, color: "#c00" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleUnlock}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mot de passe"
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
              marginBottom: 12,
              textAlign: "center",
              fontSize: 16,
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: loading ? "#999" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {loading ? "Vérification..." : "Ouvrir le cadeau 🎁"}
          </button>
        </form>
      </div>
    )
  }

  // ── UNLOCKED STATE: DISPLAY GIFT ──
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 40px",
          background: giftData.template_id === "romantic" ? "#fff0f5" :
                      giftData.template_id === "birthday" ? "#fffbeb" : "#f8f8f8",
        }}
      >
        <p style={{ color: "#999", fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
          {giftData.template_id === "romantic" ? "💕 Un cadeau pour" :
           giftData.template_id === "birthday" ? "🎂 Joyeux anniversaire" : "✨ Pour toi"}
        </p>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>
          {giftData.recipient_name}
        </h1>
      </div>

      {/* Message */}
      {giftData.custom_message && (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 16,
              border: "1px solid #eee",
              fontSize: 18,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            {giftData.custom_message}
          </div>
        </div>
      )}

      {/* Photos */}
      {giftData.photos && giftData.photos.length > 0 && (
        <div style={{ maxWidth: 600, margin: "32px auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {giftData.photos.map((photo: string, i: number) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #eee" }}>
                <img
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "40px 20px", color: "#ccc", fontSize: 13 }}>
        Créé avec 🎁 GiftSite
      </div>
    </div>
  )
}
