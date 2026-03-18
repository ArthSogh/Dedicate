"use client"

import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"

export function Footer() {
  const { setView } = useAppStore()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border py-12"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <button
              onClick={() => setView("landing")}
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Dedicate
            </button>
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Dedicate. Tous droits reserves.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setView("faq")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </button>
            <button
              onClick={() => setView("contact")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </button>
            <button
              onClick={() => setView("templates-hub")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Modeles
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
