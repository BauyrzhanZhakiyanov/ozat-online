import { Lesson } from '@/types/api/lesson'

export interface Section {
  id: number
  title: string
  image: string
  backgroundColor: string
  progress: number
  priority: number
  lessons: Lesson[]
}
