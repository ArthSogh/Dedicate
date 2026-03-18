"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Heart, Sparkles, Map, Camera, Gift, Star, Music, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore, type TemplateType } from "@/lib/store"

const templates: {
  id: TemplateType
  name: string
  description: string
  category: string
  icon: typeof Heart
}[] = [
  {
    id: "memory-lane",
    name: "Memory Lane",
    description: "Un voyage nostalgique a travers vos plus beaux souvenirs ensemble.",
    category: "Souvenirs",
    icon: Camera,
  },
  {
    id: "golden-ticket",
    name: "Golden Ticket",
    description: "Une invitation exclusive pour une experience ou un evenement special.",
    category: "Invitation",
    icon: Gift,
  },
  {
    id: "secret-odyssey",
    name: "Secret Odyssey",
    description: "Une chasse au tresor interactive avec des indices et des surprises.",
    category: "Aventure",
    icon: Map,
  },
  {
    id: "love-letter",
    name: "Love Letter",
    description: "Une lettre d'amour animee qui s'ouvre avec tendresse et emotion.",
    category: "Romantique",
    icon: Heart,
  },
  {
    id: "birthday-blast",
    name: "Birthday Blast",
    description: "Une celebration festive avec confettis et souhaits personnalises.",
    category: "Anniversaire",
    icon: Sparkles,
  },
  {
    id: "star-dedication",
    name: "Star Dedication",
    description: "Offrez une etoile virtuelle avec un message dans les nuages.",
    category: "Hommage",
    icon: Star,
  },
  {
    id: "playlist-story",
    name: "Playlist Story",
    description: "Une histoire racontee a travers vos chansons preferees.",
    category: "Musical",
    icon: Music,
  },
  {
    id: "quest-adventure",
    name: "Quest Adventure",
    description: "Un mini-jeu d'aventure personnalise pour les plus jeunes.",
    category: "Enfant",
    icon: Gamepad2,
  },
]

