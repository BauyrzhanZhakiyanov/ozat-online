import { FileModel } from '@/types/api/file'
import { VideoModel } from '@/types/video'
import { LiveModel } from '@/types/api/live'
import { TheoryModel } from '@/types/api/theory'
import { TestShortModel } from '@/types/api/test'

export interface Lesson {
  id: number
  title: string
  progress: number
  available: boolean
  completed: boolean
}

export interface LessonModelFull {
  id: string
  title: string
  unlockDateTime: string
  difficulty: string
  status: 'ACTIVE' | 'INACTIVE'
  lives: LiveModel[]
  videos: VideoModel[]
  files: FileModel[]
  theories: TheoryModel[]
  locked: boolean
  payable: boolean
  tests: TestShortModel[]
}
