import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MentorComponent from '../modal/MentorComponent'
import HintComponent from '@/components/ui/business/test/HintComponent'

interface TaskHeaderComponentProps {
  solutionType?: 'TEXT' | 'VIMEO' | 'YOUTUBE' | 'IMAGE'
  solution?: string
  hint?: string
  advancedHint?: string
  isMentorAvailable?: boolean
}

const TaskHeaderComponent = (props: TaskHeaderComponentProps) => {
  const { solutionType, solution, hint, advancedHint, isMentorAvailable } =
    props
  const time = `${Math.floor(Math.random() * 100)} : ${Math.floor(Math.random() * 100)}`
  return (
    <View style={styles.taskHeaderContainer}>
      <View style={styles.taskHeaderContainerZoneQuestion}>
        {hint && <HintComponent hint={hint} advancedHint={advancedHint} />}
      </View>
      <View>
        <Text>{time}</Text>
      </View>
      <View>{isMentorAvailable && <MentorComponent inProgresstest />}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  taskHeaderContainerZoneQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default TaskHeaderComponent
