import { Section } from '@/types/api/section'

export interface FullCourse {
  id: number
  title: string
  description: string
  image: string
  backgroundColor: string
  backgroundImage: string
  textColor: string
  progressColor: string
  progress: number
  priority: number
  sections: Section[]
}

export interface CourseResponse {
  courseId: string
  courseTitle: string
  courseImage: string
  courseBackgroundColor: string
  courseProgressColor: string
  courseProgress: number
  priority: number
}
