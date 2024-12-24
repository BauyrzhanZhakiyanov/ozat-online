import React from 'react'
import { WebView } from 'react-native-webview'
import { StyleSheet, View } from 'react-native'

interface YouTubePlayerProps {
  videoId: string
}

const YouTubePlayer = (props: YouTubePlayerProps) => {
  const { videoId } = props
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        style={styles.video}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  video: {
    flex: 1,
  },
})

export default YouTubePlayer
