import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import LeftArrow from '@/assets/icons/LeftArrow'
import RightArrow from '@/assets/icons/RightArrow'
import { TestAttemptModel } from '@/types/api/test'
import { Fonts } from '@/constants'

interface PaginationFinishedProps {
  totalTasks: number
  currentTaskIndex: number
  taskResults: TestAttemptModel['taskResults']
  onPress: (index: number) => void
}

const PaginationFinished = (props: PaginationFinishedProps) => {
  const { totalTasks, currentTaskIndex, taskResults, onPress } = props
  const itemsPerPage = 5
  const totalPages = Math.ceil(totalTasks / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const newPage = Math.floor(currentTaskIndex / itemsPerPage)
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
    }
  }, [currentTaskIndex, currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
    }
  }

  const startIndex = currentPage * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalTasks)

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 0}>
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
          {taskResults?.slice(startIndex, endIndex).map((task, index) => {
            const globalIndex = startIndex + index
            const isActive = globalIndex === currentTaskIndex
            const isCorrect = task.isCorrect
            const isCurrent = isActive

            let backgroundColor = '#ccc'
            let borderColor = isActive && isCorrect ? '#15AE15' : '#FF2C20'
            let dotSizeStyle = {}

            if (isCorrect) {
              backgroundColor = '#58CC02'
              borderColor = '#18BA18'
            } else {
              backgroundColor = '#FF4B4C'
            }

            if (isCurrent) {
              dotSizeStyle = { width: 30, height: 30, borderRadius: 15 }
            } else {
              dotSizeStyle = { width: 24, height: 24, borderRadius: 12 }
            }

            return (
              <TouchableOpacity
                key={task.taskId}
                style={[
                  styles.paginationDot,
                  dotSizeStyle,
                  {
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: isActive ? 2 : 0,
                  },
                ]}
                onPress={() => onPress(globalIndex)}
              >
                <Text style={styles.dotText}>{globalIndex + 1}</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  paginationDot: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: {
    color: '#fff',
    ...Fonts.Medium22,
  },
})

export default PaginationFinished
