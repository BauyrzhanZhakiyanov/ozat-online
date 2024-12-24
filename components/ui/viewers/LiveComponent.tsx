import React from 'react'
import { View } from 'react-native'
import VideoPlayer from './VideoPlayer'
import { LiveModel } from '@/types/api/live'

interface LiveComponentProps {
  lives: LiveModel[]
}

const LiveComponent = ({ lives }: LiveComponentProps) => {
  return (
    <View>
      <VideoPlayer videos={lives} />
    </View>
  )
}

export default LiveComponent
