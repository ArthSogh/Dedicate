"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Heart, Sparkles, Camera, Lock, ArrowRight, ArrowLeft, 
  Upload, X, Gift, ChevronLeft, Users, Baby, Dog,
  Cake, HeartHandshake, PartyPopper, Feather, Star,
  BookOpen, Images, Gamepad2, Zap, Flower2,
  Volume2, VolumeX, Music, TreePine, Globe, ShieldCheck,
  Check, GraduationCap
} from "lucide-react"
import { 
  useAppStore, 
  type GiftConfig,
  type TargetType,
  type OccasionType,
  type ToneType,
  type InteractionType,
  type ComplexityType,
  type MusicType,
  type SecurityType,
  calculatePrice
} from "@/lib/store"

// ============================================
// WIZARD OPTIONS CONFIGURATION - Always 4 options when possible
// ============================================

const targetOptions: { value: NonNullable<TargetType>; label: string; icon: React.ReactNode }[] = [
  { value: "conjoint", label: "Conjoint(e)", icon: <Heart className="w-6 h-6" /> },
  { value: "ami", label: "Ami(e)", icon: <Users className="w-6 h-6" /> },
  { value: "parent", label: "Parent", icon: <HeartHandshake className="w-6 h-6" /> },
  { value: "enfant", label: "Enfant", icon: <Baby className="w-6 h-6" /> },
]

const occasionOptions: { value: NonNullable<OccasionType>; label: string; icon: React.ReactNode }[] = [
  { value: "anniversaire", label: "Anniversaire", icon: <Cake className="w-6 h-6" /> },
  { value: "saint-valentin", label: "Saint-Valentin", icon: <Heart className="w-6 h-6" /> },
  { value: "mariage", label: "Mariage", icon: <Sparkles className="w-6 h-6" /> },
  { value: "plaisir", label: "Juste pour le plaisir", icon: <PartyPopper className="w-6 h-6" /> },
]

const toneOptions: { value: NonNullable<ToneType>; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "poetique", label: "Poetique", icon: <Feather className="w-6 h-6" />, description: "Doux et emotionnel" },
  { value: "minimaliste", label: "Minimaliste", icon: <Flower2 className="w-6 h-6" />, description: "Elegant et epure" },
  { value: "fun", label: "Fun / Decale", icon: <PartyPopper className="w-6 h-6" />, description: "Joyeux et surprenant" },
  { value: "luxueux", label: "Luxueux", icon: <Star className="w-6 h-6" />, description: "Raffine et prestigieux" },
]

const interactionOptions: { value: NonNullable<InteractionType>; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "storytelling", label: "Storytelling", icon: <BookOpen className="w-6 h-6" />, description: "Narration immersive" },
  { value: "galerie", label: "Galerie", icon: <Images className="w-6 h-6" />, description: "Mise en valeur visuelle" },
  { value: "jeu", label: "Jeu interactif", icon: <Gamepad2 className="w-6 h-6" />, description: "Experience ludique (+5EUR)" },
  { value: "lettre", label: "Lettre animee", icon: <Feather className="w-6 h-6" />, description: "Message personnel" },
]

const complexityOptions: { value: NonNullable<ComplexityType>; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "simple", label: "Simple", icon: <Flower2 className="w-6 h-6" />, description: "Design epure" },
  { value: "riche", label: "Riche", icon: <Zap className="w-6 h-6" />, description: "Animations (+4EUR)" },
  { value: "premium", label: "Premium", icon: <Star className="w-6 h-6" />, description: "Experience complete (+8EUR)" },
  { value: "custom", label: "Sur-mesure", icon: <Sparkles className="w-6 h-6" />, description: "Contactez-nous" },
]

const musicOptions: { value: NonNullable<MusicType>; label: string; icon: React.ReactNode }[] = [
  { value: "none", label: "Aucune", icon: <VolumeX className="w-6 h-6" /> },
  { value: "calme", label: "Calme", icon: <Volume2 className="w-6 h-6" /> },
  { value: "festive", label: "Festive", icon: <Music className="w-6 h-6" /> },
  { value: "nature", label: "Nature", icon: <TreePine className="w-6 h-6" /> },
]

