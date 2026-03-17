import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: 20, textAlign: "center" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>🎁 GiftSite</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>
        Offrez un site web personnalisé à votre proche.
      </p>

      {user ? (
        <div>
          <p style={{ marginBottom: 16 }}>
            ✅ Connecté en tant que <strong>{user.email}</strong>
          </p>
          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#333",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Aller au Dashboard →
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/auth/login"
            style={{
              padding: "12px 24px",
              background: "#333",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Se connecter
          </Link>
          <Link
            href="/auth/signup"
            style={{
              padding: "12px 24px",
              background: "#fff",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Créer un compte
          </Link>
        </div>
      )}

      {/* Debug info */}
      <div style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #eee", fontSize: 12, color: "#999" }}>
        <p>🔧 Mode test — Frontend simplifié pour valider le backend</p>
        <p>Routes : <code>/</code> · <code>/auth/login</code> · <code>/auth/signup</code> · <code>/dashboard</code></p>
      </div>
    </div>
  )
}
