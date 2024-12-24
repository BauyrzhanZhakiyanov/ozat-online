import { create } from 'zustand'

interface WhatsAppStore {
  defaultWhatsAppNumber: string
  whatsappNumber: string
  setWhatsAppNumber: (number: string) => void
  setDefaultWhatsAppNumber: (number: string) => void
}

export const useWhatsAppStore = create<WhatsAppStore>((set) => ({
  defaultWhatsAppNumber: '',
  whatsappNumber: '',
  setWhatsAppNumber: (number: string) => set({ whatsappNumber: number }),
  setDefaultWhatsAppNumber: (number: string) =>
    set({ defaultWhatsAppNumber: number }),
}))
