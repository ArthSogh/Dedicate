"use client"

import { AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { LandingView } from "@/components/views/landing-view"
import { WizardView } from "@/components/views/wizard-view"
import { GeneratingView } from "@/components/views/generating-view"
import { GiftLockedView } from "@/components/views/gift-locked-view"
import { GiftUnlockedView } from "@/components/views/gift-unlocked-view"
import { TemplatePreviewView } from "@/components/views/template-preview-view"
import { TemplatesHubView } from "@/components/views/templates-hub-view"
import { LoginView } from "@/components/views/login-view"
import { DashboardView } from "@/components/views/dashboard-view"
import { CheckoutView } from "@/components/views/checkout-view"
import { SuccessView } from "@/components/views/success-view"
import { FaqView } from "@/components/views/faq-view"
import { ContactView } from "@/components/views/contact-view"

export default function Home() {
  const { currentView, setView } = useAppStore()

  const handleNavigate = (view: string) => {
    if (view === "landing") {
      setView("landing")
    } else if (view === "login") {
      setView("login")
    } else if (view === "templates-hub") {
      setView("templates-hub")
    } else if (view === "faq") {
      setView("faq")
    } else if (view === "contact") {
      setView("contact")
    }
  }

  return (
    <AnimatePresence mode="wait">
      {currentView === "landing" && (
        <LandingView
          key="landing"
          onStartCreating={() => setView("wizard")}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === "wizard" && (
        <WizardView
          key="wizard"
          onBack={() => setView("landing")}
          onFinalize={() => setView("checkout")}
        />
      )}

      {currentView === "checkout" && (
        <CheckoutView key="checkout" />
      )}

      {currentView === "success" && (
        <SuccessView key="success" />
      )}

      {currentView === "generating" && (
        <GeneratingView
          key="generating"
          onComplete={() => setView("gift-locked")}
        />
      )}

      {currentView === "gift-locked" && (
        <GiftLockedView
          key="gift-locked"
          onUnlock={() => setView("gift-unlocked")}
        />
      )}

      {currentView === "gift-unlocked" && (
        <GiftUnlockedView key="gift-unlocked" />
      )}

      {currentView === "template-preview" && (
        <TemplatePreviewView key="template-preview" />
      )}

      {currentView === "templates-hub" && (
        <TemplatesHubView key="templates-hub" />
      )}

      {currentView === "login" && (
        <LoginView key="login" />
      )}

      {currentView === "dashboard" && (
        <DashboardView key="dashboard" />
      )}

      {currentView === "faq" && (
        <FaqView key="faq" />
      )}

      {currentView === "contact" && (
        <ContactView key="contact" />
      )}
    </AnimatePresence>
  )
}
