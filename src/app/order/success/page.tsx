"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get("slug")
  const password = searchParams.get("password")

  return (
    <div style={{ maxWidth: 500, margin: "60px auto", padding: 20, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Cadeau créé !</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>
        Le site cadeau est prêt. Voici les informations à partager :
      </p>

      <div style={{ background: "#f5f5f5", padding: 20, borderRadius: 12, textAlign: "left", marginBottom: 24 }}>
        <p style={{ marginBottom: 12 }}>
          <strong>🔗 Lien du cadeau :</strong>
          <br />
          <code style={{ background: "#e8e8e8", padding: "4px 8px", borderRadius: 4, fontSize: 14 }}>
            {typeof window !== "undefined" ? window.location.origin : ""}/gift/{slug}
          </code>
        </p>
        <p>
          <strong>🔑 Mot de passe :</strong>
          <br />
          <code style={{ background: "#e8e8e8", padding: "4px 8px", borderRadius: 4, fontSize: 14 }}>
            {password}
          </code>
        </p>
      </div>

      <p style={{ color: "#999", fontSize: 13, marginBottom: 24 }}>
        Envoie ce lien et ce mot de passe à ton/ta proche pour qu'il/elle puisse découvrir son cadeau !
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link
          href={`/gift/${slug}`}
          style={{ padding: "10px 20px", background: "#333", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}
        >
          Voir le cadeau →
        </Link>
        <Link
          href="/dashboard"
          style={{ padding: "10px 20px", border: "1px solid #ccc", borderRadius: 8, textDecoration: "none", color: "#333", fontWeight: 600 }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", marginTop: 60 }}>Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
