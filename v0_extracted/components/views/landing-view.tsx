"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/landing/navigation"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TemplatesPreview } from "@/components/landing/templates-preview"
import { Pricing } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"

interface LandingViewProps {
  onStartCreating: () => void
  onNavigate: (view: string) => void
}

export function LandingView({ onStartCreating, onNavigate }: LandingViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navigation onNavigate={onNavigate} />
      <main>
        <Hero onStartCreating={onStartCreating} />
        <HowItWorks />
        <TemplatesPreview />
        <Pricing />
      </main>
      <Footer />
    </motion.div>
  )
}
