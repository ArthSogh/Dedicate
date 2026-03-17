"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Gift } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e91e8c] to-[#ff6b6b] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <span>
              Gift<span className="gradient-text">Site</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium text-[#737373] hover:text-foreground transition-colors">
              Comment ça marche
            </Link>
            <Link href="#templates" className="text-sm font-medium text-[#737373] hover:text-foreground transition-colors">
              Exemples
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-[#737373] hover:text-foreground transition-colors">
              Tarifs
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/order">Offrir maintenant 🎁</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 flex flex-col gap-3 border-t border-[#e5e5e5] mt-2 animate-fade-in">
            <Link href="#how-it-works" className="text-sm font-medium py-2 text-[#737373] hover:text-foreground">
              Comment ça marche
            </Link>
            <Link href="#templates" className="text-sm font-medium py-2 text-[#737373] hover:text-foreground">
              Exemples
            </Link>
            <Link href="#pricing" className="text-sm font-medium py-2 text-[#737373] hover:text-foreground">
              Tarifs
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-[#e5e5e5]">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Connexion</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/order">Offrir maintenant 🎁</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
