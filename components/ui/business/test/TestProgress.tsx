import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/colors'

interface TestProgressProps {
  currentTask: number
  totalTasks: number
}

const TestProgress = (props: TestProgressProps) => {
  const { currentTask, totalTasks } = props
  const progress = (currentTask / totalTasks) * 100
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#F0C735', '#EF9B38']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <LinearGradient
          colors={['#F0C735', '#EF9B38']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.circle, { left: `${progress}%` }]}
        >
          <Text style={styles.circleText}>{currentTask}</Text>
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 21,
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: 10,
  },
  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  circle: {
    position: 'absolute',
    top: -10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -15,
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressText: {
    marginTop: 5,
    textAlign: 'center',
  },
})

export default TestProgress
