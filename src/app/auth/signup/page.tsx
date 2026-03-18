"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LoginView } from "@/components/views/login-view"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [emailState, setEmailState] = useState("")
  const supabase = createClient()

  const handleSubmit = async (email: string, password: string, isLoginMode: boolean) => {
    setError(null)
    setEmailState(email)
    
    if (isLoginMode) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push("/dashboard")
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) setError(error.message)
      else setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card/70 p-8 text-center shadow-xl backdrop-blur-xl">
          <h1 className="font-serif text-3xl font-semibold mb-4 text-foreground">📧 Vérifiez votre email</h1>
          <p className="text-muted-foreground mb-8">
            Un email de confirmation a été envoyé à <strong>{emailState}</strong>.
            Cliquez sur le lien pour activer votre compte.
          </p>
          <Link href="/auth/login" className="inline-block rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90">
            Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return <LoginView initialMode="signup" onSubmitAction={handleSubmit} errorMessage={error} />
}
