import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { WebView } from 'react-native-webview'
import ImageViewer from 'react-native-image-zoom-viewer'
import { getDownloadURL, ref } from 'firebase/storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackBar from '../../../components/ui/header/BackBar'
import ShareButton from '@/assets/icons/ShareButton'
import { storage } from '@/store/firebase'
import { useLocalSearchParams, useRouter } from 'expo-router'

const FileViewerScreen = () => {
  const { file, lessonId } = useLocalSearchParams()
  const navigation = useRouter()

  const [content, setContent] = useState('')
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const fileName = file.path
      const storagePath = `uploads/files/${lessonId}/${fileName}`
      const fileRef = ref(storage, storagePath)
      const url = await getDownloadURL(fileRef)
      const fileType = file.fileType.toLowerCase()

      try {
        if (fileType === 'pdf') {
          const encodedUrl = encodeURIComponent(url)
          const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodedUrl}`
          setContent(googleDocsUrl)
        } else if (fileType === 'image') {
          setContent(url)
        } else {
          Alert.alert(
            'Unsupported File',
            'This file type is not supported for preview.',
          )
        }
      } catch (error) {
        console.error('Error loading file:', error)
        Alert.alert('Error', 'Failed to load file.')
      } finally {
        setisLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  const handleShare = async () => {}

  return (
    <SafeAreaView style={styles.container}>
      <BackBar text={'Файлдар'} onPress={() => navigation.back()} />
      <View style={styles.shareZone}>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <ShareButton />
        </TouchableOpacity>
      </View>
      {file.fileType.toLowerCase() === 'pdf' ? (
        <WebView
          source={{ uri: content }}
          style={styles.webview}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            console.warn('WebView error: ', nativeEvent)
            Alert.alert('Error', 'Failed to load PDF.')
          }}
        />
      ) : (
        <ImageViewer
          imageUrls={[{ url: content }]}
          enableSwipeDown={true}
          onSwipeDown={() => {}}
          renderIndicator={(currentIndex, allSize) => (
            <Text style={{ color: 'white' }}>
              {(currentIndex ?? 0) + 1} / {allSize}
            </Text>
          )}
          backgroundColor="#000"
          loadingRender={() => <ActivityIndicator size="large" color="#fff" />}
          failImageSource={{
            url: 'https://www.example.com/fail-image.png',
          }}
        />
      )}
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    width: width,
    height: height,
  },
  shareZone: {
    position: 'relative',
    height: 50,
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default FileViewerScreen
