"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Camera, Lock, Gift } from "lucide-react"
import type { OrderData, Ambiance } from "@/app/order/page"

interface LivePreviewProps {
  orderData: OrderData
}

const ambianceStyles: Record<NonNullable<Ambiance>, { gradient: string; icon: React.ReactNode; accent: string }> = {
  romantique: {
    gradient: "from-rose-100 to-pink-50",
    icon: <Heart className="w-5 h-5 text-rose-400" />,
    accent: "text-rose-500",
  },
  fun: {
    gradient: "from-amber-100 to-yellow-50",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    accent: "text-amber-500",
  },
  souvenir: {
    gradient: "from-blue-100 to-sky-50",
    icon: <Camera className="w-5 h-5 text-blue-400" />,
    accent: "text-blue-500",
  },
  mysterieux: {
    gradient: "from-violet-100 to-purple-50",
    icon: <Lock className="w-5 h-5 text-violet-400" />,
    accent: "text-violet-500",
  },
}

export function LivePreview({ orderData }: LivePreviewProps) {
  const { recipientName, ambiance, message, images } = orderData
  const style = ambiance ? ambianceStyles[ambiance] : null

  return (
    <div className="w-full max-w-md relative">
      {/* Draft Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
        <div className="transform -rotate-45 select-none">
          <span className="text-4xl lg:text-5xl font-bold text-foreground/10 whitespace-nowrap tracking-widest">
            DRAFT PREVIEW
          </span>
        </div>
      </div>

      {/* Device Frame - Desktop Mockup */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Browser Chrome */}
        <div className="bg-white rounded-t-xl border border-border/50 shadow-2xl overflow-hidden">
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-cream/50 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white/80 rounded-md px-3 py-1.5 text-xs text-muted-foreground text-center truncate">
                dedicate.gift/{recipientName ? recipientName.toLowerCase().replace(/\s+/g, "-") : "..."}
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className={`min-h-[400px] p-6 bg-gradient-to-br ${style?.gradient || "from-cream to-white"} transition-all duration-500`}>
            {/* Gift Website Preview */}
            <div className="space-y-6">
              {/* Header */}
              <motion.div 
                className="text-center space-y-2"
                animate={{ opacity: recipientName ? 1 : 0.4 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-sm mb-2">
                  {style?.icon || <Gift className="w-5 h-5 text-warm-gray" />}
                </div>
                <h2 className={`font-serif text-2xl font-semibold ${style?.accent || "text-foreground"}`}>
                  {recipientName ? `Pour ${recipientName}` : "Pour..."}
                </h2>
                {ambiance && (
                  <motion.p 
                    className="text-sm text-muted-foreground capitalize"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Une expérience {ambiance === "fun" ? "fun" : ambiance}
                  </motion.p>
                )}
              </motion.div>

              {/* Message Preview */}
              {message && (
                <motion.div
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-foreground leading-relaxed line-clamp-4">
                    {message}
                  </p>
                </motion.div>
              )}

              {/* Images Preview */}
              {images.length > 0 && (
                <motion.div
                  className="grid grid-cols-3 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {images.slice(0, 3).map((file, index) => (
                    <motion.div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-white/50 shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                  {images.length > 3 && (
                    <div className="aspect-square rounded-lg bg-white/50 flex items-center justify-center text-sm text-muted-foreground">
                      +{images.length - 3}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Empty State */}
              {!recipientName && !message && images.length === 0 && (
                <div className="text-center py-8">
                  <Gift className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Commencez à remplir le formulaire pour voir votre aperçu
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Preview - Small */}
        <motion.div
          className="absolute -bottom-6 -right-4 w-24 shadow-xl rounded-xl overflow-hidden border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Phone Frame */}
          <div className="bg-foreground rounded-t-xl p-1">
            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto" />
          </div>
          <div className={`h-36 p-2 bg-gradient-to-br ${style?.gradient || "from-cream to-white"} flex flex-col items-center justify-center`}>
            <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center mb-1">
              {style?.icon ? (
                <div className="scale-50">{style.icon}</div>
              ) : (
                <Gift className="w-3 h-3 text-warm-gray" />
              )}
            </div>
            <p className="text-[6px] font-serif font-semibold text-foreground truncate max-w-full px-1">
              {recipientName ? `Pour ${recipientName}` : "..."}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Premium Badges */}
      {(orderData.premiumOptions.customDomain || orderData.premiumOptions.animations3d || orderData.premiumOptions.securePassword) && (
        <motion.div 
          className="flex flex-wrap gap-2 mt-8 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {orderData.premiumOptions.customDomain && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 text-xs font-medium text-foreground shadow-sm">
              Domaine personnalisé
            </span>
          )}
          {orderData.premiumOptions.animations3d && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 text-xs font-medium text-foreground shadow-sm">
              Animations 3D
            </span>
          )}
          {orderData.premiumOptions.securePassword && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 text-xs font-medium text-foreground shadow-sm">
              Protégé
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}
