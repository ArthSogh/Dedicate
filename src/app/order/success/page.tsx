"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SuccessView } from "@/components/views/success-view"

function SuccessContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get("slug")
  const password = searchParams.get("password")

  if (!slug) {
    return <div className="text-center mt-20">Paramètres manquants.</div>
  }

  return <SuccessView slug={slug} password={password || undefined} />
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", marginTop: 60 }}>Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
