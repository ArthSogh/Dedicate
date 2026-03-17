import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LogoutButton from "./LogoutButton"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's gifts from DB
  const { data: gifts, error } = await supabase
    .from("gifts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 24 }}>Dashboard</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <LogoutButton />
        </div>
      </div>

      {/* User info */}
      <div style={{ background: "#f5f5f5", padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <p><strong>Statut :</strong> ✅ Connecté</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>User ID :</strong> <code style={{ fontSize: 12 }}>{user.id}</code></p>
      </div>

      {/* Create gift CTA */}
      <Link
        href="/order"
        style={{
          display: "block",
          textAlign: "center",
          padding: 16,
          background: "#333",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        + Créer un nouveau cadeau 🎁
      </Link>

      {/* Gifts list */}
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Mes cadeaux ({gifts?.length || 0})</h2>
      {error && (
        <div style={{ background: "#fee", padding: 12, borderRadius: 8, color: "#c00", marginBottom: 12 }}>
          Erreur : {error.message}
        </div>
      )}
      {(!gifts || gifts.length === 0) ? (
        <p style={{ color: "#999" }}>Aucun cadeau créé pour le moment. Clique sur le bouton ci-dessus pour commencer !</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {gifts.map((gift: any) => (
            <li key={gift.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: 16 }}>{gift.recipient_name}</strong>
                  <br />
                  <span style={{ fontSize: 13, color: "#666" }}>
                    Statut : {gift.status} · Créé le {new Date(gift.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <Link
                  href={`/gift/${gift.slug}`}
                  style={{
                    padding: "6px 12px",
                    background: "#f5f5f5",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontSize: 13,
                    color: "#333",
                  }}
                >
                  Voir →
                </Link>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>
                URL : <code>/gift/{gift.slug}</code>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Debug links */}
      <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid #eee" }}>
        <h3 style={{ fontSize: 14, color: "#999", marginBottom: 8 }}>🔧 Navigation</h3>
        <ul style={{ fontSize: 13, color: "#666" }}>
          <li><a href="/">← Retour à l'accueil</a></li>
          <li><a href="/order">Créer un cadeau</a></li>
        </ul>
      </div>
    </div>
  )
}
