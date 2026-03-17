"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", padding: 20, textAlign: "center" }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>📧 Vérifie ton email</h1>
        <p style={{ color: "#666" }}>
          Un email de confirmation a été envoyé à <strong>{email}</strong>.
          Clique sur le lien dans l'email pour activer ton compte.
        </p>
        <Link href="/auth/login" style={{ display: "inline-block", marginTop: 16, color: "#333", fontWeight: 600 }}>
          Retour à la connexion
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Créer un compte</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>Inscris-toi pour offrir un cadeau digital</p>

      {error && (
        <div style={{ background: "#fee", border: "1px solid #f88", padding: 12, borderRadius: 8, marginBottom: 16, color: "#c00" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
            placeholder="ton@email.com"
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
            placeholder="Minimum 6 caractères"
          />
        </div>

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
          }}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>

      <p style={{ marginTop: 16, textAlign: "center", color: "#666" }}>
        Déjà un compte ?{" "}
        <Link href="/auth/login" style={{ color: "#333", fontWeight: 600 }}>
          Se connecter
        </Link>
      </p>
    </div>
  )
}
