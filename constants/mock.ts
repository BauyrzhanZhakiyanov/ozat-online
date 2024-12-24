import { VideoModel } from '@/types/video'

export const Videos: VideoModel[] = [
  {
    id: '1',
    duration: 353,
    lessonId: 1,
    status: 'ACTIVE',
    thumbnailUrl:
      'https://i.vimeocdn.com/video/917386652-56f99b583c5591aa089d15def8a7aba5809966b6c8d20b101af1bcc3800d9ca7-d_295x166',
    title: 'Introduction to Algebra',
    url: 'https://vimeo.com/434332707',
    videoId: '434332707',
    type: 'VIMEO',
    createdAt: '2023-09-17T14:30:00Z',
  },
  {
    id: '2',
    duration: 1800,
    lessonId: 1,
    status: 'ACTIVE',
    thumbnailUrl:
      'https://i.vimeocdn.com/video/934859427-6d11841d3e4d9e38e1e47e4a95f17fe5254a0007a5756a0ed3267c1b4cb07d35-d_295x166',
    title: 'Advanced Geometry',
    url: 'https://vimeo.com/444539491',
    videoId: '434332707',
    type: 'VIMEO',
    createdAt: '2023-09-17T14:30:00Z',
  },
]
