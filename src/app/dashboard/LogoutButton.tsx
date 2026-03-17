"use client"

import { createClient } from "@/lib/supabase/client"

export default function LogoutButton() {
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        background: "#eee",
        border: "1px solid #ccc",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 13,
      }}
    >
      Se déconnecter
    </button>
  )
}
