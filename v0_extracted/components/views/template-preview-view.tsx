"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, Sparkles, Map, ChevronDown, MousePointer, Star, Music, Gamepad2, Camera, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { useState, useEffect } from "react"

// Shared template header component
function TemplateHeader({ title, subtitle, icon: Icon, onClose }: { 
  title: string
  subtitle: string
  icon: typeof Heart
  onClose: () => void 
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed right-6 top-6 z-50"
      >
        <Button
          onClick={onClose}
          variant="outline"
          className="flex items-center gap-2 rounded-full border-white/30 bg-white/80 px-6 py-2 text-foreground shadow-lg backdrop-blur-sm hover:bg-white"
        >
          <X className="h-4 w-4" />
          Quitter
        </Button>
      </motion.div>
    </>
  )
}

// Memory Lane Template
function MemoryLanePreview({ onClose }: { onClose: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      <TemplateHeader title="Memory Lane" subtitle="Voyage a travers nos souvenirs" icon={Camera} onClose={onClose} />
      
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl"
          >
            <Camera className="h-12 w-12 text-blue-500" />
          </motion.div>
          <h1 className="text-5xl font-semibold text-foreground md:text-6xl">
            Memory Lane
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Un voyage a travers nos plus beaux souvenirs
          </p>
          
          {/* Photo Grid Preview */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="aspect-square rounded-2xl bg-white shadow-lg flex items-center justify-center"
              >
                <Camera className="w-8 h-8 text-muted-foreground/30" />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12"
          >
            <ChevronDown className="mx-auto h-8 w-8 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Golden Ticket Template
function GoldenTicketPreview({ onClose }: { onClose: () => void }) {
  const [isOpened, setIsOpened] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleOpen = () => {
    setIsOpened(true)
    setTimeout(() => setShowContent(true), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
      <TemplateHeader title="Golden Ticket" subtitle="Invitation exclusive" icon={Gift} onClose={onClose} />
      
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            <div className="relative w-80 md:w-96">
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 shadow-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 origin-top bg-gradient-to-b from-amber-200 to-amber-300"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 60%, 0 100%)" }}
                  animate={isOpened ? { rotateX: 180 } : {}}
                  transition={{ duration: 0.8 }}
                />
                
                {!isOpened && (
                  <motion.button
                    onClick={handleOpen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.button>
                )}
              </div>

              {!isOpened && (
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-6 text-center text-sm text-amber-600"
                >
                  Cliquez pour ouvrir votre invitation
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg"
          >
            <div className="rounded-3xl bg-white p-8 shadow-2xl md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"
              >
                <Sparkles className="h-10 w-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-semibold text-foreground">
                Golden Ticket
              </h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 space-y-4"
              >
                <p className="text-lg text-muted-foreground">
                  Vous etes cordialement invite(e) a
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  Une Soiree Exceptionnelle
                </p>
                <div className="mx-auto my-6 h-px w-24 bg-border" />
                <p className="text-muted-foreground">
                  Samedi 15 Mars 2025<br />
                  20h00 - Le Grand Palais
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Secret Odyssey Template
function SecretOdysseyPreview({ onClose }: { onClose: () => void }) {
  const [revealedClues, setRevealedClues] = useState<number[]>([])
  const clues = [
    { id: 1, hint: "Premier Indice", content: "La ou nous avons partage notre premier cafe..." },
    { id: 2, hint: "Deuxieme Indice", content: "L'endroit ou tu m'as dit ces mots magiques..." },
    { id: 3, hint: "Troisieme Indice", content: "Notre lieu secret, sous les etoiles..." },
    { id: 4, hint: "Destination Finale", content: "Retrouve-moi la-bas a 19h !" },
  ]

  const toggleClue = (id: number) => {
    if (revealedClues.includes(id)) return
    if (id === 1 || revealedClues.includes(id - 1)) {
      setRevealedClues([...revealedClues, id])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-24">
      <TemplateHeader title="Secret Odyssey" subtitle="Chasse au tresor" icon={Map} onClose={onClose} />
      
      <div className="mx-auto max-w-2xl pt-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl">
            <Map className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Secret Odyssey</h1>
          <p className="mt-4 text-muted-foreground">Cliquez sur chaque indice pour reveler le suivant</p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {clues.map((clue, index) => {
            const isRevealed = revealedClues.includes(clue.id)
            const isClickable = clue.id === 1 || revealedClues.includes(clue.id - 1)
            const isLocked = !isClickable && !isRevealed

            return (
              <motion.button
                key={clue.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleClue(clue.id)}
                disabled={isLocked || isRevealed}
                className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
                  isRevealed ? "border-emerald-300 bg-white shadow-lg" 
                    : isClickable ? "border-emerald-200 bg-white/80 hover:border-emerald-400 cursor-pointer" 
                    : "border-gray-200 bg-gray-100/50 cursor-not-allowed opacity-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-semibold ${
                    isRevealed ? "bg-emerald-500 text-white" : isClickable ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}>
                    {clue.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{clue.hint}</h3>
                    {isRevealed && <p className="mt-2 text-muted-foreground">{clue.content}</p>}
                    {!isRevealed && isClickable && <p className="mt-1 text-sm text-emerald-600">Cliquez pour reveler</p>}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {revealedClues.length === clues.length && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 text-center">
            <div className="inline-block rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-white shadow-xl">
              <p className="text-xl font-semibold">Mission Accomplie!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Love Letter Template
function LoveLetterPreview({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-6">
      <TemplateHeader title="Love Letter" subtitle="Declaration d'amour" icon={Heart} onClose={onClose} />
      
      <div className="text-center">
        <div className="relative" style={{ perspective: "1000px" }}>
          {/* Envelope */}
          <div className="w-72 h-48 md:w-96 md:h-64 bg-white rounded-xl shadow-2xl relative overflow-visible border border-rose-100">
            <motion.div 
              className="absolute -top-px left-0 right-0 h-24 md:h-32 bg-rose-100 rounded-t-xl origin-top"
              style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div 
              className="absolute top-12 md:top-16 left-1/2 -translate-x-1/2 z-10"
              animate={{ scale: isOpen ? 0 : 1 }}
            >
              <div className="w-12 h-12 rounded-full bg-coral flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </motion.div>
          </div>
          
          {/* Letter */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -120, opacity: 1 }}
                className="absolute inset-x-4 md:inset-x-8 top-8 bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-rose-100"
              >
                <p className="text-2xl md:text-3xl font-semibold text-foreground text-center">
                  Mon amour,
                </p>
                <p className="text-muted-foreground text-center mt-4 leading-relaxed">
                  Chaque jour passe avec toi est un cadeau que je cheris. Tu es la lumiere de ma vie...
                </p>
                <div className="mt-6 text-right">
                  <Heart className="inline w-5 h-5 text-coral fill-coral" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-24 text-muted-foreground"
        >
          {isOpen ? "Une declaration touchante" : "Ouverture automatique..."}
        </motion.p>
      </div>
    </div>
  )
}

// Birthday Blast Template
function BirthdayBlastPreview({ onClose }: { onClose: () => void }) {
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string }[]>([])

  useEffect(() => {
    const colors = ['#D4654A', '#1d1d1f', '#86868b', '#f5f5f7', '#FFD700', '#FF6B6B']
    const interval = setInterval(() => {
      const newConfetti = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      setConfetti(prev => [...prev, ...newConfetti].slice(-30))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 flex items-center justify-center p-6 overflow-hidden relative">
      <TemplateHeader title="Birthday Blast" subtitle="Celebration festive" icon={Sparkles} onClose={onClose} />
      
      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: c.color, left: `${c.x}%` }}
          initial={{ top: "-5%", opacity: 1, rotate: 0 }}
          animate={{ top: "105%", opacity: 0, rotate: 360 }}
          transition={{ duration: 3, ease: "linear" }}
        />
      ))}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-violet-500 shadow-xl"
        >
          <Sparkles className="h-12 w-12 text-white" />
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-semibold text-foreground">
          Joyeux Anniversaire !
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Une annee de plus remplie de bonheur
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 inline-block rounded-2xl bg-white px-8 py-6 shadow-xl"
        >
          <p className="text-lg text-foreground">
            Que tous tes voeux se realisent !
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Star Dedication Template
function StarDedicationPreview({ onClose }: { onClose: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <TemplateHeader title="Star Dedication" subtitle="Etoile personnalisee" icon={Star} onClose={onClose} />
      
      {/* Stars background */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() * 2 }}
        />
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mx-auto mb-8"
        >
          <Star className="h-24 w-24 text-yellow-400 fill-yellow-400" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-semibold text-white">
          Votre Etoile
        </h1>
        <p className="mt-4 text-xl text-indigo-200">
          Baptisee en votre honneur
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 inline-block rounded-2xl bg-white/10 backdrop-blur-lg px-8 py-6"
        >
          <p className="text-lg text-white">
            "Une lumiere eternelle dans le ciel nocturne"
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Playlist Story Template
function PlaylistStoryPreview({ onClose }: { onClose: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
      <TemplateHeader title="Playlist Story" subtitle="Histoire musicale" icon={Music} onClose={onClose} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl">
          <Music className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
          Notre Playlist
        </h1>
        <p className="mt-4 text-muted-foreground">
          Chaque chanson raconte un chapitre de notre histoire
        </p>
        
        {/* Playlist items */}
        <div className="mt-12 space-y-3">
          {["Notre premiere danse", "Ce jour d'ete", "Toujours ensemble"].map((song, i) => (
            <motion.div
              key={song}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-emerald-500">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{song}</p>
                <p className="text-sm text-muted-foreground">3:42</p>
              </div>
              {/* Sound bars */}
              <div className="ml-auto flex items-end gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <motion.div
                    key={bar}
                    className="w-1 bg-emerald-500 rounded-full"
                    animate={{ height: [8, 20, 8] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: bar * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Quest Adventure Template
function QuestAdventurePreview({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (correct: boolean) => {
    if (!answered) {
      setAnswered(true)
      if (correct) setScore(s => s + 10)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
      <TemplateHeader title="Quest Adventure" subtitle="Mini-jeu interactif" icon={Gamepad2} onClose={onClose} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-xl">
          <Gamepad2 className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-semibold text-foreground">Quest Adventure</h1>
        <p className="mt-2 text-muted-foreground">Score: {score} points</p>
        
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-xl">
          <p className="text-lg font-medium text-foreground mb-6">
            Question 1: Quelle est ma couleur preferee ?
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {[{ text: "Rouge", correct: false }, { text: "Bleu", correct: true }, { text: "Vert", correct: false }, { text: "Jaune", correct: false }].map((opt) => (
              <motion.button
                key={opt.text}
                onClick={() => handleAnswer(opt.correct)}
                disabled={answered}
                className={`rounded-xl px-4 py-3 font-medium transition-all ${
                  answered && opt.correct
                    ? "bg-green-500 text-white"
                    : answered && !opt.correct
                    ? "bg-gray-200 text-gray-400"
                    : "bg-soft-bg hover:bg-coral hover:text-white"
                }`}
                whileHover={!answered ? { scale: 1.02 } : {}}
                whileTap={!answered ? { scale: 0.98 } : {}}
              >
                {opt.text}
              </motion.button>
            ))}
          </div>
          
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center gap-2 text-green-600"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Bonne reponse !</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// Main Template Preview View
export function TemplatePreviewView() {
  const { selectedTemplate, setView, setSelectedTemplate } = useAppStore()

  const handleClose = () => {
    setSelectedTemplate(null)
    setView("templates-hub")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {selectedTemplate === "memory-lane" && <MemoryLanePreview onClose={handleClose} />}
      {selectedTemplate === "golden-ticket" && <GoldenTicketPreview onClose={handleClose} />}
      {selectedTemplate === "secret-odyssey" && <SecretOdysseyPreview onClose={handleClose} />}
      {selectedTemplate === "love-letter" && <LoveLetterPreview onClose={handleClose} />}
      {selectedTemplate === "birthday-blast" && <BirthdayBlastPreview onClose={handleClose} />}
      {selectedTemplate === "star-dedication" && <StarDedicationPreview onClose={handleClose} />}
      {selectedTemplate === "playlist-story" && <PlaylistStoryPreview onClose={handleClose} />}
      {selectedTemplate === "quest-adventure" && <QuestAdventurePreview onClose={handleClose} />}
      
      {/* Fallback if no template selected */}
      {!selectedTemplate && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Aucun template selectionne</p>
            <Button onClick={handleClose} className="mt-4">Retour aux templates</Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
