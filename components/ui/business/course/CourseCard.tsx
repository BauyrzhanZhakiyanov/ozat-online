import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress'
import { LinearGradient } from 'expo-linear-gradient'
import { CourseResponse } from '@/types/api/course'
import { getCourseImageUrl } from '@/store/firebase/file'
import CustomText from '../../common/Text'

interface CourseCardProps {
  course: CourseResponse
  onPress?: () => void
}

const CourseCard = ({ course, onPress }: CourseCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // TODO remove react native progress

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getCourseImageUrl(course.courseImage)
        setImageUrl(url)
      } catch (error) {
        console.error('Failed to load image:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchImageUrl()
  }, [course.courseImage])

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />
  }

  return (
    <TouchableOpacity onPress={onPress}>
      {course.courseBackgroundColor.split(',').length > 1 ? (
        <LinearGradient
          // @ts-ignore
          colors={course.courseBackgroundColor.split(',')}
          style={styles.cardBasic}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Text>Image not available</Text>
          )}
          <CustomText style={{ color: 'white', textAlign: 'center' }}>
            {course.courseTitle}
          </CustomText>
          <View style={{ marginVertical: 8 }}>
            <Progress.Bar
              progress={course.courseProgress / 100}
              color={course.courseProgressColor}
            />
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.cardBasic,
            { backgroundColor: course.courseBackgroundColor },
          ]}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Text>Image not available</Text>
          )}
          <Text>{course.courseTitle}</Text>
          <View style={{ marginVertical: 8 }}>
            <Progress.Bar
              progress={course.courseProgress / 100}
              color={course.courseProgressColor}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardBasic: {
    padding: 16,
    borderRadius: 10,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CourseCard
