"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Connexion</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>Connecte-toi à ton compte GiftSite</p>

      {error && (
        <div style={{ background: "#fee", border: "1px solid #f88", padding: 12, borderRadius: 8, marginBottom: 16, color: "#c00" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
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
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8, boxSizing: "border-box" }}
            placeholder="••••••••"
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
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p style={{ marginTop: 16, textAlign: "center", color: "#666" }}>
        Pas de compte ?{" "}
        <Link href="/auth/signup" style={{ color: "#333", fontWeight: 600 }}>
          Créer un compte
        </Link>
      </p>
    </div>
  )
}
