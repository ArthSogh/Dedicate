"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface GeneratingViewProps {
  onComplete: () => void
}

export function GeneratingView({ onComplete }: GeneratingViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: "linear-gradient(135deg, #E8D5B7 0%, #F5E6D3 50%, #D4C4A8 100%)",
            top: "20%",
            left: "10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[100px]"
          style={{
            background: "linear-gradient(135deg, #C9B896 0%, #E5D6C1 100%)",
            bottom: "10%",
            right: "10%",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Animated Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-cream to-cream-dark mx-auto flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(200, 180, 150, 0)",
                "0 0 0 30px rgba(200, 180, 150, 0.1)",
                "0 0 0 0 rgba(200, 180, 150, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-foreground/80" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
            Génération de votre écrin numérique...
          </h2>
          <p className="text-muted-foreground">
            Nous créons quelque chose de magique pour vous
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-10 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-1 bg-cream-dark/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center gap-1.5 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-foreground/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
