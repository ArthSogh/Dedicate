"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus, Minus } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useState } from "react"

const faqs = [
  {
    question: "Comment fonctionne Dedicate ?",
    answer: "Dedicate vous permet de créer des mini-sites web personnalisés comme cadeaux. Vous choisissez un thème, ajoutez votre message personnel et vos photos, puis partagez le lien unique avec votre destinataire. C'est simple, élégant et mémorable."
  },
  {
    question: "Combien de temps mon cadeau reste-t-il en ligne ?",
    answer: "Votre cadeau reste accessible en ligne pendant 1 an après sa création. Vous pouvez prolonger cette durée depuis votre tableau de bord si vous le souhaitez."
  },
  {
    question: "Puis-je modifier mon cadeau après l'avoir créé ?",
    answer: "Oui, tant que le cadeau n'a pas été consulté par le destinataire, vous pouvez le modifier depuis votre tableau de bord. Une fois ouvert, le contenu est figé pour préserver le moment."
  },
  {
    question: "Le destinataire a-t-il besoin d'un compte ?",
    answer: "Non, le destinataire n'a besoin que du lien que vous lui envoyez. Si vous avez activé la protection par mot de passe, il lui faudra également le mot de passe que vous aurez choisi."
  },
  {
    question: "Quels formats d'images sont acceptés ?",
    answer: "Nous acceptons les formats JPG, PNG et WEBP. Chaque image peut faire jusqu'à 10 Mo, et vous pouvez ajouter jusqu'à 20 images par cadeau."
  },
  {
    question: "Comment fonctionne le domaine personnalisé ?",
    answer: "Avec l'option domaine personnalisé, votre cadeau sera accessible via une URL comme pour-marie.dedicate.gift au lieu d'un lien générique. C'est parfait pour une touche encore plus personnelle."
  },
  {
    question: "Puis-je obtenir un remboursement ?",
    answer: "Oui, nous offrons un remboursement complet dans les 7 jours suivant l'achat si le cadeau n'a pas encore été consulté. Contactez-nous via le formulaire de contact."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Toutes les données sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais vos informations avec des tiers et vous pouvez supprimer votre compte et toutes vos données à tout moment."
  },
]

export function FaqView() {
  const { setView } = useAppStore()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-3xl">
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
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl font-semibold text-foreground">
            Questions fréquentes
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur Dedicate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h3 className="pr-4 font-medium text-foreground">{faq.question}</h3>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-soft-bg">
                  {openIndex === index ? (
                    <Minus className="h-4 w-4 text-foreground" />
                  ) : (
                    <Plus className="h-4 w-4 text-foreground" />
                  )}
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl border border-border bg-soft-bg p-8 text-center"
        >
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Vous avez d'autres questions ?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Notre équipe est là pour vous aider
          </p>
          <Button
            onClick={() => setView("contact")}
            className="mt-6 h-12 rounded-xl bg-foreground px-8 text-background hover:bg-foreground/90"
          >
            Nous contacter
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
