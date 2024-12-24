import React from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGetTestAttemptQuery } from '@/store/api/assessment'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'
import AttemptTestComponent from '@/components/ui/business/test/AttemptTestComponent'
import BackBar from '@/components/ui/header/BackBar'

const ResultTestView = () => {
  const navigation = useRouter()
  const { testPassStatus } = useLocalSearchParams()
  const { testId } = useTestStore()
  const { data, isLoading, error } = useGetTestAttemptQuery({
    testId,
    attemptId: testPassStatus.attemptId,
  })

  if (isLoading) {
    return (
      <SafeAreaView style={style.testViewContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={style.loadingText}>Тест жүктелуде...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={style.testViewContainer}>
        <Text style={style.errorText}>
          Error on backend {fetchError.toString()}
        </Text>
      </SafeAreaView>
    )
  }

  if (!data) {
    return (
      <SafeAreaView style={style.testViewContainer}>
        <Text style={style.errorText}>No test data available.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={style.testViewContainer}>
      <View style={style.backBarContainer}>
        <BackBar text="Тесттер тізімі" onPress={navigation.back} />
      </View>
      <View style={style.testZone}>
        <AttemptTestComponent test={data} />
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  testViewContainer: {
    backgroundColor: Colors.mainBackground,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  backBarContainer: {
    paddingLeft: 16,
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
  testZone: {
    marginTop: 20,
    flex: 1,
    height: '100%',
  },
})

export default ResultTestView
