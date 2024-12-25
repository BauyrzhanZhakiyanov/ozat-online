import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Inter } from '@/components/ui/common/Fonts'

const ChangePhone = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Inter>ChangePhone</Inter>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})

export default ChangePhone
