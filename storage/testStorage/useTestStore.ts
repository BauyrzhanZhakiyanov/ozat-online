import { create } from 'zustand'
import { AttemptModel } from '@/types/api/test'

export interface TaskModel {
  taskOrder: number
  taskId: string
  isCompleted: boolean
  isCorrect: boolean | null
  attempts?: AttemptModel[]
}

export interface TestState {
  testId: string | null
  currentTaskIndex: number
  tasks: TaskModel[]
  totalTasks: number
  testType: 'PRACTICE' | 'TRAINING'
  isCashbackEnabled: boolean
  isDurationAvailable: boolean
  setIsCashbackEnabled: (value: boolean) => void
  setIsDurationAvailable: (value: boolean) => void
  lives: number
  setTestId: (testId: string) => void
  setCurrentTaskIndex: (index: number) => void
  setTasks: (tasks: TaskModel[]) => void
  setTotalTasks: (total: number) => void
  decrementLives: () => void
  setTestType: (type: 'PRACTICE' | 'TRAINING') => void
  userAnswers: Record<string, Record<string, { optionId: string }>>
  setUserAnswer: (
    taskId: string,
    taskQuestionId: string,
    optionId: string,
  ) => void
  taskQuestionCounts: Record<string, number>
  setTaskQuestionCount: (taskId: string, count: number) => void
  clearUserAnswers: () => void
}

export const useTestStore = create<TestState>((set) => ({
  testId: null,
  currentTaskIndex: 0,
  tasks: [],
  totalTasks: 0,
  testType: 'PRACTICE',
  userAnswers: {},
  isCashbackEnabled: false,
  isDurationAvailable: false,
  lives: 0,
  taskQuestionCounts: {},
  setIsCashbackEnabled: (value) => set({ isCashbackEnabled: value }),
  setIsDurationAvailable: (value) => set({ isDurationAvailable: value }),
  setTestId: (testId) => set({ testId }),
  setCurrentTaskIndex: (index) => set({ currentTaskIndex: index }),
  setTasks: (tasks: TaskModel[]) => set({ tasks }),
  setTotalTasks: (total) => set({ totalTasks: total }),
  setUserAnswer: (taskId, taskQuestionId, optionId) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [taskId]: {
          ...state.userAnswers[taskId],
          [taskQuestionId]: { optionId },
        },
      },
    })),
  setTaskQuestionCount: (taskId, count) =>
    set((state) => ({
      taskQuestionCounts: {
        ...state.taskQuestionCounts,
        [taskId]: count,
      },
    })),
  decrementLives: () =>
    set((state) => ({ lives: state.lives > 0 ? state.lives - 1 : 0 })),
  setTestType: (type) => set({ testType: type }),
  clearUserAnswers: () => set({ userAnswers: {} }),
}))
