"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Mail, Map, Sparkles, Camera, Gift } from "lucide-react"

import { useRouter } from "next/navigation"

const examples = [
  { id: "letter", title: "Lettre d'amour", recipient: "Marie", icon: Mail },
  { id: "memories", title: "Album Souvenirs", recipient: "Papa", icon: Camera },
  { id: "treasure", title: "Chasse au Tresor", recipient: "Lucas", icon: Map },
]

export function Hero() {
  const router = useRouter()
  const [activeExample, setActiveExample] = useState(0)
  const [isLetterOpen, setIsLetterOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % examples.length)
      setIsLetterOpen(false)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeExample === 0) {
      const timer = setTimeout(() => setIsLetterOpen(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [activeExample])

  const example = examples[activeExample]

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground">
              Offrez plus qu'un objet.
              <br />
              <span className="text-coral">Une experience.</span>
            </h1>
            
            <p className="mx-auto lg:mx-0 mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Creez un mini-site personnalise pour vos proches. 
              Lettres d'amour, albums souvenirs, chasses au tresor - 
              un cadeau numerique unique et eternel.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => router.push("/order")}
                className="w-full sm:w-auto rounded-full bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base font-medium"
              >
                Creer mon cadeau
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                A partir de 19EUR
              </span>
            </div>
          </motion.div>

          {/* Device Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="relative">
              {/* Desktop Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-soft-bg shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-border bg-white px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-4 flex-1 text-center">
                    <span className="rounded-full bg-soft-bg px-4 py-1 text-xs text-muted-foreground">
                      dedicate.app/{example.recipient.toLowerCase()}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[4/3] bg-white p-8"
                  >
                    {/* Letter */}
                    {example.id === "letter" && (
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="relative" style={{ perspective: "1000px" }}>
                          {/* Envelope */}
                          <div className="w-56 h-40 bg-soft-bg rounded-lg shadow-lg relative overflow-visible border border-border">
                            {/* Flap */}
                            <motion.div 
                              className="absolute -top-px left-0 right-0 h-20 bg-coral/20 rounded-t-lg origin-top"
                              style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
                              animate={{ rotateX: isLetterOpen ? 180 : 0 }}
                              transition={{ duration: 0.7 }}
                            />
                            {/* Seal */}
                            <motion.div 
                              className="absolute top-10 left-1/2 -translate-x-1/2 z-10"
                              animate={{ scale: isLetterOpen ? 0 : 1 }}
                            >
                              <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center shadow-md">
                                <Heart className="w-5 h-5 text-white fill-white" />
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Letter content */}
                          <AnimatePresence>
                            {isLetterOpen && (
                              <motion.div
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -80, opacity: 1 }}
                                exit={{ y: 0, opacity: 0 }}
                                transition={{ delay: 0.4 }}
                                className="absolute inset-x-4 top-6 bg-white rounded-lg shadow-xl p-5 border border-border"
                              >
                                <p className="font-serif text-lg text-foreground text-center">
                                  Mon amour,
                                </p>
                                <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
                                  Chaque jour passe avec toi est un cadeau que je cheris...
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <p className="mt-8 text-sm text-muted-foreground">
                          {isLetterOpen ? "Une declaration touchante" : "Cliquez pour ouvrir..."}
                        </p>
                      </div>
                    )}

                    {/* Memories */}
                    {example.id === "memories" && (
                      <div className="flex h-full flex-col items-center justify-center">
                        <h3 className="text-2xl font-semibold text-foreground mb-6">
                          Nos plus beaux souvenirs
                        </h3>
                        <div className="relative w-full overflow-hidden rounded-xl">
                          <motion.div 
                            className="flex gap-4"
                            animate={{ x: [0, -200, 0] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div 
                                key={i} 
                                className="w-24 h-24 rounded-xl flex-shrink-0 flex items-center justify-center bg-soft-bg border border-border"
                              >
                                <Camera className="w-8 h-8 text-muted-foreground/40" />
                              </div>
                            ))}
                          </motion.div>
                        </div>
                        <p className="mt-6 text-sm text-muted-foreground">
                          Defilement automatique des photos
                        </p>
                      </div>
                    )}

                    {/* Treasure */}
                    {example.id === "treasure" && <TreasureDemo />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile Frame */}
              <motion.div
                initial={{ x: 20, y: 20 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 z-20 w-28 sm:w-40"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
                  <div className="flex justify-center bg-soft-bg py-2">
                    <div className="h-1 w-12 rounded-full bg-muted-foreground/20" />
                  </div>
                  <div className="aspect-[9/16] bg-white p-4 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center mb-3">
                      <example.icon className="h-5 w-5 text-coral" />
                    </div>
                    <div className="text-sm font-medium text-foreground text-center">
                      {example.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Pour {example.recipient}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-10">
              {examples.map((ex, index) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setActiveExample(index)
                    setIsLetterOpen(false)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeExample 
                      ? "bg-foreground w-8" 
                      : "bg-border w-2.5 hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TreasureDemo() {
  const [selected, setSelected] = useState<number | null>(null)
  
  useEffect(() => {
    const timer = setTimeout(() => setSelected(1), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Indice #1
      </h3>
      <div className="bg-soft-bg rounded-xl p-6 max-w-xs border border-border">
        <p className="text-base text-foreground text-center mb-4">
          Ou etait notre premier rendez-vous ?
        </p>
        <div className="space-y-2">
          {["Cinema", "Restaurant", "Parc"].map((opt, i) => (
            <motion.div
              key={opt}
              className={`rounded-lg px-4 py-2.5 text-sm text-center cursor-pointer transition-colors ${
                selected === i 
                  ? 'bg-coral text-white' 
                  : 'bg-white border border-border hover:border-coral/30'
              }`}
              animate={selected === i ? { scale: [1, 1.02, 1] } : {}}
            >
              {opt}
            </motion.div>
          ))}
        </div>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-coral"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Bonne reponse !</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
