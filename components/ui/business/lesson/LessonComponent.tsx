import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Lesson } from '@/types/api/lesson'
import CustomText from '@/components/ui/common/Text'
import { Colors } from '@/constants/colors'
import CustomButton from '@/components/ui/button/Button'
import Lock from '@/assets/icons/Lock'
import { Fonts } from '@/constants'
import { useLessonStore } from '@/storage/stateStorage/useLessonStore'
import { useRouter } from 'expo-router'

interface LessonComponentProps {
  lesson: Lesson
  lessonNumber: number
}

const LessonComponent = (props: LessonComponentProps) => {
  const { lesson } = props
  const navigation = useRouter()

  const { setLessonId } = useLessonStore()
  useEffect(() => {
    setLessonId(String(lesson.id))
  }, [lesson.id])

  const isLessonAvailableAndCompleted = lesson.available && lesson.completed

  return (
    <View style={style.lessonContainer}>
      <View
        style={[
          style.lessonText,
          { width: isLessonAvailableAndCompleted ? '60%' : '70%' },
        ]}
      >
        <CustomText style={style.lessonTextStyle}>{lesson.title}</CustomText>
      </View>
      <View style={style.lessonContent}>
        {lesson.available ? (
          lesson.completed ? (
            <View style={style.completedLesson}>
              <View style={style.progressContainer}>
                <CircularProgress
                  value={lesson.progress}
                  radius={16}
                  inActiveStrokeColor={'#e0e0e0'}
                  activeStrokeColor={Colors.primary}
                  duration={500}
                  activeStrokeWidth={6}
                  inActiveStrokeWidth={6}
                  showProgressValue={false}
                />
                <View style={style.centeredContent}>
                  <Text style={style.progressText}>
                    {Math.round(lesson.progress)}%
                  </Text>
                </View>
              </View>
              <CustomButton
                title="Өту"
                style={StyleSheet.flatten([
                  style.lessonButton,
                  { backgroundColor: '#58CC02' },
                ])}
                textStyle={style.lessonButtonText}
                onPress={() => navigation.navigate('Id', { lesson })}
              />
            </View>
          ) : (
            <CustomButton
              title="Өту"
              style={StyleSheet.flatten(style.lessonButton)}
              textStyle={style.lessonButtonText}
              onPress={() => navigation.navigate('Id', { lesson })}
            />
          )
        ) : (
          <View style={style.lockContainer}>
            <Lock />
          </View>
        )}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  lessonContainer: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#B5B3C1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
    elevation: 5,
  },
  lessonText: {},
  lessonTextStyle: {
    ...Fonts.Regular18,
    color: '#0C0A1C',
  },
  lessonContent: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    marginTop: 10,
    fontSize: 14,
    color: '#4caf50',
  },
  lessonButton: {
    width: 77,
    borderRadius: 12,
    height: 25,
    marginLeft: 8,
  },
  lessonButtonText: {
    fontSize: 12,
    color: 'white',
  },
  completedLesson: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  progressContainer: {
    position: 'relative',
    width: 32,
    height: 32,
  },
  centeredContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.primary,
  },
  lockContainer: {},
})

export default LessonComponent
