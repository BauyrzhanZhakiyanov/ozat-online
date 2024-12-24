import { create } from 'zustand'

interface SectionState {
  sectionId: string | null
  setSectionId: (id: string) => void
}

export const useSectionStore = create<SectionState>((set) => ({
  sectionId: null,
  setSectionId: (id: string) => set({ sectionId: id }),
}))
