import React from 'react'
import { Text } from 'react-native'
import MCQQuestionComponent from './MCQQuestionComponent'
import { TaskModel } from '@/types/api/test'

interface QuestionComponentProps {
  task: TaskModel
}

const QuestionComponent = (props: QuestionComponentProps) => {
  const { task } = props
  if (!task) {
    return <Text>No task available</Text>
  }

  const questionWrapper = task.taskQuestions[0]
  if (!questionWrapper) {
    return <Text>No question available</Text>
  }

  if (!questionWrapper) {
    return <Text>No question data available</Text>
  }

  switch (questionWrapper.type) {
    case 'MCQ':
      return (
        <MCQQuestionComponent question={questionWrapper} taskId={task.id} />
      )
    default:
      return <Text>Unsupported question type</Text>
  }
}

export default QuestionComponent
