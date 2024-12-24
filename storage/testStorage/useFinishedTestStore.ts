import { create } from 'zustand'
import { TestAttemptModel } from '@/types/api/test'

export interface FinishedTestState {
  attemptId: string
  setAttemptId: (attemptId: string) => void
  isDurationAvailable: boolean
  setIsDurationAvailable: (value: boolean) => void
  isCashbackEnabled: boolean
  setIsCashbackEnabled: (value: boolean) => void
  cashBackAmount: number
  setCashBackAmount: (value: number) => void
  duration: number
  setDuration: (value: number) => void
  totalTasks: number
  setTotalTasks: (value: number) => void
  currentTaskIndex: number
  setCurrentTaskIndex: (index: number) => void
  tasks: TestAttemptModel['taskResults']
  setTasks: (tasks: TestAttemptModel['taskResults']) => void
}

export const useFinishedTestStore = create<FinishedTestState>((set, get) => ({
  attemptId: '',
  setAttemptId: (attemptId) => set({ attemptId }),
  isDurationAvailable: false,
  setIsDurationAvailable: (value) => set({ isDurationAvailable: value }),
  isCashbackEnabled: false,
  setIsCashbackEnabled: (value) => set({ isCashbackEnabled: value }),
  cashBackAmount: 0,
  setCashBackAmount: (value) => set({ cashBackAmount: value }),
  duration: 0,
  setDuration: (value) => set({ duration: value }),
  totalTasks: 0,
  setTotalTasks: (value) => set({ totalTasks: value }),
  currentTaskIndex: 0,
  setCurrentTaskIndex: (index) => set({ currentTaskIndex: index }),
  tasks: [] as unknown as TestAttemptModel['taskResults'],
  setTasks: (tasks) => set({ tasks }),
}))
