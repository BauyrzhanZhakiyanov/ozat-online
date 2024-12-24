import React from 'react'
import { WebView } from 'react-native-webview'
import { StyleSheet, View } from 'react-native'

interface VimeoPlayerProps {
  videoId: string
}

const VimeoPlayer = (props: VimeoPlayerProps) => {
  const { videoId } = props
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://player.vimeo.com/video/${videoId}` }}
        style={styles.video}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
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

export default VimeoPlayer
