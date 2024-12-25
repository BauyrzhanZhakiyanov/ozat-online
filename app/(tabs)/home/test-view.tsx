import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import BackBar from '@/components/ui/header/BackBar'
import AttemptTestComponent from '@/components/ui/business/test/AttemptTestComponent'
import TestComponent from '@/components/ui/business/test/TestComponent'
import { TestPassStatus } from '@/types/api/test'
import { useTestStore } from '@/storage/testStorage/useTestStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  useLazyGetFullTestQuery,
  useLazyGetTestAttemptQuery,
  useStartTestMutation,
} from '@/store/api/assessment'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'

const TestView = () => {
  const navigation = useRouter()
  const { testPassStatus } = useLocalSearchParams<{
    testPassStatus: TestPassStatus
  }>()
  const { testId } = useTestStore()
  const [
    startTest,
    { data: start, isLoading: testStarting, error: startError },
  ] = useStartTestMutation()
  const [
    getTest,
    { data: progress, isLoading: testLoading, error: progressError },
  ] = useLazyGetFullTestQuery()
  const [
    getTestAttempt,
    { data: completed, isLoading: testAttemptLoading, error: completedError },
  ] = useLazyGetTestAttemptQuery()

  const test = start || progress
  const error = startError || progressError || completedError

  useEffect(() => {
    if (testPassStatus.testStateCode === 'START') {
      startTest(testId)
    } else if (testPassStatus.testStateCode === 'IN_PROGRESS') {
      getTest(testId)
    } else if (testPassStatus.testStateCode === 'COMPLETED') {
      getTestAttempt({ testId, attemptId: testPassStatus.attemptId })
    }
  }, [])

  if (testStarting || testLoading || testAttemptLoading) {
    return (
      <SafeAreaView style={styles.testViewContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Тест жүктелуде...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.testViewContainer}>
        <Text style={styles.errorText}>
          Error on backend {error.toString()}
        </Text>
      </SafeAreaView>
    )
  }

  if (!start && !progress && !completed) {
    return (
      <SafeAreaView style={styles.testViewContainer}>
        <Text style={styles.errorText}>No test data available.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.testViewContainer}>
      <View style={styles.backBarContainer}>
        <BackBar text="Тесттер тізімі" onPress={navigation.back} />
      </View>

      {testPassStatus.testStateCode === 'COMPLETED' ? (
        <AttemptTestComponent test={completed} />
      ) : (
        <TestComponent test={test} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  testViewContainer: {
    backgroundColor: Colors.mainBackground,
    flex: 1,
  },
  backBarContainer: {
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 21,
  },
  loadingText: {
    ...Fonts.SemiBold28,
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
})

export default TestView
