export interface VideoModel {
  id: string
  duration: number
  title: string
  url: string
  lessonId: number
  createdAt: string
  status: 'ACTIVE' | 'INACTIVE' | 'CREATED' | 'ARCHIVED'
  thumbnailUrl: string
  type: 'YOUTUBE' | 'VIMEO' | 'ZOOM' | 'GOOGLE_MEET'
  videoId: string
}

export type Status = 'ACTIVE' | 'INACTIVE' | 'CREATED' | 'ARCHIVED'
