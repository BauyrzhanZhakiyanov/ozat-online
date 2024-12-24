import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useTestStore } from '@/storage/testStorage/useTestStore'
import { useGetTestTaskQuery } from '@/store/api/assessment'
import Question from '@/components/ui/business/test/MCQ/Question'

const TestQuestion = () => {
  const {
    currentTaskIndex,
    tasks,
    testId,
    userAnswers,
    // setInitialUserAnswer,
    setTaskQuestionCount,
  } = useTestStore()
  const currentTask = tasks[currentTaskIndex]
  const currentTaskId = currentTask?.taskId
  const { data, isLoading } = useGetTestTaskQuery({
    testId,
    taskId: currentTaskId,
  })

  // TODO refactor
  useEffect(() => {
    if (data) {
      const taskQuestions = data.taskQuestions
      setTaskQuestionCount(currentTaskId, taskQuestions.length)
      taskQuestions.forEach((taskQuestion) => {
        const userAnswerId = taskQuestion.userAnswerId
        if (userAnswerId) {
          const answer = {
            type: taskQuestion.question.type,
            data: {
              userAnswerId: userAnswerId,
            },
          }
          // TODO refactor
          // setInitialUserAnswer(
          //   currentTaskId,
          //   taskQuestion.id.toString(),
          //   answer,
          // )
        }
      })
    }
  }, [data])

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!data) {
    return <Text>No task data available</Text>
  }

  return (
    <View style={styles.container}>
      {data.taskQuestions.map((taskQuestion) => {
        // TODO why null
        const userAnswer =
          userAnswers[currentTaskId]?.[taskQuestion.id]?.currentAnswer || null

        return (
          <Question
            key={taskQuestion.id}
            taskQuestion={taskQuestion}
            userAnswer={userAnswer}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default TestQuestion
