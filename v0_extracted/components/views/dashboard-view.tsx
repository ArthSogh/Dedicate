"use client"

import { motion } from "framer-motion"
import { Plus, Gift, Settings, LogOut, Clock, Eye, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

export function DashboardView() {
  const { setView, logout, user, createdGifts, setCurrentGiftSlug, updateGiftData } = useAppStore()

  const handleLogout = () => {
    logout()
    setView("landing")
  }

  const handleCreateNew = () => {
    setView("wizard")
  }

  const handleViewGift = (gift: typeof createdGifts[0]) => {
    // Set the gift data for preview
    updateGiftData({
      recipientName: gift.recipientName,
      ambiance: gift.template === "Memory Lane" ? "souvenir" : 
                gift.template === "Golden Ticket" ? "fun" : 
                gift.template === "Romantique" ? "romantique" : "mysterieux",
      message: "Voici un message de demonstration pour ce cadeau...",
    })
    setCurrentGiftSlug(gift.slug)
    setView("gift-locked")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => setView("landing")}
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            Dedicate
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email || "user@example.com"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Bienvenue
            </h1>
            <p className="mt-1 text-muted-foreground">
              Gerez vos cadeaux numeriques et creez de nouvelles experiences
            </p>
          </div>

          <Button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-background hover:bg-foreground/90"
          >
            <Plus className="h-5 w-5" />
            Nouveau cadeau
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {[
            { label: "Cadeaux crees", value: createdGifts.length.toString(), icon: Gift },
            { label: "Vues totales", value: createdGifts.reduce((sum, g) => sum + g.views, 0).toString(), icon: Eye },
            { label: "Partages", value: createdGifts.filter(g => g.status === "Envoye").length.toString(), icon: Share2 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-bg">
                <stat.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* My Gifts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Mes cadeaux
          </h2>

          {createdGifts.length > 0 ? (
            <div className="mt-6 space-y-4">
              {createdGifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-coral/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-soft-bg">
                      <Gift className="h-6 w-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        Pour {gift.recipientName}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{gift.template}</span>
                        <span className="text-border">-</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {gift.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-left sm:text-right">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          gift.status === "Envoye"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {gift.status}
                      </span>
                      {gift.views > 0 && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
                          <Eye className="h-3 w-3" />
                          {gift.views} vues
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handleViewGift(gift)}
                      className="gap-2 rounded-xl border-border"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Voir
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border py-16"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-soft-bg">
                <Gift className="h-10 w-10 text-coral" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                Aucun cadeau pour le moment
              </h3>
              <p className="mt-2 text-muted-foreground">
                Creez votre premier cadeau numerique
              </p>
              <Button
                onClick={handleCreateNew}
                className="mt-6 rounded-xl bg-foreground px-6 py-3 text-background hover:bg-foreground/90"
              >
                Commencer
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </motion.div>
  )
}
