import { VideoModel } from '@/types/video'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

interface VideoPlayerProps {
  video: VideoModel
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { video } = props
  let videoUrl = ''

  if (video.type === 'YOUTUBE') {
    videoUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=0&controls=1`
  } else if (video.type === 'VIMEO') {
    videoUrl = `https://player.vimeo.com/video/${video.videoId}?autoplay=0&controls=1`
  } else {
    return null
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: videoUrl }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          console.error('WebView error: ', nativeEvent)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
})

export default VideoPlayer
