import { create } from 'zustand'

interface LessonState {
  lessonId: string | null
  setLessonId: (id: string) => void
}

export const useLessonStore = create<LessonState>((set) => ({
  lessonId: null,
  setLessonId: (id: string) => set({ lessonId: id }),
}))
