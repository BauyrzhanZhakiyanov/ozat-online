import React from 'react'
import { StyleSheet, View } from 'react-native'
import DurationComponent from './DurationComponent'
import CashBackComponent from '@/components/ui/business/CashBackComponent'

interface TestHeaderProps {
  isCashbackEnabled: boolean
  cashBackAmount: number
  isDurationAvailable: boolean
  duration: number
  isCompletedTest: boolean
}

const TestHeader = (props: TestHeaderProps) => {
  const {
    isCashbackEnabled,
    cashBackAmount,
    isDurationAvailable,
    duration,
    isCompletedTest,
  } = props
  return (
    <View style={styles.testHeader}>
      {isCashbackEnabled && (
        <CashBackComponent cashbackAmount={cashBackAmount} />
      )}
      {isDurationAvailable && isCompletedTest && (
        <DurationComponent duration={duration} />
      )}
      {/* Add other components based on the props */}
    </View>
  )
}

const styles = StyleSheet.create({
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 90,
  },
})

export default TestHeader
