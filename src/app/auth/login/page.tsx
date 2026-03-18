"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LoginView } from "@/components/views/login-view"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (email: string, password: string, isLoginMode: boolean) => {
    setError(null)
    if (isLoginMode) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push("/dashboard")
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else router.push("/dashboard")
    }
  }

  return <LoginView initialMode="login" onSubmitAction={handleSubmit} errorMessage={error} />
}

