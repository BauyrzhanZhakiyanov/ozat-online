import React from 'react'
import { StyleSheet, View } from 'react-native'
import TestNavigationButton from '@/components/ui/business/test/TestNavigationButtons'
import { Fonts } from '@/constants'

interface FinishedControllerComponentProps {
  onPressNext: () => void
  onPressPrevious: () => void
  isCorrect: boolean
  currentTaskIndex: number
  totalTasks: number
}

const FinishedControllerComponent = ({
  onPressNext,
  onPressPrevious,
  currentTaskIndex,
  totalTasks,
  isCorrect,
}: FinishedControllerComponentProps) => {
  const customStyle = isCorrect
    ? { backgroundColor: '#D7FFB8' }
    : { backgroundColor: '#FFDFE0' }

  return (
    <View style={styles.finishedController}>
      <TestNavigationButton
        onPress={onPressPrevious}
        isCorrect={isCorrect}
        currentTaskIndex={currentTaskIndex}
        totalTasks={totalTasks}
        buttonType="PREV"
      />

      <TestNavigationButton
        onPress={onPressNext}
        isCorrect={isCorrect}
        currentTaskIndex={currentTaskIndex}
        totalTasks={totalTasks}
        buttonType="NEXT"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  finishedController: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    ...Fonts.SemiBold18,
    marginLeft: 10,
  },

  solutionText: {
    ...Fonts.Regular14,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonStyleCorrect: {
    width: '90%',
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#58CC02',
  },
  buttonStyleIncorrect: {
    width: '90%',
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FF4B4C',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})

export default FinishedControllerComponent
