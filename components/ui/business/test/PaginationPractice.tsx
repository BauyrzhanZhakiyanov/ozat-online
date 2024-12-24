import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import RightArrow from '@/assets/icons/RightArrow'
import { Colors } from '@/constants/colors'
import LeftArrow from '@/assets/icons/LeftArrow'
import { Fonts } from '@/constants'

interface PaginationPracticeProps {
  totalTasks: number
  currentTaskIndex: number
  onPress: (index: number) => void
  answeredTasks: boolean[]
}

const PaginationPractice = (props: PaginationPracticeProps) => {
  const { totalTasks, currentTaskIndex, onPress, answeredTasks } = props
  const itemsPerPage = 5
  const totalPages = Math.ceil(totalTasks / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const startIndex = currentPage * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalTasks)

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={handlePrevPage}
        disabled={currentPage === 0}
        style={styles.leftArrow}
      >
        <LeftArrow />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.paginationScrollView}
        contentContainerStyle={styles.paginationContent}
      >
        {Array.from({ length: endIndex - startIndex }, (_, index) => {
          const taskIndex = startIndex + index
          const isActive = taskIndex === currentTaskIndex
          const isAnswered = answeredTasks[taskIndex]
          return (
            <TouchableOpacity
              key={taskIndex}
              onPress={() => onPress(taskIndex)}
            >
              {isAnswered ? (
                <LinearGradient
                  colors={['#F0C735', '#D98F39']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={[
                    styles.paginationDot,
                    isAnswered && styles.answeredDot,
                    isActive && styles.activeDot,
                    isActive && isAnswered && styles.answeredActiveDot,
                  ]}
                >
                  <Text
                    style={[
                      styles.dotText,
                      isActive ? styles.activeDotText : styles.answeredDotText,
                    ]}
                  >
                    {taskIndex + 1}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={[styles.paginationDot, isActive && styles.activeDot]}
                >
                  <Text
                    style={[
                      styles.dotText,
                      isActive ? styles.activeDotText : {},
                    ]}
                  >
                    {taskIndex + 1}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      <TouchableOpacity
        onPress={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <RightArrow />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    minHeight: 40,
    flexShrink: 0,
    flexDirection: 'row',
  },
  paginationScrollView: {
    flex: 1,
  },
  paginationContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftArrow: {},

  paginationDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#848484',
  },
  answeredActiveDot: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  answeredDot: {},
  dotText: {
    ...Fonts.SemiBold20,
    color: Colors.white,
  },
  activeDotText: {
    ...Fonts.SemiBold24,
  },
  answeredDotText: {
    color: '#fff',
  },
})

export default PaginationPractice
