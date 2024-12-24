import React from 'react'
import { StyleSheet, View } from 'react-native'
import HintComponent from './HintComponent'
import MCQQuestionComponent from './MCQ/MCQQuestionComponent'
import { TestAttemptModel } from '@/types/api/test'

interface FinishedTaskComponentProps {
  task: TestAttemptModel['taskResults'][number]
}

const FinishedTaskComponent = (props: FinishedTaskComponentProps) => {
  const { task } = props
  return (
    <View style={styles.taskContainer}>
      <View style={styles.questionHeader}>
        {task.question && task.question.hint && (
          <HintComponent
            hint={task.question.hint}
            advancedHint={task?.question?.advancedHint}
          />
        )}
      </View>
      <View>
        {task.question && task.question.type === 'MCQ' && (
          <MCQQuestionComponent
            question={task.question}
            isFinished={true}
            userAnswer={task.userAnswer}
            taskId={''}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
  },
  questionHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default FinishedTaskComponent
