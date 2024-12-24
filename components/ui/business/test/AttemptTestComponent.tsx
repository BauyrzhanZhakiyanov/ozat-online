import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FinishedControllerComponent from './FinishedControllerCompoenent'
import FinishedTaskComponent from './FinishedTaskComponent'
import FinsihedComponentSolution from './FinsihedComponentSolution'
import PaginationFinished from './PaginationFinished'
import CashBackComponent from '@/components/ui/business/CashBackComponent'
import { useFinishedTestStore } from '@/storage/testStorage/useFinishedTestStore'
import { TestAttemptModel } from '@/types/api/test'

export interface AttemptTestComponentProps {
  test: TestAttemptModel
}

const AttemptTestComponent = ({ test }: AttemptTestComponentProps) => {
  const {
    isCashbackEnabled,
    currentTaskIndex,
    totalTasks,
    cashBackAmount,
    setCurrentTaskIndex,
    setTotalTasks,
    setIsCashbackEnabled,
    setIsDurationAvailable,
    setCashBackAmount,
  } = useFinishedTestStore()

  useEffect(() => {
    if (test) {
      setCurrentTaskIndex(0)
      setTotalTasks(test.totalQuestions)
      setIsCashbackEnabled(true) // TODO: should be sent from backend in the test itself
      setIsDurationAvailable(true)
      setCashBackAmount(200)
    }
  }, [test])

  const currentTask = test?.taskResults[currentTaskIndex]

  return (
    <View style={styles.container}>
      <PaginationFinished
        totalTasks={test?.totalQuestions}
        currentTaskIndex={currentTaskIndex}
        taskResults={test?.taskResults}
        onPress={(index) => {
          if (index !== currentTaskIndex) {
            setCurrentTaskIndex(index)
          }
        }}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            {isCashbackEnabled && (
              <CashBackComponent cashbackAmount={cashBackAmount} />
            )}
          </View>
          {currentTask && <FinishedTaskComponent task={currentTask} />}
          {currentTask?.question?.solution && (
            <FinsihedComponentSolution
              solutionText={currentTask.question.solution}
              isCorrect={currentTask.isCorrect}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
      <FinishedControllerComponent
        currentTaskIndex={currentTaskIndex}
        totalTasks={totalTasks}
        onPressNext={() => {
          if (currentTaskIndex < totalTasks - 1) {
            setCurrentTaskIndex(currentTaskIndex + 1)
          }
        }}
        onPressPrevious={() => {
          if (currentTaskIndex > 0) {
            setCurrentTaskIndex(currentTaskIndex - 1)
          }
        }}
        isCorrect={currentTask?.isCorrect}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  solutionContainer: {
    marginTop: 16,
  },
})

export default AttemptTestComponent
