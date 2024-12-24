import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import CustomImage from '../../image/Image'
import CustomText from '@/components/ui/common/Text'
import Share from '@/assets/icons/Share'
import { Fonts } from '@/constants'
import { FileModel } from '@/types/api/file'
import { useRouter } from 'expo-router'

const pdfImg = require('@/assets/images/business/etc/pdf.png')
const wordImg = require('@/assets/images/business/etc/word.png')

interface FileItemProps {
  file: FileModel
  lessonId: string
}

const FileItem = (props: FileItemProps) => {
  const { file, lessonId } = props
  const navigation = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = () => {
    navigation.navigate('FileViewerScreen', { file, lessonId })
  }

  return (
    <View style={styles.container}>
      {file.fileType === 'PDF' ? (
        <CustomImage imagePath={pdfImg} style={{ width: 56, height: 42 }} />
      ) : file.fileType === 'DOC' ? (
        <CustomImage imagePath={wordImg} style={{ width: 24, height: 24 }} />
      ) : file.fileType === 'XLS' ? (
        <Icon name={'file-excel'} size={30} color="#000" />
      ) : file.fileType === 'IMAGE' ? (
        <Icon name={'file-image'} size={30} color="#000" />
      ) : (
        <Icon name={'file'} size={30} color="#000" />
      )}
      <CustomText style={styles.title}>
        {file.title ? file.title : 'Қосымша файл'}
      </CustomText>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleOpen} style={styles.button}>
          <Share />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
    width: '100%',
    gap: 4,
  },
  title: {
    flex: 1,
    ...Fonts.Medium18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
})

export default FileItem
