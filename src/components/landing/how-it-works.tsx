"use client"

import { motion } from "framer-motion"
import { Palette, Eye, Gift } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Personnalisez",
    description: "Choisissez un template et ajoutez vos photos, textes et messages personnels.",
    icon: Palette,
  },
  {
    number: "02",
    title: "Previsualisez",
    description: "Visualisez votre creation en temps reel et ajustez chaque detail a la perfection.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Offrez",
    description: "Partagez le lien unique avec votre proche et vivez ensemble ce moment magique.",
    icon: Gift,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Trois etapes simples
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Creez un cadeau memorable en quelques minutes
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-bg">
                <step.icon className="h-7 w-7 text-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
