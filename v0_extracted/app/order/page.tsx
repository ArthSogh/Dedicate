"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WizardForm } from "@/components/order/wizard-form"
import { LivePreview } from "@/components/order/live-preview"
import { OrderNavigation } from "@/components/order/order-navigation"

export type Ambiance = "romantique" | "fun" | "souvenir" | "mysterieux" | null

export interface OrderData {
  recipientName: string
  ambiance: Ambiance
  message: string
  images: File[]
  premiumOptions: {
    customDomain: boolean
    animations3d: boolean
    securePassword: boolean
  }
}

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState<OrderData>({
    recipientName: "",
    ambiance: null,
    message: "",
    images: [],
    premiumOptions: {
      customDomain: false,
      animations3d: false,
      securePassword: false,
    },
  })

  const updateOrderData = useCallback((updates: Partial<OrderData>) => {
    setOrderData((prev) => ({ ...prev, ...updates }))
  }, [])

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background">
      <OrderNavigation currentStep={currentStep} />
      
      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Side - Wizard Form */}
        <motion.div 
          className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WizardForm
            currentStep={currentStep}
            orderData={orderData}
            updateOrderData={updateOrderData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </motion.div>

        {/* Right Side - Live Preview */}
        <motion.div 
          className="w-full lg:w-1/2 bg-cream/50 p-6 lg:p-12 flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LivePreview orderData={orderData} />
        </motion.div>
      </main>
    </div>
  )
}
