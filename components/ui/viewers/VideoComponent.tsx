import React from 'react'
import { View } from 'react-native'
import { VideoModel } from '@/types/video'
import VideoPlayer from './VideoPlayer'

interface VideoComponentProps {
  videos: VideoModel[]
}

const VideoComponent = (props: VideoComponentProps) => {
  const { videos } = props
  return (
    <View>
      {videos.map((video) => (
        <VideoPlayer key={video.id} video={video} />
      ))}
    </View>
  )
}

export default VideoComponent
