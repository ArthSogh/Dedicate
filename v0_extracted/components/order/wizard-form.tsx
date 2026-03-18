"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Heart, Sparkles, Camera, Lock, ArrowRight, ArrowLeft, Globe, Wand2, ShieldCheck, Upload, X } from "lucide-react"
import type { OrderData, Ambiance } from "@/app/order/page"
import { useCallback, useState } from "react"

interface WizardFormProps {
  currentStep: number
  orderData: OrderData
  updateOrderData: (updates: Partial<OrderData>) => void
  nextStep: () => void
  prevStep: () => void
}

const ambianceOptions: { value: Ambiance; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "romantique", label: "Romantique", icon: <Heart className="w-6 h-6" />, description: "Tendresse et amour" },
  { value: "fun", label: "Fun / Prank", icon: <Sparkles className="w-6 h-6" />, description: "Humour et surprises" },
  { value: "souvenir", label: "Souvenir", icon: <Camera className="w-6 h-6" />, description: "Nostalgie et mémoires" },
  { value: "mysterieux", label: "Mystérieux", icon: <Lock className="w-6 h-6" />, description: "Énigme et suspense" },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

export function WizardForm({ currentStep, orderData, updateOrderData, nextStep, prevStep }: WizardFormProps) {
  const [direction, setDirection] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleNext = () => {
    setDirection(1)
    nextStep()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevStep()
  }

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
      const newFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith("image/")
      )
      updateOrderData({ images: [...orderData.images, ...newFiles] })
    }
  }, [orderData.images, updateOrderData])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith("image/")
      )
      updateOrderData({ images: [...orderData.images, ...newFiles] })
    }
  }, [orderData.images, updateOrderData])

  const removeImage = useCallback((index: number) => {
    updateOrderData({ 
      images: orderData.images.filter((_, i) => i !== index) 
    })
  }, [orderData.images, updateOrderData])

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return orderData.recipientName.trim().length > 0
      case 2:
        return orderData.ambiance !== null
      case 3:
        return orderData.message.trim().length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1"
        >
          {/* Step 1: Recipient Name */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  {"C'est pour qui ?"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Entrez le prénom de la personne qui recevra ce cadeau unique.
                </p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="recipientName" className="text-base font-medium">
                  Prénom du destinataire
                </Label>
                <Input
                  id="recipientName"
                  type="text"
                  placeholder="Ex: Marie"
                  value={orderData.recipientName}
                  onChange={(e) => updateOrderData({ recipientName: e.target.value })}
                  className="h-14 text-lg bg-white/70 border-cream-dark focus:border-foreground"
                />
              </div>
            </div>
          )}

          {/* Step 2: Ambiance */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  {"Quelle est l'ambiance ?"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Choisissez le ton qui correspond le mieux à votre cadeau.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {ambianceOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => updateOrderData({ ambiance: option.value })}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      orderData.ambiance === option.value
                        ? "border-foreground bg-foreground/5"
                        : "border-cream-dark bg-white/50 hover:border-warm-gray hover:bg-white/70"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`mb-3 ${orderData.ambiance === option.value ? "text-foreground" : "text-muted-foreground"}`}>
                      {option.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Message & Images */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  Personnalisez votre cadeau
                </h2>
                <p className="text-muted-foreground text-lg">
                  Ajoutez votre message et vos plus beaux souvenirs.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-base font-medium">
                    Votre message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Écrivez votre message personnel..."
                    value={orderData.message}
                    onChange={(e) => updateOrderData({ message: e.target.value })}
                    className="min-h-32 text-base bg-white/70 border-cream-dark focus:border-foreground resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Vos souvenirs
                  </Label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                      dragActive 
                        ? "border-foreground bg-foreground/5" 
                        : "border-cream-dark bg-white/50 hover:border-warm-gray hover:bg-white/70"
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
                    <p className="text-foreground font-medium mb-1">
                      Glissez vos images ici
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ou cliquez pour sélectionner
                    </p>
                  </div>

                  {orderData.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {orderData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeImage(index)
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Premium Options */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  Options Premium
                </h2>
                <p className="text-muted-foreground text-lg">
                  Rendez votre cadeau encore plus spécial.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    id: "customDomain",
                    key: "customDomain" as const,
                    icon: <Globe className="w-5 h-5" />,
                    title: "Domaine personnalisé",
                    description: "pour-marie.dedicate.gift",
                    price: "+9,99€",
                  },
                  {
                    id: "animations3d",
                    key: "animations3d" as const,
                    icon: <Wand2 className="w-5 h-5" />,
                    title: "Animations 3D",
                    description: "Effets visuels immersifs",
                    price: "+4,99€",
                  },
                  {
                    id: "securePassword",
                    key: "securePassword" as const,
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: "Protection par mot de passe",
                    description: "Accès sécurisé et privé",
                    price: "+2,99€",
                  },
                ].map((option) => (
                  <motion.label
                    key={option.id}
                    htmlFor={option.id}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      orderData.premiumOptions[option.key]
                        ? "border-foreground bg-foreground/5"
                        : "border-cream-dark bg-white/50 hover:border-warm-gray"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Checkbox
                      id={option.id}
                      checked={orderData.premiumOptions[option.key]}
                      onCheckedChange={(checked) =>
                        updateOrderData({
                          premiumOptions: {
                            ...orderData.premiumOptions,
                            [option.key]: checked as boolean,
                          },
                        })
                      }
                    />
                    <div className="text-muted-foreground">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">{option.price}</span>
                  </motion.label>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-8 mt-auto">
        {currentStep > 1 ? (
          <Button
            variant="ghost"
            onClick={handlePrev}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={currentStep === 4 ? () => {} : handleNext}
          disabled={!canProceed()}
          className="gap-2 bg-foreground text-background hover:bg-foreground/90 px-8 h-12"
        >
          {currentStep === 4 ? "Finaliser" : "Continuer"}
          {currentStep < 4 && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
