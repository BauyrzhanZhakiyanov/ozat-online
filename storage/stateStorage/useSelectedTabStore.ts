import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface selectedTabState {
  selectedTabs: { [lessonId: string]: string | null }
  setSelectedTab: (lessonId: string, tab: string | null) => void
}

export const useSelectedTabStore = create<selectedTabState>()(
  persist(
    (set, get) => ({
      selectedTabs: {},
      setSelectedTab: (lessonId, tab) =>
        set((state) => ({
          selectedTabs: { ...state.selectedTabs, [lessonId]: tab },
        })),
    }),
    {
      name: 'lesson-storage', // Unique name for AsyncStorage
      getStorage: () => AsyncStorage,
    },
  ),
)