export function TemplatesPreview() {
  const { setView, setSelectedTemplate } = useAppStore()
  const displayedTemplates = templates.slice(0, 6)

  const handleTemplateClick = (templateId: TemplateType) => {
    setSelectedTemplate(templateId)
    setView("template-preview")
  }

  return (
    <section id="templates" className="bg-soft-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Des modeles pour chaque occasion
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Choisissez parmi nos templates elegants et personnalisez-les
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              onClick={() => handleTemplateClick(template.id)}
              onUse={() => {
                setSelectedTemplate(template.id)
                setView("wizard")
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            onClick={() => setView("templates-hub")}
            className="rounded-full px-8 h-12 text-base"
          >
            Voir les {templates.length} modeles
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

interface TemplateCardProps {
  template: typeof templates[0]
  index: number
  onClick: () => void
  onUse: () => void
}

function TemplateCard({ template, index, onClick, onUse }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-border hover:border-coral/30 hover:shadow-xl transition-all duration-300">
        {/* Preview Area */}
        <div 
          className="relative h-48 bg-soft-bg overflow-hidden cursor-pointer"
          onClick={onClick}
        >
          <TemplateAnimation templateId={template.id} isHovered={isHovered} icon={template.icon} />
          
          {/* Hover overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "bg-foreground/5" : ""}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
            >
              <ArrowUpRight className="h-5 w-5 text-foreground" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <span className="inline-block text-xs font-medium text-coral mb-2">
                {template.category}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {template.name}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-soft-bg flex items-center justify-center">
              <template.icon className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
            {template.description}
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClick}
              className="flex-1 rounded-full h-10"
            >
              Apercu
            </Button>
            <Button
              size="sm"
              onClick={onUse}
              className="flex-1 rounded-full h-10 bg-foreground hover:bg-foreground/90 text-background"
            >
              Utiliser
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TemplateAnimation({ templateId, isHovered, icon: Icon }: { templateId: string | null; isHovered: boolean; icon: typeof Heart }) {
  
  // Memory Lane - Photo gallery
  if (templateId === "memory-lane") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center border border-border"
              style={{ left: -40 + i * 22, top: -25 }}
              animate={isHovered ? {
                y: [0, -10, 0],
                rotate: [(i - 1.5) * 8, (i - 1.5) * 14, (i - 1.5) * 8],
                scale: [0.9, 1.05, 0.9],
              } : {
                y: 0,
                rotate: (i - 1.5) * 8,
                scale: 0.9,
              }}
              transition={{ duration: 1.8, repeat: isHovered ? Infinity : 0, delay: i * 0.15 }}
            >
              <Camera className="w-6 h-6 text-muted-foreground/40" />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Golden Ticket / Love Letter - Envelope opening
  if (templateId === "golden-ticket" || templateId === "love-letter") {
    const isLove = templateId === "love-letter"
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ perspective: "600px" }}>
          <div className="w-40 h-28 bg-white rounded-xl shadow-lg relative border border-border">
            <motion.div 
              className={`absolute -top-px left-0 right-0 h-14 ${isLove ? 'bg-coral/20' : 'bg-muted'} rounded-t-xl origin-top`}
              style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
              animate={{ rotateX: isHovered ? 170 : 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div 
              className="absolute top-7 left-1/2 -translate-x-1/2 z-10"
              animate={{ scale: isHovered ? 0 : 1 }}
            >
              <div className={`w-8 h-8 rounded-full ${isLove ? 'bg-coral' : 'bg-foreground'} flex items-center justify-center shadow`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-x-3 top-3 bg-white rounded-lg shadow-lg p-3 border border-border"
            animate={isHovered ? { y: -50, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ delay: isHovered ? 0.3 : 0 }}
          >
            <p className="font-serif text-sm text-center text-foreground">
              {isLove ? "Mon amour..." : "Vous etes invite !"}
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  // Secret Odyssey / Quest Adventure - Quiz
  if (templateId === "secret-odyssey" || templateId === "quest-adventure") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-4 w-full max-w-[180px] shadow-sm border border-border">
          <p className="text-xs text-foreground text-center mb-3 font-medium">Enigme #1</p>
          <div className="space-y-1.5">
            {["A", "B", "C"].map((opt, i) => (
              <motion.div
                key={opt}
                className={`rounded-lg px-3 py-2 text-xs text-center transition-colors ${
                  isHovered && i === 1 ? 'bg-coral text-white' : 'bg-soft-bg'
                }`}
                animate={isHovered && i === 1 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                Option {opt}
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-3 flex items-center justify-center gap-1 text-coral"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Bravo !</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // Birthday Blast - Confetti
  if (templateId === "birthday-blast") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Sparkles className="w-12 h-12 text-coral mx-auto" />
        </motion.div>
        {isHovered && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['#D4654A', '#1d1d1f', '#86868b', '#f5f5f7'][i % 4],
              left: `${15 + Math.random() * 70}%`,
            }}
            initial={{ top: "110%", opacity: 1 }}
            animate={{ top: "-10%", opacity: 0 }}
            transition={{ duration: 1.4, delay: i * 0.08 }}
          />
        ))}
      </div>
    )
  }

  // Star Dedication
  if (templateId === "star-dedication") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={isHovered ? { scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 0.9 }}
        >
          <Star className="w-14 h-14 text-coral fill-coral/20" />
        </motion.div>
        {isHovered && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-coral rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos(i * 60 * Math.PI / 180) * 50,
              y: Math.sin(i * 60 * Math.PI / 180) * 50,
            }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        ))}
      </div>
    )
  }

  // Playlist Story - Music bars
  if (templateId === "playlist-story") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-end gap-1.5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 bg-foreground rounded-full"
              style={{ height: 20 }}
              animate={isHovered ? {
                height: [20, 36 + Math.random() * 24, 20],
              } : { height: 20 }}
              transition={{ 
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Default
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div animate={isHovered ? { scale: 1.15 } : { scale: 1 }} transition={{ duration: 0.3 }}>
        <Icon className="w-14 h-14 text-muted-foreground/30" />
      </motion.div>
    </div>
  )
}
