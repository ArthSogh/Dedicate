"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { 
  Check, Copy, ExternalLink, Share2, Mail, MessageCircle,
  Gift, Sparkles, ArrowRight, Lock
} from "lucide-react"

interface SuccessViewProps {
  slug: string
  password?: string
}

export function SuccessView({ slug, password }: SuccessViewProps) {
  const router = useRouter()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedPass, setCopiedPass] = useState(false)
  const [giftUrl, setGiftUrl] = useState(`https://dedicate.gift/${slug}`)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGiftUrl(`${window.location.origin}/gift/${slug}`)
    }
  }, [slug])

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(giftUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleCopyPass = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      setCopiedPass(true)
      setTimeout(() => setCopiedPass(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
          >
            <Sparkles className="h-4 w-4 text-coral/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {/* Success Card */}
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"
            >
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Cadeau prêt !
              </h1>
              <p className="mt-2 text-muted-foreground">
                Votre création est enregistrée et prête à être partagée.
              </p>
            </motion.div>

            {/* Links and Passwords */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Lien de votre cadeau
                </label>
                <div className="flex gap-2">
                  <Input
                    value={giftUrl}
                    readOnly
                    className="h-12 bg-soft-bg text-sm font-mono"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="h-12 w-12 shrink-0 border-border"
                  >
                    {copiedLink ? (
                      <Check className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              {password && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Mot de passe pour le destinataire
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={password}
                      readOnly
                      className="h-12 bg-soft-bg text-sm font-mono tracking-widest"
                    />
                    <Button
                      onClick={handleCopyPass}
                      variant="outline"
                      className="h-12 w-12 shrink-0 border-border"
                    >
                      {copiedPass ? (
                        <Check className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <label className="mb-3 block text-sm font-medium text-foreground text-center">
                Partager avec votre proche
              </label>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 gap-2 border-border"
                  onClick={() => window.open(`mailto:?subject=Un cadeau pour toi&body=Voici ton cadeau: ${giftUrl} (Mot de passe: ${password})`, "_blank")}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 gap-2 border-border"
                  onClick={() => window.open(`https://wa.me/?text=Un cadeau pour toi: ${giftUrl} (Mot de passe: ${password})`, "_blank")}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-12 shrink-0 border-border"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Un cadeau pour toi", url: giftUrl, text: `Mot de passe: ${password}` })
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 space-y-3 pt-6 border-t border-border"
            >
              <Button
                onClick={() => router.push(`/gift/${slug}`)}
                className="h-12 w-full gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                <ExternalLink className="h-4 w-4" />
                Voir le cadeau
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => router.push('/dashboard')}
                  variant="outline"
                  className="h-12 gap-2 rounded-xl border-border"
                >
                  <Gift className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  onClick={() => router.push('/order')}
                  variant="outline"
                  className="h-12 gap-2 rounded-xl border-border"
                >
                  <ArrowRight className="h-4 w-4" />
                  Nouveau cadeau
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
