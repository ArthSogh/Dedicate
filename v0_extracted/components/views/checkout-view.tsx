"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ChevronLeft, CreditCard, Lock, Check, Shield, 
  Gift, Heart, Users, HeartHandshake, Baby, Dog,
  Cake, Sparkles, Feather, PartyPopper, Star, Flower2,
  BookOpen, Images, Gamepad2, Zap, Volume2, VolumeX, Music, TreePine,
  Globe, ShieldCheck
} from "lucide-react"
import { useAppStore, calculatePrice } from "@/lib/store"

// ============================================
// CHECKOUT VIEW - Order Summary & Payment
// ============================================
// Backend integration point: After successful payment,
// send the giftConfig object to your API endpoint.

export function CheckoutView() {
  const { giftConfig, giftData, setView, addCreatedGift, setCurrentGiftSlug } = useAppStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [name, setName] = useState("")

  // Use the new pricing calculation
  const pricing = calculatePrice(giftConfig)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // ============================================
    // BACKEND INTEGRATION POINT
    // ============================================
    // Send giftConfig to your API here:
    // const response = await fetch('/api/create-gift', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(giftConfig)
    // })
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))
    
    // Create gift entry
    const slug = `${giftConfig.recipientName.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36)}`
    const templateName = giftConfig.tone === "poetique" ? "Memory Lane" : 
                         giftConfig.tone === "fun" ? "Golden Ticket" : 
                         giftConfig.tone === "luxueux" ? "Secret Odyssey" : "Memory Lane"
    
    const newGift = {
      id: Date.now().toString(),
      recipientName: giftConfig.recipientName,
      template: templateName,
      createdAt: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      status: "Envoyé" as const,
      views: 0,
      slug,
    }
    
    addCreatedGift(newGift)
    setCurrentGiftSlug(slug)
    setView("success")
  }

  // Labels for display
  const targetLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    conjoint: { label: "Conjoint(e)", icon: <Heart className="w-4 h-4" /> },
    ami: { label: "Ami(e)", icon: <Users className="w-4 h-4" /> },
    parent: { label: "Parent", icon: <HeartHandshake className="w-4 h-4" /> },
    enfant: { label: "Enfant", icon: <Baby className="w-4 h-4" /> },
    animal: { label: "Chien/Chat", icon: <Dog className="w-4 h-4" /> },
  }

  const occasionLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    anniversaire: { label: "Anniversaire", icon: <Cake className="w-4 h-4" /> },
    "saint-valentin": { label: "Saint-Valentin", icon: <Heart className="w-4 h-4" /> },
    mariage: { label: "Mariage", icon: <Sparkles className="w-4 h-4" /> },
    hommage: { label: "Hommage", icon: <Feather className="w-4 h-4" /> },
    plaisir: { label: "Pour le plaisir", icon: <PartyPopper className="w-4 h-4" /> },
  }

  const toneLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    poetique: { label: "Poétique", icon: <Feather className="w-4 h-4" /> },
    minimaliste: { label: "Minimaliste", icon: <Flower2 className="w-4 h-4" /> },
    fun: { label: "Fun / Décalé", icon: <PartyPopper className="w-4 h-4" /> },
    luxueux: { label: "Luxueux", icon: <Star className="w-4 h-4" /> },
  }

  const interactionLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    storytelling: { label: "Storytelling vertical", icon: <BookOpen className="w-4 h-4" /> },
    galerie: { label: "Galerie immersive", icon: <Images className="w-4 h-4" /> },
    jeu: { label: "Jeu interactif", icon: <Gamepad2 className="w-4 h-4" /> },
  }

  const complexityLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    simple: { label: "Simple & Pur", icon: <Flower2 className="w-4 h-4" /> },
    riche: { label: "Riche & Animé", icon: <Zap className="w-4 h-4" /> },
  }

  const musicLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    none: { label: "Aucune", icon: <VolumeX className="w-4 h-4" /> },
    calme: { label: "Calme", icon: <Volume2 className="w-4 h-4" /> },
    festive: { label: "Festive", icon: <Music className="w-4 h-4" /> },
    nature: { label: "Nature", icon: <TreePine className="w-4 h-4" /> },
  }

  const securityLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    public: { label: "Public via lien", icon: <Globe className="w-4 h-4" /> },
    password: { label: "Protégé par mot de passe", icon: <ShieldCheck className="w-4 h-4" /> },
  }

  const SummaryItem = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {value}
      </span>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-6 py-3 shadow-sm backdrop-blur-xl">
            <button
              onClick={() => setView("wizard")}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Modifier</span>
            </button>
            <span className="font-serif text-xl font-semibold text-foreground">
              Dedicate
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5">
                  <Gift className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Récapitulatif de votre création
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Pour {giftConfig.recipientName || "..."}
                  </p>
                </div>
              </div>

              <div className="space-y-1 divide-y divide-border/50">
                {giftConfig.target && (
                  <SummaryItem 
                    label="Destinataire" 
                    value={targetLabels[giftConfig.target]?.label || ""} 
                    icon={targetLabels[giftConfig.target]?.icon}
                  />
                )}
                {giftConfig.occasion && (
                  <SummaryItem 
                    label="Occasion" 
                    value={occasionLabels[giftConfig.occasion]?.label || ""} 
                    icon={occasionLabels[giftConfig.occasion]?.icon}
                  />
                )}
                {giftConfig.tone && (
                  <SummaryItem 
                    label="Ambiance" 
                    value={toneLabels[giftConfig.tone]?.label || ""} 
                    icon={toneLabels[giftConfig.tone]?.icon}
                  />
                )}
                {giftConfig.interaction && (
                  <SummaryItem 
                    label="Expérience" 
                    value={interactionLabels[giftConfig.interaction]?.label || ""} 
                    icon={interactionLabels[giftConfig.interaction]?.icon}
                  />
                )}
                {giftConfig.complexity && (
                  <SummaryItem 
                    label="Détails" 
                    value={complexityLabels[giftConfig.complexity]?.label || ""} 
                    icon={complexityLabels[giftConfig.complexity]?.icon}
                  />
                )}
                {giftConfig.music && (
                  <SummaryItem 
                    label="Ambiance sonore" 
                    value={musicLabels[giftConfig.music]?.label || ""} 
                    icon={musicLabels[giftConfig.music]?.icon}
                  />
                )}
                {giftConfig.security && (
                  <SummaryItem 
                    label="Accès" 
                    value={securityLabels[giftConfig.security]?.label || ""} 
                    icon={securityLabels[giftConfig.security]?.icon}
                  />
                )}
                <SummaryItem 
                  label="Photos" 
                  value={`${giftConfig.images.length} image${giftConfig.images.length > 1 ? "s" : ""}`} 
                />
              </div>

              {/* Message Preview */}
              {giftConfig.message && (
                <div className="mt-6 rounded-xl bg-soft-bg p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Votre message
                  </p>
                  <p className="text-sm italic text-foreground/80 line-clamp-3">
                    "{giftConfig.message}"
                  </p>
                </div>
              )}

              {/* Pricing */}
              <div className="mt-6 space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Écrin digital (base)</span>
                  <span className="text-foreground">{pricing.base}€</span>
                </div>
                {pricing.addons.map((addon, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{addon.name}</span>
                    <span className="text-foreground">+{addon.price}€</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-serif text-2xl font-semibold text-foreground">
                    {pricing.total}€
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5">
                  <CreditCard className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Paiement
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sécurisé par Stripe
                  </p>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handlePayment() }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-sm font-medium">
                    Nom sur la carte
                  </Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-white/70 border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-medium">
                    Numéro de carte
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="h-12 bg-white/70 border-border pr-12"
                      required
                    />
                    <CreditCard className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-sm font-medium">
                      Expiration
                    </Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="h-12 bg-white/70 border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc" className="text-sm font-medium">
                      CVC
                    </Label>
                    <Input
                      id="cvc"
                      type="text"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      maxLength={3}
                      className="h-12 bg-white/70 border-border"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-6 h-14 w-full gap-2 bg-foreground text-background hover:bg-foreground/90"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-background border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Payer {pricing.total}€
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 pt-4 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Paiement 100% sécurisé et crypté</span>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Satisfait ou remboursé</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Support 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
