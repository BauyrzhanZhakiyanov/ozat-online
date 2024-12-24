import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface LivesComponentProps {
  lives: number
}

const LivesComponent = (props: LivesComponentProps) => {
  const { lives } = props
  return (
    <View style={styles.livesContainer}>
      <Text style={styles.livesText}>Lives: {lives}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  livesContainer: {
    padding: 8,
    backgroundColor: '#d9534f',
    borderRadius: 4,
  },
  livesText: {
    color: '#fff',
  },
})

export default LivesComponent
