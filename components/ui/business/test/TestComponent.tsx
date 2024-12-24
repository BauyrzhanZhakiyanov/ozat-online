import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MCQQuestionComponent from './MCQ/MCQQuestionComponent'
import PaginationPractice from './PaginationPractice'
import PaginationTraining from './PaginationTraining'
import TestControllerZone from './TestControllerZone'
import { TaskFullModel, TestFullModel } from '@/types/api/test'
import { useTestStore } from '@/storage/testStorage/useTestStore'
import TaskHeaderComponent from '@/components/ui/business/task/TaskHeaderComponent'
import {
  useAnswerTaskMutation,
  useLazyGetTestTaskQuery,
} from '@/store/api/assessment'

interface TestComponentProps {
  test: TestFullModel
}

const TestComponent = (props: TestComponentProps) => {
  const { test } = props
  const [answerTask, { isLoading: isSubmitting }] = useAnswerTaskMutation()

  const isImmediateCheckAvailable =
    test?.test.testTemplate.checkImmediatelyEnabled

  // TODO refactor
  const [getTask] = useLazyGetTestTaskQuery()
  const [currentTask, setCurrentTask] = useState<TaskFullModel | null>(null)

  const {
    currentTaskIndex,
    totalTasks,
    tasks,
    isCashbackEnabled,
    isDurationAvailable,
    setTestType,
    setTotalTasks,
    setTasks,
    setCurrentTaskIndex,
    setTestId,
    setIsCashbackEnabled,
    setIsDurationAvailable,
    userAnswers,
  } = useTestStore()

  useEffect(() => {
    if (test) {
      const testType = isImmediateCheckAvailable ? 'TRAINING' : 'PRACTICE'
      setTestType(testType)
      setTotalTasks(test.test.totalTasks || 0)

      setTasks(test.test.taskIds || [])

      setCurrentTaskIndex(
        test.test.currentTaskOrder ? test.test.currentTaskOrder - 1 : 0,
      )
      setTestId(test.test.id)

      setIsCashbackEnabled(test.test.testTemplate.cashbackEnabled || false)
      setIsDurationAvailable(test.test.durationAvailable || false)
    }
  }, [test])

  useEffect(() => {
    if (test && tasks.length > 0) {
      const currentTaskId = tasks[currentTaskIndex].taskId
      getTask({
        taskId: currentTaskId,
        testId: test.test.id,
      })
        .unwrap()
        .then((task) => {
          setCurrentTask(task)
        })
        .catch((error) => {
          console.log('Error fetching task:', error)
        })
    }
  }, [currentTaskIndex, test, tasks])

  const submitAnswerForCurrentTask = useCallback(async () => {
    if (!currentTask) {
      return
    }

    const currentTaskId = currentTask.id
    const currentQuestion = currentTask.taskQuestions[0].question
    const questionId = currentQuestion.id

    const userAnswer =
      userAnswers[currentTaskId]?.[questionId]?.optionId || null

    if (userAnswer) {
      try {
        const response = await answerTask({
          testId: test.test.id,
          taskId: currentTaskId,
          body: {
            questionId: questionId,
            type: 'MCQ',
            data: {
              userAnswerId: userAnswer,
            },
          },
        }).unwrap()

        if (response.status === 200 || response.status === 201) {
          console.log('Answer submitted successfully:', response)
        } else {
          Alert.alert(
            'Submission Failed',
            'Unable to submit your answer. Please try again.',
          )
          console.error('Submission failed with status:', response.status)
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while submitting your answer.')
        console.error('Error submitting answer:', error)
      } finally {
      }
    } else {
      console.log('No answer selected for the current task.')
    }
  }, [currentTask, userAnswers, test])

  const onPaginationChange = useCallback(
    async (newIndex: number) => {
      if (newIndex < 0 || newIndex >= totalTasks) {
        return
      }

      if (!currentTask) {
        return
      }

      await submitAnswerForCurrentTask()

      setCurrentTaskIndex(newIndex)
    },
    [currentTask, submitAnswerForCurrentTask, totalTasks, setCurrentTaskIndex],
  )

  const answeredTasks = useMemo(() => {
    return tasks.map((task) => {
      const taskId = task.taskId
      return userAnswers[taskId] && Object.keys(userAnswers[taskId]).length > 0
    })
  }, [tasks, userAnswers])

  return (
    <View style={styles.testContainer}>
      <View style={styles.testPaginationZone}>
        {isImmediateCheckAvailable ? (
          <PaginationTraining />
        ) : (
          <PaginationPractice
            totalTasks={totalTasks}
            currentTaskIndex={currentTaskIndex}
            onPress={onPaginationChange}
            answeredTasks={answeredTasks}
          />
        )}
      </View>

      {/* <View style={styles.testHeaderZone}>
        <TestHeader
          isCashbackEnabled={isCashbackEnabled}
          cashBackAmount={200} // TODO: Get cashback amount from the API
          isDurationAvailable={isDurationAvailable}
          duration={test?.test.duration || 0}
          isCompletedTest={false}
        />
      </View> */}

      <KeyboardAwareScrollView
        style={styles.testZone}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.task}>
          {currentTask && (
            <TaskHeaderComponent
              hint={
                currentTask?.attemptActions[0]?.hintEnabled
                  ? currentTask.taskQuestions[0]?.question.hint
                  : undefined
              }
              advancedHint={
                currentTask?.attemptActions[0]?.advancedHintEnabled
                  ? currentTask.taskQuestions[0]?.question.advancedHint
                  : undefined
              }
              isMentorAvailable={currentTask?.attemptActions[0]?.mentorEnabled}
            />
          )}

          {currentTask && (
            <MCQQuestionComponent
              question={currentTask.taskQuestions[0].question}
              isFinished={false}
              userAnswer={
                userAnswers[currentTask.id]?.[
                  currentTask.taskQuestions[0].question.id
                ]?.optionId
              }
              taskId={currentTask.id}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

      {isSubmitting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <View style={styles.testFooterZone}>
        <TestControllerZone
          onPaginationChange={onPaginationChange}
          submitAnswerForCurrentTask={submitAnswerForCurrentTask}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  testZone: {
    flex: 1,
  },
  testContainer: {
    flexGrow: 1,
  },
  task: {
    flexGrow: 1,
    paddingLeft: 8,
    paddingTop: 10,
  },
  testPaginationZone: {
    flexShrink: 0,
  },
  testHeaderZone: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  testFooterZone: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
})

export default TestComponent
