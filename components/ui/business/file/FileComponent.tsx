import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import FileItem from './FileItem'
import { FileModel } from '@/types/api/file'

interface FileComponentProps {
  files: FileModel[]
  lessonId: string
}

const FileComponent = (props: FileComponentProps) => {
  const { files, lessonId } = props

  const renderItem = ({ item }: { item: FileModel }) => (
    <FileItem file={item} lessonId={lessonId} />
  )

  return (
    <View style={styles.container}>
      {files.length === 0 ? (
        <Text>No files available.</Text>
      ) : (
        <FlatList
          data={files}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
})

export default FileComponent
