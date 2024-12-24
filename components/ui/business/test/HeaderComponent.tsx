import React from 'react'
import { StyleSheet, View } from 'react-native'
import DurationComponent from './DurationComponent'
import HpComponent from './HpComponent'
import CashBackComponent from '@/components/ui/business/CashBackComponent'
import { useTestStore } from '@/storage/testStorage/useTestStore'

const HeaderComponent = () => {
  const { isCashbackEnabled, isDurationAvailable, lives } = useTestStore()

  return (
    <View style={styles.headerContainer}>
      {isCashbackEnabled && <CashBackComponent cashbackAmount={200} />}
      {isDurationAvailable && <DurationComponent duration={60} />}
      {lives > 0 && <HpComponent hpSize={lives} />}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    height: 50,
  },
})

export default HeaderComponent
