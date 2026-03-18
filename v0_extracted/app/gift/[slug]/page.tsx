"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data - in production this would come from database
const mockGiftData: Record<string, { recipientName: string; password: string }> = {
  "demo": { recipientName: "Marie", password: "love2024" },
  "sample": { recipientName: "Thomas", password: "secret" },
}

export default function GiftPage({ params }: { params: Promise<{ slug: string }> }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [slug, setSlug] = useState<string | null>(null)
  
  // Unwrap params
  useState(() => {
    params.then(p => setSlug(p.slug))
  })

  const giftData = slug ? mockGiftData[slug] : null
  const recipientName = giftData?.recipientName || "vous"

  const handleUnlock = async () => {
    if (!password.trim()) {
      setError("Veuillez entrer le mot de passe")
      return
    }

    setIsUnlocking(true)
    setError("")

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (giftData && password === giftData.password) {
      // Redirect to unlocked gift page
      window.location.href = `/gift/${slug}/unlocked`
    } else {
      setError("Mot de passe incorrect. Réessayez.")
      setIsUnlocking(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
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
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full opacity-25 blur-[90px]"
            style={{
              background: "linear-gradient(135deg, #F0E5D5 0%, #DDD0B8 100%)",
              top: "20%",
              left: "50%",
            }}
            animate={{
              x: [0, -50, 25, 0],
              y: [0, 40, -20, 0],
              scale: [1, 0.95, 1.1, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div 
          className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-10 shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-white/50"
        >
          {/* Subtle inner glow */}
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
                className="w-20 h-20 rounded-full bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center"
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
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Lock className="w-9 h-9 text-foreground/80" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
              
              {/* Sparkle accents */}
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
                <Sparkles className="w-5 h-5 text-warm-gray" />
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
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Entrez le mot de passe secret"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUnlock()
                  }}
                  className="w-full h-14 px-5 text-center text-lg bg-white/60 border-cream-dark/30 rounded-xl focus:border-warm-gray focus:ring-warm-gray/20 placeholder:text-muted-foreground/50"
                />
              </div>
              
              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500/80 mt-3"
                >
                  {error}
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
                disabled={isUnlocking}
                className="w-full h-14 text-lg font-medium bg-foreground hover:bg-foreground/90 text-background rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10 disabled:opacity-70"
              >
                {isUnlocking ? (
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
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

            {/* Hint */}
            <motion.p
              className="text-xs text-muted-foreground/60 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Le mot de passe vous a été transmis par l&apos;expéditeur
            </motion.p>
          </div>
        </div>

        {/* Decorative bottom reflection */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/5 rounded-full blur-xl" />
      </motion.div>

      {/* Dedicate Branding */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="text-sm text-muted-foreground/50 tracking-widest font-medium">
          DEDICATE
        </p>
      </motion.div>
    </main>
  )
}
