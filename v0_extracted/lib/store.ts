"use client"

import { create } from "zustand"

// ============================================
// GIFT CONFIG - 10-Step Wizard Data Structure
// ============================================
// This is the main data object for the gift creation wizard.
// It stores all 10 answers and is JSON-ready for backend integration.
// Backend developers: Send this object to your API endpoint after checkout.

export type TargetType = "conjoint" | "ami" | "parent" | "enfant" | null
export type OccasionType = "anniversaire" | "saint-valentin" | "mariage" | "plaisir" | null
export type ToneType = "poetique" | "minimaliste" | "fun" | "luxueux" | null
export type InteractionType = "storytelling" | "galerie" | "jeu" | "lettre" | null
export type ComplexityType = "simple" | "riche" | "premium" | "custom" | null
export type MusicType = "none" | "calme" | "festive" | "nature" | null
export type SecurityType = "public" | "password" | "email" | "date" | null

export type TemplateType = "memory-lane" | "golden-ticket" | "secret-odyssey" | "love-letter" | "birthday-blast" | "star-dedication" | "playlist-story" | "quest-adventure" | null

export type AppView = 
  | "landing" 
  | "wizard" 
  | "generating" 
  | "gift-locked" 
  | "gift-unlocked"
  | "template-preview"
  | "templates-hub"
  | "login"
  | "dashboard"
  | "checkout"
  | "success"
  | "faq"
  | "contact"

// GiftConfig: Complete configuration from the 10-step wizard
export interface GiftConfig {
  // Step 1: Target
  target: TargetType
  // Step 2: Occasion
  occasion: OccasionType
  // Step 3: Tone/Ambiance
  tone: ToneType
  // Step 4: Interaction Type
  interaction: InteractionType
  // Step 5: Complexity Level
  complexity: ComplexityType
  // Step 6: Music/Sound
  music: MusicType
  // Step 7: Security/Access
  security: SecurityType
  // Step 8: Recipient Name
  recipientName: string
  // Step 9: Personal Message
  message: string
  // Step 10: Media/Images
  images: File[]
}

// Legacy GiftData for backwards compatibility
export interface GiftData {
  recipientName: string
  ambiance: ToneType
  message: string
  images: File[]
  premiumOptions: {
    customDomain: boolean
    animations3d: boolean
    securePassword: boolean
  }
  password: string
}

export interface CreatedGift {
  id: string
  recipientName: string
  template: string
  createdAt: string
  status: "Envoyé" | "Brouillon"
  views: number
  slug: string
}

// Pricing calculation helper
export function calculatePrice(config: GiftConfig): { base: number; addons: { name: string; price: number }[]; total: number } {
  const base = 19
  const addons: { name: string; price: number }[] = []
  
  // Add-ons based on selections
  if (config.interaction === "jeu") {
    addons.push({ name: "Expérience interactive", price: 5 })
  }
  if (config.complexity === "riche") {
    addons.push({ name: "Animations enrichies", price: 4 })
  }
  if (config.complexity === "premium") {
    addons.push({ name: "Experience premium", price: 8 })
  }
  if (config.music && config.music !== "none") {
    addons.push({ name: "Ambiance sonore", price: 3 })
  }
  if (config.security === "password") {
    addons.push({ name: "Protection par mot de passe", price: 2 })
  }
  
  const total = base + addons.reduce((sum, addon) => sum + addon.price, 0)
  return { base, addons, total }
}

interface AppState {
  currentView: AppView
  // New 10-step wizard config
  giftConfig: GiftConfig
  // Legacy giftData for backwards compatibility
  giftData: GiftData
  selectedTemplate: TemplateType
  isAuthenticated: boolean
  user: { email: string } | null
  createdGifts: CreatedGift[]
  currentGiftSlug: string | null
  setView: (view: AppView) => void
  // New config update method
  updateGiftConfig: (data: Partial<GiftConfig>) => void
  resetGiftConfig: () => void
  // Legacy methods
  updateGiftData: (data: Partial<GiftData>) => void
  resetGiftData: () => void
  setSelectedTemplate: (template: TemplateType) => void
  login: (email: string) => void
  logout: () => void
  addCreatedGift: (gift: CreatedGift) => void
  setCurrentGiftSlug: (slug: string) => void
}

const initialGiftConfig: GiftConfig = {
  target: null,
  occasion: null,
  tone: null,
  interaction: null,
  complexity: null,
  music: null,
  security: null,
  recipientName: "",
  message: "",
  images: [],
}

const initialGiftData: GiftData = {
  recipientName: "",
  ambiance: null,
  message: "",
  images: [],
  premiumOptions: {
    customDomain: false,
    animations3d: false,
    securePassword: false,
  },
  password: "secret123",
}

export const useAppStore = create<AppState>((set) => ({
  currentView: "landing",
  giftConfig: initialGiftConfig,
  giftData: initialGiftData,
  selectedTemplate: null,
  isAuthenticated: false,
  user: null,
  createdGifts: [
    {
      id: "1",
      recipientName: "Marie",
      template: "Romantique",
      createdAt: "12 Mars 2026",
      status: "Envoyé",
      views: 3,
      slug: "marie-gift-abc123",
    },
    {
      id: "2",
      recipientName: "Thomas",
      template: "Golden Ticket",
      createdAt: "5 Mars 2026",
      status: "Brouillon",
      views: 0,
      slug: "thomas-gift-def456",
    },
  ],
  currentGiftSlug: null,
  setView: (view) => set({ currentView: view }),
  
  // New config methods
  updateGiftConfig: (data) =>
    set((state) => {
      const newConfig = { ...state.giftConfig, ...data }
      // Sync with legacy giftData for preview compatibility
      const newGiftData = {
        ...state.giftData,
        recipientName: newConfig.recipientName,
        ambiance: newConfig.tone,
        message: newConfig.message,
        images: newConfig.images,
        premiumOptions: {
          ...state.giftData.premiumOptions,
          securePassword: newConfig.security === "password",
          animations3d: newConfig.complexity === "riche",
        },
      }
      return { giftConfig: newConfig, giftData: newGiftData }
    }),
  resetGiftConfig: () => set({ giftConfig: initialGiftConfig, giftData: initialGiftData }),
  
  // Legacy methods
  updateGiftData: (data) =>
    set((state) => ({
      giftData: { ...state.giftData, ...data },
    })),
  resetGiftData: () => set({ giftData: initialGiftData }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  login: (email) => set({ isAuthenticated: true, user: { email } }),
  logout: () => set({ isAuthenticated: false, user: null }),
  addCreatedGift: (gift) =>
    set((state) => ({
      createdGifts: [gift, ...state.createdGifts],
    })),
  setCurrentGiftSlug: (slug) => set({ currentGiftSlug: slug }),
}))