const securityOptions: { value: NonNullable<SecurityType>; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "public", label: "Public", icon: <Globe className="w-6 h-6" />, description: "Accessible via lien" },
  { value: "password", label: "Mot de passe", icon: <ShieldCheck className="w-6 h-6" />, description: "Acces securise (+2EUR)" },
  { value: "email", label: "Email", icon: <Lock className="w-6 h-6" />, description: "Verification email" },
  { value: "date", label: "Date limite", icon: <Cake className="w-6 h-6" />, description: "Ouverture programmee" },
]

// ============================================
// STEP CONFIGURATION
// ============================================

interface StepConfig {
  question: string
  subtitle: string
}

const steps: StepConfig[] = [
  { question: "Pour qui est cet ecrin ?", subtitle: "Choisissez le destinataire de votre cadeau unique." },
  { question: "L'evenement ?", subtitle: "Quelle occasion souhaitez-vous celebrer ?" },
  { question: "L'ambiance souhaitee ?", subtitle: "Definissez le ton de votre creation." },
  { question: "Type d'experience ?", subtitle: "Comment voulez-vous raconter votre histoire ?" },
  { question: "Niveau de details ?", subtitle: "Choisissez la richesse visuelle." },
  { question: "Ambiance sonore ?", subtitle: "Ajoutez une dimension musicale." },
  { question: "Acces ?", subtitle: "Definissez qui peut voir votre cadeau." },
  { question: "Nom du destinataire", subtitle: "Comment s'appelle la personne chanceuse ?" },
  { question: "Votre dedicace", subtitle: "Ecrivez votre message personnel et sincere." },
  { question: "Vos souvenirs", subtitle: "Ajoutez vos plus belles photos (5-10 images)." },
]

// ============================================
// WIZARD COMPONENT
// ============================================

interface WizardViewProps {
  onBack: () => void
  onFinalize: () => void
}

