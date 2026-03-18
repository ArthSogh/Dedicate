"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useAppStore } from "@/lib/store"

interface NavigationProps {
  onNavigate?: (view: string) => void
}

export function Navigation({ onNavigate }: NavigationProps) {
  const { setView, isAuthenticated } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleLoginClick = () => {
    setView("login")
    setMobileMenuOpen(false)
  }

  const handleDashboardClick = () => {
    setView("dashboard")
    setMobileMenuOpen(false)
  }

  const handleTemplatesClick = () => {
    setView("templates-hub")
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button 
            onClick={() => {
              onNavigate?.("landing")
              setMobileMenuOpen(false)
            }}
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Dedicate
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={handleTemplatesClick}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Modeles
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Tarifs
            </button>
            <button
              onClick={() => setView("faq")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </button>
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Button
                onClick={handleDashboardClick}
                className="rounded-full bg-coral px-6 text-sm font-medium hover:bg-coral/90"
              >
                Dashboard
              </Button>
            ) : (
              <Button
                onClick={handleLoginClick}
                className="rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Connexion
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-white md:hidden"
        >
          <div className="px-6 py-4 space-y-1">
            <button
              onClick={handleTemplatesClick}
              className="block w-full text-left py-3 text-base text-foreground"
            >
              Modeles
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left py-3 text-base text-foreground"
            >
              Tarifs
            </button>
            <button
              onClick={() => {
                setView("faq")
                setMobileMenuOpen(false)
              }}
              className="block w-full text-left py-3 text-base text-foreground"
            >
              FAQ
            </button>
            <div className="pt-3">
              {isAuthenticated ? (
                <Button
                  onClick={handleDashboardClick}
                  className="w-full rounded-full bg-coral text-sm font-medium hover:bg-coral/90"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90"
                >
                  Connexion
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
