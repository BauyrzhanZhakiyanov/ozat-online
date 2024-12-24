import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface DurationComponentProps {
  duration: number
}

const DurationComponent = (props: DurationComponentProps) => {
  const { duration } = props
  return (
    <View style={styles.durationContainer}>
      <Text style={styles.durationText}>
        {`${(duration / 60).toFixed(0)} мин ${(duration % 60).toFixed(0)} сек`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  durationContainer: {
    padding: 8,
    backgroundColor: '#f0ad4e',
    borderRadius: 4,
    height: 40,
  },
  durationText: {
    color: '#fff',
  },
})

export default DurationComponent
