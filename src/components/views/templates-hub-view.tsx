"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Eye, Sparkles, Heart, Camera, Lock, ArrowRight, Gift, Star, Music, Gamepad2, Map } from "lucide-react"
import { useAppStore, type TemplateType } from "@/lib/store"

const templates: {
  id: TemplateType
  name: string
  description: string
  category: string
  icon: typeof Heart
  gradient: string
  features: string[]
  popular: boolean
}[] = [
  {
    id: "memory-lane",
    name: "Memory Lane",
    description: "Parfait pour les souvenirs et la nostalgie. Un voyage emotionnel a travers vos plus beaux moments.",
    category: "Souvenirs",
    icon: Camera,
    gradient: "from-blue-50 to-cyan-50",
    features: ["Galerie photo immersive", "Effets parallax", "Chronologie interactive"],
    popular: false,
  },
  {
    id: "golden-ticket",
    name: "Golden Ticket",
    description: "Fun et surprenant ! Ideal pour annoncer une surprise, un voyage ou une experience unique.",
    category: "Invitation",
    icon: Gift,
    gradient: "from-amber-50 to-orange-50",
    features: ["Animation enveloppe", "Reveal surprise", "Design elegant"],
    popular: true,
  },
  {
    id: "secret-odyssey",
    name: "Secret Odyssey",
    description: "Mysterieux et intrigant. Creez une chasse au tresor emotionnelle pour votre destinataire.",
    category: "Aventure",
    icon: Map,
    gradient: "from-emerald-50 to-teal-50",
    features: ["Enigmes personnalisees", "Revelation progressive", "Ambiance mystere"],
    popular: false,
  },
  {
    id: "love-letter",
    name: "Love Letter",
    description: "Romantique et touchant. La declaration d'amour parfaite en version numerique.",
    category: "Romantique",
    icon: Heart,
    gradient: "from-rose-50 to-pink-50",
    features: ["Animation lettre", "Typographie elegante", "Ambiance intime"],
    popular: true,
  },
  {
    id: "birthday-blast",
    name: "Birthday Blast",
    description: "Festif et joyeux ! Une celebration d'anniversaire pleine de confettis et de surprises.",
    category: "Anniversaire",
    icon: Sparkles,
    gradient: "from-purple-50 to-violet-50",
    features: ["Confettis animes", "Compte a rebours", "Messages surprises"],
    popular: false,
  },
  {
    id: "star-dedication",
    name: "Star Dedication",
    description: "Poetique et unique. Offrez une etoile virtuelle avec un message dans les nuages.",
    category: "Hommage",
    icon: Star,
    gradient: "from-indigo-50 to-blue-50",
    features: ["Ciel etoile interactif", "Dedication personnalisee", "Ambiance nocturne"],
    popular: false,
  },
  {
    id: "playlist-story",
    name: "Playlist Story",
    description: "Musical et emotionnel. Une histoire racontee a travers vos chansons preferees.",
    category: "Musical",
    icon: Music,
    gradient: "from-green-50 to-emerald-50",
    features: ["Integration musicale", "Pochettes animees", "Narration sonore"],
    popular: false,
  },
  {
    id: "quest-adventure",
    name: "Quest Adventure",
    description: "Ludique et interactif. Un mini-jeu d'aventure personnalise pour petits et grands.",
    category: "Jeu",
    icon: Gamepad2,
    gradient: "from-orange-50 to-red-50",
    features: ["Mini-jeux", "Progression narrative", "Recompenses"],
    popular: false,
  },
]

export function TemplatesHubView() {
  const { setView, setSelectedTemplate, updateGiftConfig } = useAppStore()

  const handlePreview = (templateId: TemplateType) => {
    setSelectedTemplate(templateId)
    setView("template-preview")
  }

  const handleTry = (templateId: TemplateType) => {
    setSelectedTemplate(templateId)
    setView("wizard")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setView("landing")}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <button
              onClick={() => setView("landing")}
              className="text-xl font-semibold text-foreground"
            >
              Dedicate
            </button>
            <Button
              onClick={() => setView("wizard")}
              className="rounded-full bg-foreground px-6 text-sm text-background hover:bg-foreground/90"
            >
              Creer
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
            Nos templates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choisissez le theme parfait pour votre cadeau. Chaque template est concu pour creer une experience unique et memorable.
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-xl"
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-coral px-3 py-1 text-xs font-medium text-white">
                  Populaire
                </div>
              )}

              {/* Preview Area */}
              <div className={`h-40 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-lg">
                  <template.icon className="h-8 w-8 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs font-medium text-coral">{template.category}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1">{template.name}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {template.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-soft-bg px-3 py-1 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handlePreview(template.id)}
                    variant="outline"
                    className="flex-1 h-10 gap-2 rounded-full"
                  >
                    <Eye className="h-4 w-4" />
                    Apercu
                  </Button>
                  <Button
                    onClick={() => handleTry(template.id)}
                    className="flex-1 h-10 gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    Essayer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 rounded-2xl border border-border bg-soft-bg p-12 text-center"
        >
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            Vous ne savez pas lequel choisir ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Pas d'inquietude ! Notre assistant vous guidera pour trouver le template parfait en quelques questions.
          </p>
          <Button
            onClick={() => setView("wizard")}
            className="mt-8 h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
          >
            Commencer la creation
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
