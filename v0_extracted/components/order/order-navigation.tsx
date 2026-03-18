"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface OrderNavigationProps {
  currentStep: number
}

const steps = [
  { number: 1, label: "Destinataire" },
  { number: 2, label: "Ambiance" },
  { number: 3, label: "Contenu" },
  { number: 4, label: "Options" },
]

export function OrderNavigation({ currentStep }: OrderNavigationProps) {
  return (
    <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-semibold text-foreground">
          Dedicate
        </Link>

        {/* Step Indicator */}
        <nav className="hidden md:flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step.number
                      ? "bg-foreground text-background"
                      : "bg-cream-dark text-muted-foreground"
                  }`}
                  animate={{
                    scale: currentStep === step.number ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {step.number}
                </motion.div>
                <span
                  className={`text-sm ${
                    currentStep >= step.number
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-px mx-3 transition-colors ${
                    currentStep > step.number ? "bg-foreground" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Step */}
        <div className="md:hidden text-sm text-muted-foreground">
          Étape {currentStep}/4
        </div>
      </div>
    </header>
  )
}
