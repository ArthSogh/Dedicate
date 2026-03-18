"use client"

import { motion } from "framer-motion"
import { Plus, Gift, Settings, LogOut, Clock, Eye, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface DashboardViewProps {
  user: any;
  gifts: any[];
}

export function DashboardView({ user, gifts }: DashboardViewProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const handleCreateNew = () => {
    router.push("/order")
  }

  const handleViewGift = (gift: any) => {
    router.push(`/gift/${gift.slug}`)
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
            onClick={() => router.push("/")}
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            GiftSite
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
            { label: "Cadeaux crees", value: gifts.length.toString(), icon: Gift },
            { label: "Vues totales", value: gifts.reduce((sum, g) => sum + (g.views || 0), 0).toString(), icon: Eye },
            { label: "Partages", value: gifts.filter(g => g.status && g.status !== "brouillon").length.toString(), icon: Share2 },
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

          {gifts.length > 0 ? (
            <div className="mt-6 space-y-4">
              {gifts.map((gift, index) => (
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
                        Pour {gift.recipient_name || gift.recipientName || "Inconnu"}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{gift.theme_id || gift.template || "Standard"}</span>
                        <span className="text-border">-</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(gift.created_at || Date.now()).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-left sm:text-right">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          gift.status === "Envoyé" || gift.status === "payé"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {gift.status || "Brouillon"}
                      </span>
                      {(gift.views || 0) > 0 && (
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
