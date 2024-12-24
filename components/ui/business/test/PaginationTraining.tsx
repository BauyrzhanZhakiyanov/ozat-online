import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTestStore } from '@/storage/testStorage/useTestStore'

const PaginationTraining = () => {
  const { tasks, currentTaskIndex, setCurrentTaskIndex } = useTestStore()

  return (
    <View style={styles.container}>
      {tasks.map((task, taskIndex) => (
        <View key={task.taskId} style={styles.taskWrapper}>
          <TouchableOpacity
            style={[
              styles.taskDot,
              taskIndex === currentTaskIndex && styles.activeTaskDot,
              task.isCompleted &&
                (task.isCorrect
                  ? styles.correctTaskDot
                  : styles.incorrectTaskDot),
            ]}
            onPress={() => setCurrentTaskIndex(taskIndex)}
          >
            <Text style={styles.taskText}>{task.taskOrder}</Text>
          </TouchableOpacity>
          {/* Render attempts under the task dot */}
          <View style={styles.attemptsContainer}>
            {task.attempts.map((attempt) => (
              <View
                key={attempt.attemptNumber}
                style={[
                  styles.attemptDot,
                  attempt.isCorrect
                    ? styles.correctAttemptDot
                    : styles.incorrectAttemptDot,
                ]}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  taskWrapper: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  taskDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTaskDot: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  correctTaskDot: {
    backgroundColor: 'green',
  },
  incorrectTaskDot: {
    backgroundColor: 'red',
  },
  taskText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attemptsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  attemptDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  correctAttemptDot: {
    backgroundColor: 'green',
  },
  incorrectAttemptDot: {
    backgroundColor: 'red',
  },
})

export default PaginationTraining
