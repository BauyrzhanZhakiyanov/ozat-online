import { create } from 'zustand'

interface TestState {
  selectedTestTabs: { [lessonId: string]: string }
  setSelectedTestTab: (lessonId: string, tab: string) => void
}

export const useSelectTestStore = create<TestState>((set) => ({
  selectedTestTabs: {},
  setSelectedTestTab: (lessonId, tab) =>
    set((state) => ({
      selectedTestTabs: {
        ...state.selectedTestTabs,
        [lessonId]: tab,
      },
    })),
}))
