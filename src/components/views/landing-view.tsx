"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/landing/navigation"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TemplatesPreview } from "@/components/landing/templates-preview"
import { Pricing } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"

interface LandingViewProps {
  isAuthenticated: boolean
}

export function LandingView({ isAuthenticated }: LandingViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navigation isAuthenticated={isAuthenticated} />
      <main>
        <Hero />
        <HowItWorks />
        <TemplatesPreview />
        <Pricing />
      </main>
      <Footer />
    </motion.div>
  )
}
