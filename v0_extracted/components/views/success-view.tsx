"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Check, Copy, ExternalLink, Share2, Mail, MessageCircle,
  Gift, Sparkles, ArrowRight
} from "lucide-react"
import { useAppStore } from "@/lib/store"

export function SuccessView() {
  const { giftData, currentGiftSlug, setView, resetGiftData } = useAppStore()
  const [copied, setCopied] = useState(false)

  const giftUrl = `https://dedicate.gift/${currentGiftSlug || "preview"}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(giftUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePreview = () => {
    setView("gift-locked")
  }

  const handleDashboard = () => {
    resetGiftData()
    setView("dashboard")
  }

  const handleNewGift = () => {
    resetGiftData()
    setView("wizard")
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
                Paiement confirmé !
              </h1>
              <p className="mt-2 text-muted-foreground">
                Votre cadeau pour {giftData.recipientName} est prêt
              </p>
            </motion.div>

            {/* Gift Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <label className="mb-2 block text-sm font-medium text-foreground">
                Lien de votre cadeau
              </label>
              <div className="flex gap-2">
                <Input
                  value={giftUrl}
                  readOnly
                  className="h-12 bg-soft-bg text-sm"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="h-12 w-12 shrink-0 border-border"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-emerald-600"
                >
                  Lien copié !
                </motion.p>
              )}
            </motion.div>

            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <label className="mb-3 block text-sm font-medium text-foreground">
                Partager via
              </label>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 gap-2 border-border"
                  onClick={() => window.open(`mailto:?subject=Un cadeau pour toi&body=Voici ton cadeau: ${giftUrl}`, "_blank")}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 gap-2 border-border"
                  onClick={() => window.open(`https://wa.me/?text=Un cadeau pour toi: ${giftUrl}`, "_blank")}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-12 shrink-0 border-border"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Un cadeau pour toi", url: giftUrl })
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
              className="mt-8 space-y-3"
            >
              <Button
                onClick={handlePreview}
                className="h-12 w-full gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                <ExternalLink className="h-4 w-4" />
                Voir un aperçu du cadeau
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleDashboard}
                  variant="outline"
                  className="h-12 gap-2 rounded-xl border-border"
                >
                  <Gift className="h-4 w-4" />
                  Mes cadeaux
                </Button>
                <Button
                  onClick={handleNewGift}
                  variant="outline"
                  className="h-12 gap-2 rounded-xl border-border"
                >
                  <ArrowRight className="h-4 w-4" />
                  Nouveau cadeau
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Un email de confirmation a été envoyé avec tous les détails
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
