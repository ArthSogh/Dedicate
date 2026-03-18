"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Send, Mail, MessageSquare, Check } from "lucide-react"
import { useAppStore } from "@/lib/store"

export function ContactView() {
  const { setView } = useAppStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-screen items-center justify-center bg-background px-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"
          >
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Message envoyé !
          </h1>
          <p className="mt-3 text-muted-foreground">
            Nous vous répondrons dans les plus brefs délais.
          </p>
          <Button
            onClick={() => setView("landing")}
            className="mt-8 h-12 rounded-xl bg-foreground px-8 text-background hover:bg-foreground/90"
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-6 py-3 shadow-sm backdrop-blur-xl">
            <button
              onClick={() => setView("landing")}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <button
              onClick={() => setView("landing")}
              className="font-serif text-xl font-semibold text-foreground"
            >
              Dedicate
            </button>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl font-semibold text-foreground">
            Contactez-nous
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Une question ? Nous sommes là pour vous aider.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-bg">
              <Mail className="h-5 w-5 text-coral" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">hello@dedicate.gift</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-bg">
              <MessageSquare className="h-5 w-5 text-coral" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Réponse</p>
              <p className="font-medium text-foreground">Sous 24h</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nom
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-white/70"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-white/70"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Sujet
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="De quoi s'agit-il ?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="h-12 bg-white/70"
                required
              />
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Votre message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-32 resize-none bg-white/70"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 h-12 w-full gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90"
            >
              {isSubmitting ? (
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-background/30 border-t-background"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Envoi en cours...</span>
                </motion.div>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}
