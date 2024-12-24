import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTestStore } from '@/storage/testStorage/useTestStore'

const PaginationComponent = () => {
  const { totalTasks, currentTaskIndex, setCurrentTaskIndex } = useTestStore()

  return (
    <View style={styles.paginationContainer}>
      {[...Array(totalTasks)].map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationDot,
            index === currentTaskIndex && styles.activeDot,
          ]}
          onPress={() => setCurrentTaskIndex(index)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
})

export default PaginationComponent