export function WizardView({ onBack, onFinalize }: WizardViewProps) {
  const { giftConfig, updateGiftConfig } = useAppStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const totalSteps = 10

  const pricing = useMemo(() => calculatePrice(giftConfig), [giftConfig])

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setDirection(1)
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep])

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  // Auto-advance handler for card selections
  const handleCardSelect = useCallback(<T extends string>(field: keyof GiftConfig, value: T) => {
    updateGiftConfig({ [field]: value } as Partial<GiftConfig>)
    // Auto-advance after a short delay for visual feedback
    setTimeout(() => {
      if (currentStep < totalSteps) {
        setDirection(1)
        setCurrentStep(prev => prev + 1)
      }
    }, 300)
  }, [currentStep, updateGiftConfig])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
        .filter(file => file.type.startsWith("image/"))
        .slice(0, 10 - giftConfig.images.length)
      updateGiftConfig({ images: [...giftConfig.images, ...newFiles] })
    }
  }, [giftConfig.images, updateGiftConfig])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
        .filter(file => file.type.startsWith("image/"))
        .slice(0, 10 - giftConfig.images.length)
      updateGiftConfig({ images: [...giftConfig.images, ...newFiles] })
    }
  }, [giftConfig.images, updateGiftConfig])

  const removeImage = useCallback((index: number) => {
    updateGiftConfig({ images: giftConfig.images.filter((_, i) => i !== index) })
  }, [giftConfig.images, updateGiftConfig])

  const canProceed = () => {
    switch (currentStep) {
      case 1: return giftConfig.target !== null
      case 2: return giftConfig.occasion !== null
      case 3: return giftConfig.tone !== null
      case 4: return giftConfig.interaction !== null
      case 5: return giftConfig.complexity !== null
      case 6: return giftConfig.music !== null
      case 7: return giftConfig.security !== null
      case 8: return giftConfig.recipientName.trim().length > 0
      case 9: return giftConfig.message.trim().length > 0
      case 10: return giftConfig.images.length >= 1
      default: return false
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
  }

  // Option card component with auto-advance
  const OptionCard = ({ 
    selected, 
    onClick, 
    icon, 
    label, 
    description 
  }: { 
    selected: boolean
    onClick: () => void
    icon: React.ReactNode
    label: string
    description?: string
  }) => (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative p-5 rounded-xl border-2 text-left transition-all ${
        selected
          ? "border-foreground bg-foreground/5 shadow-md"
          : "border-border bg-white/50 hover:border-muted-foreground hover:bg-white/70"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`mb-2 ${selected ? "text-foreground" : "text-muted-foreground"}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{label}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      {selected && (
        <motion.div 
          className="absolute top-3 right-3 w-5 h-5 bg-foreground rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Check className="w-3 h-3 text-background" />
        </motion.div>
      )}
    </motion.button>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-6 py-3 shadow-sm backdrop-blur-xl">
            <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <span className="font-serif text-xl font-semibold text-foreground">Dedicate</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Etape {currentStep}</span>
              <span className="text-cream-dark">/</span>
              <span>{totalSteps}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="flex flex-col lg:flex-row min-h-screen pt-24">
        {/* Left Side - Wizard Form */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 lg:max-h-screen lg:overflow-y-auto">
          <div className="flex-1 flex flex-col max-w-xl mx-auto w-full">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i < currentStep ? "bg-foreground" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex-1"
              >
                {/* Question Header */}
                <div className="space-y-2 mb-8">
                  <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                    {steps[currentStep - 1].question}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {steps[currentStep - 1].subtitle}
                  </p>
                </div>

                {/* Step 1: Target - 4 options */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {targetOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.target === option.value}
                        onClick={() => handleCardSelect("target", option.value)}
                        icon={option.icon}
                        label={option.label}
                      />
                    ))}
                  </div>
                )}

                {/* Step 2: Occasion - 4 options */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-2 gap-4">
                    {occasionOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.occasion === option.value}
                        onClick={() => handleCardSelect("occasion", option.value)}
                        icon={option.icon}
                        label={option.label}
                      />
                    ))}
                  </div>
                )}

                {/* Step 3: Tone - 4 options */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-2 gap-4">
                    {toneOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.tone === option.value}
                        onClick={() => handleCardSelect("tone", option.value)}
                        icon={option.icon}
                        label={option.label}
                        description={option.description}
                      />
                    ))}
                  </div>
                )}

                {/* Step 4: Interaction - 4 options */}
                {currentStep === 4 && (
                  <div className="grid grid-cols-2 gap-4">
                    {interactionOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.interaction === option.value}
                        onClick={() => handleCardSelect("interaction", option.value)}
                        icon={option.icon}
                        label={option.label}
                        description={option.description}
                      />
                    ))}
                  </div>
                )}

                {/* Step 5: Complexity - 4 options */}
                {currentStep === 5 && (
                  <div className="grid grid-cols-2 gap-4">
                    {complexityOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.complexity === option.value}
                        onClick={() => handleCardSelect("complexity", option.value)}
                        icon={option.icon}
                        label={option.label}
                        description={option.description}
                      />
                    ))}
                  </div>
                )}

                {/* Step 6: Music - 4 options */}
                {currentStep === 6 && (
                  <div className="grid grid-cols-2 gap-4">
                    {musicOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.music === option.value}
                        onClick={() => handleCardSelect("music", option.value)}
                        icon={option.icon}
                        label={option.label}
                      />
                    ))}
                  </div>
                )}

                {/* Step 7: Security - 4 options */}
                {currentStep === 7 && (
                  <div className="grid grid-cols-2 gap-4">
                    {securityOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={giftConfig.security === option.value}
                        onClick={() => handleCardSelect("security", option.value)}
                        icon={option.icon}
                        label={option.label}
                        description={option.description}
                      />
                    ))}
                  </div>
                )}

                {/* Step 8: Name - Text Input */}
                {currentStep === 8 && (
                  <div className="space-y-4">
                    <Label htmlFor="recipientName" className="text-base font-medium">
                      Prenom du destinataire
                    </Label>
                    <Input
                      id="recipientName"
                      type="text"
                      placeholder="Ex: Marie"
                      value={giftConfig.recipientName}
                      onChange={(e) => updateGiftConfig({ recipientName: e.target.value })}
                      className="h-14 text-lg bg-white/70 border-border focus:border-foreground"
                      autoFocus
                    />
                    <Button
                      onClick={goToNextStep}
                      disabled={!canProceed()}
                      className="w-full mt-4 h-12 rounded-xl"
                    >
                      Continuer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Step 9: Message - Textarea */}
                {currentStep === 9 && (
                  <div className="space-y-4">
                    <Label htmlFor="message" className="text-base font-medium">
                      Votre message personnel
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Ecrivez votre dedicace avec tout votre coeur..."
                      value={giftConfig.message}
                      onChange={(e) => updateGiftConfig({ message: e.target.value })}
                      className="min-h-48 text-base bg-white/70 border-border focus:border-foreground resize-none leading-relaxed"
                      autoFocus
                    />
                    <p className="text-sm text-muted-foreground">
                      {giftConfig.message.length} caracteres
                    </p>
                    <Button
                      onClick={goToNextStep}
                      disabled={!canProceed()}
                      className="w-full mt-4 h-12 rounded-xl"
                    >
                      Continuer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Step 10: Images - File Upload */}
                {currentStep === 10 && (
                  <div className="space-y-6">
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                        dragActive 
                          ? "border-foreground bg-foreground/5" 
: "border-border bg-white/50 hover:border-muted-foreground hover:bg-white/70"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("file-input")?.click()}
                    >
                      <input 
                        id="file-input" 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileInput} 
                        className="hidden" 
                      />
                      <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-foreground font-medium">Glissez vos photos ici</p>
                      <p className="text-sm text-muted-foreground mt-1">ou cliquez pour parcourir</p>
                    </div>

                    {giftConfig.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-3">
                        {giftConfig.images.map((file, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-soft-bg">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeImage(index)
                              }}
                              className="absolute top-1 right-1 w-6 h-6 bg-foreground/80 rounded-full flex items-center justify-center hover:bg-foreground transition-colors"
                            >
                              <X className="w-3 h-3 text-background" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground text-center">
                      {giftConfig.images.length}/10 images selectionnees
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={goToPrevStep}
                  className="flex-1 h-12 rounded-xl border-border"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Precedent
                </Button>
              )}
              
              {currentStep === 10 && (
                <Button
                  onClick={onFinalize}
                  disabled={!canProceed()}
                  className="flex-1 h-12 rounded-xl bg-foreground hover:bg-foreground/90"
                >
                  Finaliser
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-soft-bg p-12 relative">
          {/* DRAFT Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <div className="text-6xl font-bold text-foreground/5 uppercase tracking-widest transform -rotate-45 whitespace-nowrap">
              DRAFT PREVIEW
            </div>
          </div>

          {/* Preview Card */}
          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/5 backdrop-blur-xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-soft-bg px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                </div>
                <div className="mx-auto flex-1 text-center">
                  <span className="rounded-md bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                    dedicate.gift/{giftConfig.recipientName.toLowerCase() || "preview"}
                  </span>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="aspect-[4/3] bg-gradient-to-br from-soft-bg via-background to-muted p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <motion.div 
                    key={giftConfig.tone}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center"
                  >
                    {giftConfig.tone === "poetique" && <Feather className="w-8 h-8 text-foreground/60" />}
                    {giftConfig.tone === "minimaliste" && <Flower2 className="w-8 h-8 text-foreground/60" />}
                    {giftConfig.tone === "fun" && <PartyPopper className="w-8 h-8 text-foreground/60" />}
                    {giftConfig.tone === "luxueux" && <Star className="w-8 h-8 text-foreground/60" />}
                    {!giftConfig.tone && <Gift className="w-8 h-8 text-foreground/60" />}
                  </motion.div>
                  
                  <motion.div 
                    key={giftConfig.recipientName}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-serif text-2xl font-semibold text-foreground"
                  >
                    {giftConfig.recipientName ? `Pour toi, ${giftConfig.recipientName}` : "Pour toi..."}
                  </motion.div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    {giftConfig.occasion === "anniversaire" && "Joyeux Anniversaire"}
                    {giftConfig.occasion === "saint-valentin" && "Je t'aime"}
                    {giftConfig.occasion === "mariage" && "Felicitations"}
                    {giftConfig.occasion === "plaisir" && "Un cadeau pour toi"}
                    {!giftConfig.occasion && "Un message special"}
                  </div>
                  
                  {giftConfig.images.length > 0 && (
                    <div className="mt-6 flex gap-2">
                      {giftConfig.images.slice(0, 3).map((file, i) => (
                        <div key={i} className="h-12 w-12 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {giftConfig.images.length > 3 && (
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                          +{giftConfig.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-lg"
            >
              <span className="text-lg font-semibold">{pricing.total} EUR</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
