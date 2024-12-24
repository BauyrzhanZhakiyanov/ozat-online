import { StyleSheet, View } from 'react-native'
import React from 'react'
import CourseCard from './CourseCard'
import CustomText from '../../common/Text'
import { useGetMyCoursesQuery } from '@/store/api/payment'
import { useRouter } from 'expo-router'

const Courses = () => {
  const navigation = useRouter()
  const { data, isLoading, error } = useGetMyCoursesQuery()

  if (isLoading) {
    return (
      <View style={style.courseList}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={style.placeholderCard} />
        ))}
      </View>
    )
  }

  if (error) {
    return <CustomText>Error fetching courses</CustomText>
  }

  return (
    <View style={style.courseList}>
      {data?.map((course) => (
        <CourseCard
          key={course.courseId}
          course={course}
          onPress={() =>
            navigation.navigate('CourseDetails', { courseId: course.courseId })
          }
        />
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  courseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 16,
  },
  placeholderCard: {
    width: '45%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
})

export default Courses
