"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

const plans = [
  {
    name: "Essentiel",
    price: "19",
    description: "Parfait pour un premier cadeau digital",
    features: [
      "1 template premium",
      "Jusqu'a 10 photos",
      "Message personnalise",
      "Lien partageable",
      "Support email",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "39",
    description: "L'experience complete et memorable",
    features: [
      "Tous les templates",
      "Photos illimitees",
      "Domaine personnalise",
      "Animations 3D",
      "Protection mot de passe",
      "Support prioritaire",
    ],
    highlighted: true,
  },
  {
    name: "Entreprise",
    price: "99",
    description: "Pour les occasions professionnelles",
    features: [
      "Tout le plan Premium",
      "Branding personnalise",
      "Jusqu'a 10 destinataires",
      "Analytics detailles",
      "Support dedie",
    ],
    highlighted: false,
  },
]

export function Pricing() {
  const { setView } = useAppStore()

  const handleStartCreating = () => {
    setView("wizard")
  }

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Un prix pour chaque occasion
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Choisissez la formule qui correspond a votre projet
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-2xl border ${
                plan.highlighted
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-white"
              } p-8`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 text-xs font-medium text-white">
                  Populaire
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-semibold">{plan.price}EUR</span>
                <span className={`text-sm ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}> / cadeau</span>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      plan.highlighted ? "bg-coral" : "bg-soft-bg"
                    }`}>
                      <Check className={`h-3 w-3 ${plan.highlighted ? "text-white" : "text-foreground"}`} />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleStartCreating}
                className={`w-full rounded-full h-12 text-sm font-medium ${
                  plan.highlighted
                    ? "bg-white text-foreground hover:bg-white/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                Commencer
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
