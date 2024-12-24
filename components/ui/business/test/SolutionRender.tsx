import React from 'react'
import { View } from 'react-native'
import VideoPlayer from '@/components/ui/viewers/VideoPlayer'
import ContentRender from '@/utils/content/ContentRender'
import { VideoModel } from '@/types/video'

interface SolutionRenderProps {
  solution: string
}

const SolutionRender = (props: SolutionRenderProps) => {
  const { solution } = props
  const video = parseVideoFromText(solution)

  if (video) {
    return (
      <View>
        <VideoPlayer video={video} />
      </View>
    )
  } else {
    return (
      <View>
        <ContentRender htmlContent={solution} />
      </View>
    )
  }
}

function parseVideoFromText(solutionText: string): VideoModel | null {
  const youTubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const vimeoRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/

  let match = solutionText.match(youTubeRegex)
  if (match && match[1]) {
    const videoId = match[1]
    return {
      id: videoId,
      duration: 0,
      title: '',
      url: match[0],
      lessonId: 0,
      createdAt: '',
      status: 'ACTIVE',
      thumbnailUrl: '',
      type: 'YOUTUBE',
      videoId: videoId,
    }
  }

  match = solutionText.match(vimeoRegex)
  if (match && match[1]) {
    const videoId = match[1]
    return {
      id: videoId,
      duration: 0,
      title: '',
      url: match[0],
      lessonId: 0,
      createdAt: '',
      status: 'ACTIVE',
      thumbnailUrl: '',
      type: 'VIMEO',
      videoId: videoId,
    }
  }

  return null
}

export default SolutionRender
