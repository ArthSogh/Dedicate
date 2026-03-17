"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function OrderPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    recipient_name: "",
    custom_message: "",
    access_password: "",
    template_id: "romantic",
    photos: [] as File[],
  })

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const uploadedUrls: string[] = []

    // 1. Upload photos to Supabase Storage if any
    if (form.photos.length > 0) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError("Vous devez être connecté pour créer un cadeau.")
        setLoading(false)
        return
      }

      for (const file of form.photos) {
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

    // 2. Create the gift via API
    const res = await fetch("/api/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient_name: form.recipient_name,
        custom_message: form.custom_message,
        access_password: form.access_password,
        template_id: form.template_id,
        photos: uploadedUrls,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Erreur inconnue")
      setLoading(false)
      return
    }

    // Redirect to Stripe Checkout or fallback to success page
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl
    } else {
      router.push(`/order/success?slug=${data.gift.slug}&password=${form.access_password}`)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>🎁 Créer un cadeau</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Remplis le formulaire pour générer un site cadeau unique.
      </p>

      {error && (
        <div style={{ background: "#fee", border: "1px solid #f88", padding: 12, borderRadius: 8, marginBottom: 16, color: "#c00" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Recipient Name */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            Prénom du/de la destinataire *
          </label>
          <input
            type="text"
            value={form.recipient_name}
            onChange={(e) => updateForm("recipient_name", e.target.value)}
            required
            placeholder="Ex: Marie"
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
          />
        </div>

        {/* Template */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            Template
          </label>
          <select
            value={form.template_id}
            onChange={(e) => updateForm("template_id", e.target.value)}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
          >
            <option value="romantic">💕 Romantique</option>
            <option value="birthday">🎂 Anniversaire</option>
            <option value="minimal">✨ Minimal</option>
          </select>
        </div>

        {/* Message */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            Message personnalisé
          </label>
          <textarea
            value={form.custom_message}
            onChange={(e) => updateForm("custom_message", e.target.value)}
            rows={4}
            placeholder="Écris ton message d'amour / d'amitié ici..."
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box", resize: "vertical" }}
          />
        </div>

        {/* Photos (File Upload) */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            Ajouter des photos (optionnel)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files)
                setForm(prev => ({ ...prev, photos: filesArray }))
              }
            }}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
          />
          {form.photos.length > 0 && (
            <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
              {form.photos.length} photo(s) sélectionnée(s).
            </p>
          )}
        </div>

        {/* Access Password */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            Mot de passe d'accès pour le/la destinataire *
          </label>
          <input
            type="text"
            value={form.access_password}
            onChange={(e) => updateForm("access_password", e.target.value)}
            required
            placeholder="Ex: jetaime2024"
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
          />
          <p style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
            Ce mot de passe sera nécessaire pour accéder au site cadeau.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            background: loading ? "#999" : "#333",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {loading ? "Création en cours..." : "Créer le cadeau 🎁"}
        </button>
      </form>

      <p style={{ marginTop: 16, textAlign: "center" }}>
        <a href="/dashboard" style={{ color: "#666" }}>← Retour au dashboard</a>
      </p>
    </div>
  )
}
