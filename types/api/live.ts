export interface LiveModel {
  id: string
  startTime: string
  endTime: string
  title: string
  url: string
  lessonId: string
  createdAt: string
  status: 'ACTIVE' | 'INACTIVE' | 'CREATED' | 'ARCHIVED'
  thumbnailUrl: string
  type: 'YOUTUBE' | 'VIMEO' | 'ZOOM' | 'GOOGLE_MEET'
  videoId: string
}
