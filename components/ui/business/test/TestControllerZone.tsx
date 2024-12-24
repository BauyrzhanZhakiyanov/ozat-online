import React, { useMemo } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useFinishTestMutation } from '@/store/api/assessment'
import { useTestStore } from '@/storage/testStorage/useTestStore'
import LeftArrowColored from '@/assets/icons/LeftArrowColored'
import RightArrowColored from '@/assets/icons/RightArrowColored'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'

interface TestControllerZoneProps {
  onPaginationChange: (index: number) => void
  submitAnswerForCurrentTask: () => Promise<void>
}

const TestControllerZone = (props: TestControllerZoneProps) => {
  const { onPaginationChange, submitAnswerForCurrentTask } = props
  const [finishTest] = useFinishTestMutation()
  const navigation = useRouter()
  const {
    currentTaskIndex,
    totalTasks,
    userAnswers,
    testId,
    clearUserAnswers,
    tasks,
  } = useTestStore()

  const allTasksAnswered = useMemo(() => {
    return tasks.every((task) => {
      const taskId = task.taskId
      const answeredQuestions = userAnswers[taskId]
      return answeredQuestions && Object.keys(answeredQuestions).length > 0
    })
  }, [tasks, userAnswers])

  const handleSubmit = async () => {
    try {
      await submitAnswerForCurrentTask()
      if (testId) {
        const response = await finishTest(testId).unwrap()

        const { correctAnswers, attemptId } = response

        setTimeout(() => {
          navigation.replace('ShowResults', {
            testId: testId ? testId : '',
            attemptId: attemptId,
            correctAnswersCount: correctAnswers,
            totalTasks: totalTasks,
          })
          clearUserAnswers()
        }, 100)
      }
    } catch (_) {
      Alert.alert('Error', 'An error occurred while submitting the test.')
    }
  }

  const renderPrevButton = () => {
    return (
      <TouchableOpacity
        style={[styles.PaginationButton, { backgroundColor: Colors.white }]}
        onPress={() => onPaginationChange(currentTaskIndex - 1)}
        disabled={currentTaskIndex === 0}
      >
        <LeftArrowColored />
        <Text style={[{ color: Colors.primary, ...Fonts.Bold18 }]}>Артқа</Text>
      </TouchableOpacity>
    )
  }

  const renderNextButton = () => {
    return (
      <TouchableOpacity
        style={[styles.PaginationButton, { backgroundColor: Colors.white }]}
        onPress={() => onPaginationChange(currentTaskIndex + 1)}
        disabled={currentTaskIndex >= totalTasks - 1}
      >
        <Text style={[{ color: Colors.primary, ...Fonts.Bold18 }]}>Алға</Text>
        <RightArrowColored />
      </TouchableOpacity>
    )
  }

  const renderSubmitButton = () => {
    if (allTasksAnswered) {
      return (
        <>
          <TouchableOpacity
            style={[
              styles.PaginationButton,
              { backgroundColor: Colors.primary },
            ]}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: Colors.white, ...Fonts.Bold18 }}>Аяқтау</Text>
          </TouchableOpacity>
        </>
      )
    }
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {renderPrevButton()}
        {allTasksAnswered ? renderSubmitButton() : renderNextButton()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  PaginationButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 117,
    ...Fonts.Bold14,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  gifImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
})

export default TestControllerZone
