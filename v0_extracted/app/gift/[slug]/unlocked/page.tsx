"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart } from "lucide-react"

// Mock data for the unlocked gift
const mockGiftContent: Record<string, {
  recipientName: string
  senderName: string
  message: string
  images: string[]
  theme: string
}> = {
  "demo": {
    recipientName: "Marie",
    senderName: "Thomas",
    message: "Chaque moment passé avec toi est un trésor que je garde précieusement dans mon coeur. Tu illumines ma vie de mille façons, et je voulais créer cet espace pour te montrer à quel point tu comptes pour moi. Merci d'être toi, simplement et magnifiquement.",
    images: [
      "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    ],
    theme: "romantique",
  },
  "sample": {
    recipientName: "Thomas",
    senderName: "Marie",
    message: "Pour tous ces souvenirs partagés et ceux encore à venir...",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    ],
    theme: "romantique",
  },
}

// Floating particle component
function FloatingParticle({ delay, duration, startX, startY, size }: {
  delay: number
  duration: number
  startX: number
  startY: number
  size: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
        background: "radial-gradient(circle, rgba(232,213,183,0.6) 0%, rgba(232,213,183,0) 70%)",
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.8, 0.8, 0],
        y: [0, -200, -400, -600],
        x: [0, 30, -20, 40],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

// Masonry Gallery Component
function MasonryGallery({ images }: { images: string[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="break-inside-avoid"
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-lg group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={src}
              alt={`Memory ${index + 1}`}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                height: index % 3 === 0 ? "400px" : index % 3 === 1 ? "300px" : "350px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default function UnlockedGiftPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])
  
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [params])

  const giftContent = slug ? mockGiftContent[slug] : null
  const recipientName = giftContent?.recipientName || "vous"
  const senderName = giftContent?.senderName || "Quelqu'un de spécial"
  const message = giftContent?.message || "Un message plein d'amour..."
  const images = giftContent?.images || []

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.8,
    duration: 8 + Math.random() * 4,
    startX: Math.random() * 100,
    startY: 100 + Math.random() * 20,
    size: 4 + Math.random() * 8,
  }))

  return (
    <div ref={containerRef} style={{ position: "relative" }} className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Soft Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-background to-cream/20" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 blur-[150px]"
          style={{
            background: "linear-gradient(135deg, #E8D5B7 0%, #F5E6D3 100%)",
            y: parallaxY1,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "linear-gradient(135deg, #D4C4A8 0%, #E5D6C1 100%)",
            y: parallaxY2,
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="text-center z-10">
          {/* Small Heart Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-8 h-8 mx-auto text-warm-gray fill-cream" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight">
              Pour toi,
            </h1>
            <motion.h2
              className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-foreground font-medium mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              {recipientName}
            </motion.h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-8 text-muted-foreground text-lg md:text-xl font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            De la part de {senderName}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Parallax Image Section */}
      <section className="relative py-20 md:py-32">
        <motion.div
          className="relative h-[60vh] md:h-[80vh] mx-4 md:mx-8 lg:mx-16 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={images[0] || "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1200&q=80"}
            alt="Featured memory"
            className="w-full h-[120%] object-cover"
            style={{ y: parallaxY1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        </motion.div>
      </section>

      {/* Message Section */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative backdrop-blur-xl bg-white/60 rounded-3xl p-8 md:p-16 shadow-[0_8px_60px_rgba(0,0,0,0.06)] border border-white/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Quote */}
            <div className="absolute -top-6 left-8 md:left-16">
              <span className="font-serif text-8xl md:text-9xl text-cream-dark/50 leading-none">"</span>
            </div>

            {/* Message Text */}
            <motion.p
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed text-center italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {message}
            </motion.p>

            {/* Signature */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-4">
                <div className="w-12 h-px bg-cream-dark/50" />
                <span className="text-muted-foreground font-medium tracking-wide">{senderName}</span>
                <div className="w-12 h-px bg-cream-dark/50" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Second Parallax Image */}
      {images[1] && (
        <section className="relative py-10 md:py-20">
          <motion.div
            className="relative h-[50vh] md:h-[70vh] mx-4 md:mx-16 lg:mx-32 rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={images[1]}
              alt="Memory"
              className="w-full h-[120%] object-cover"
              style={{ y: parallaxY2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        </section>
      )}

      {/* Gallery Section */}
      {images.length > 2 && (
        <section className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Nos souvenirs
            </h3>
            <div className="w-16 h-px bg-cream-dark mx-auto" />
          </motion.div>

          <MasonryGallery images={images.slice(2)} />
        </section>
      )}

      {/* Footer */}
      <footer className="relative py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-6 h-6 mx-auto text-cream-dark mb-6" fill="currentColor" />
          <p className="text-sm text-muted-foreground/50 tracking-widest">
            Créé avec amour sur DEDICATE
          </p>
        </motion.div>
      </footer>
    </div>
  )
}
