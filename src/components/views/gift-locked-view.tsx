"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Sparkles, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GiftLockedViewProps {
  onUnlock: (password: string) => Promise<void>
  error?: string | null
  isLoading?: boolean
}

export function GiftLockedView({ onUnlock, error: externalError, isLoading }: GiftLockedViewProps) {
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState("")

  const recipientName = "vous"
  const displayError = localError || externalError

  const handleUnlock = async () => {
    if (!password.trim()) {
      setLocalError("Veuillez entrer le mot de passe")
      return
    }
    setLocalError("")
    await onUnlock(password)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-40 blur-[120px]"
            style={{
              background: "linear-gradient(135deg, #E8D5B7 0%, #F5E6D3 50%, #D4C4A8 100%)",
              top: "-10%",
              left: "-10%",
            }}
            animate={{
              x: [0, 100, 50, 0],
              y: [0, 50, 100, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]"
            style={{
              background: "linear-gradient(135deg, #C9B896 0%, #E5D6C1 50%, #B8A67C 100%)",
              top: "40%",
              right: "-5%",
            }}
            animate={{
              x: [0, -80, -40, 0],
              y: [0, 80, 40, 0],
              scale: [1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full opacity-35 blur-[110px]"
            style={{
              background: "linear-gradient(135deg, #D9C9A8 0%, #EDE4D4 50%, #C4B494 100%)",
              bottom: "-5%",
              left: "30%",
            }}
            animate={{
              x: [0, 60, -30, 0],
              y: [0, -60, -30, 0],
              scale: [1, 1.08, 0.92, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-50"
      >
        <Link href="/">
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-white/30 bg-white/70 backdrop-blur-lg hover:bg-white/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </motion.div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-10 shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-white/50">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative flex flex-col items-center text-center">
            {/* Animated Lock Icon */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-soft-bg to-muted flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(200, 180, 150, 0)",
                    "0 0 0 15px rgba(200, 180, 150, 0.15)",
                    "0 0 0 0 rgba(200, 180, 150, 0)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Lock className="w-9 h-9 text-foreground/80" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
              
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5 h-5 text-coral" />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-3">
                Cadeau Privé
              </p>
              <h1 className="font-serif text-2xl md:text-3xl text-foreground leading-tight mb-2">
                Un cadeau spécial vous attend,
              </h1>
              <p className="font-serif text-3xl md:text-4xl text-foreground font-medium">
                {recipientName}
              </p>
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="w-full mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Input
                type="password"
                placeholder="Entrez le mot de passe secret"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLocalError("") }}
                onKeyDown={(e) => { if (e.key === "Enter") handleUnlock() }}
                className="w-full h-14 px-5 text-center text-lg bg-white/60 border-border rounded-xl focus:border-coral focus:ring-coral/20 placeholder:text-muted-foreground/50"
              />
              
              {displayError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500/80 mt-3"
                >
                  {displayError}
                </motion.p>
              )}
            </motion.div>

            {/* Unlock Button */}
            <motion.div
              className="w-full mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button
                onClick={handleUnlock}
                disabled={isLoading}
                className="w-full h-14 text-lg font-medium bg-foreground hover:bg-foreground/90 text-background rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10 disabled:opacity-70"
              >
                {isLoading ? (
                  <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div
                      className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Déverrouillage...</span>
                  </motion.div>
                ) : (
                  "Déverrouiller le secret"
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/5 rounded-full blur-xl" />
      </motion.div>

      {/* Branding */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="text-sm text-muted-foreground/50 tracking-widest font-medium">DEDICATE</p>
      </motion.div>
    </motion.main>
  )
}
