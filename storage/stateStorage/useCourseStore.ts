import { create } from 'zustand'

interface CourseState {
  courseId: string | null
  courseTitle: string | null
  setCourseData: (id: string, title: string) => void
}

export const useCourseStore = create<CourseState>((set) => ({
  courseId: null,
  courseTitle: null,
  setCourseData: (id: string, title: string) =>
    set({ courseId: id, courseTitle: title }),
}))
