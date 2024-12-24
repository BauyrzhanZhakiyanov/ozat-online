import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LeftArrowColored from '../../../../assets/icons/LeftArrowColored'
import RightArrowColored from '../../../../assets/icons/RightArrowColored'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'

interface TestNavigationButtonProps {
  onPress: () => void
  isCorrect?: boolean
  currentTaskIndex: number
  totalTasks: number
  buttonType: 'PREV' | 'NEXT'
}

const TestNavigationButton = ({
  onPress,
  isCorrect,
  currentTaskIndex,
  totalTasks,
  buttonType,
  ...props
}: TestNavigationButtonProps) => {
  const textStyle = { color: Colors.white, ...Fonts.Bold18 }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={
        (buttonType === 'PREV' && currentTaskIndex === 0) ||
        (buttonType === 'NEXT' && currentTaskIndex === totalTasks - 1)
      }
      style={[
        {
          ...styles.button,
          backgroundColor: isCorrect ? '#58CC02' : '#FF2C20',
          borderWidth: 2,
          borderColor: isCorrect ? '#58CC02' : '#FF2C20',
        },
        {
          backgroundColor:
            (buttonType === 'PREV' && currentTaskIndex === 0) ||
            (buttonType === 'NEXT' && currentTaskIndex === totalTasks - 1)
              ? '#E6E6E6'
              : isCorrect
                ? '#58CC02'
                : '#FF2C20',

          borderColor:
            (buttonType === 'PREV' && currentTaskIndex === 0) ||
            (buttonType === 'NEXT' && currentTaskIndex === totalTasks - 1)
              ? '#E6E6E6'
              : isCorrect
                ? '#58CC02'
                : '#FF2C20',
        },
      ]}
      {...props}
    >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }} />
      {buttonType === 'PREV' && <LeftArrowColored color="white" />}
      <Text style={textStyle}>{buttonType === 'PREV' ? 'Артқа' : 'Алға'}</Text>
      {buttonType === 'NEXT' && <RightArrowColored color="white" />}
      <View />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 117,
    ...Fonts.Bold14,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 1000,
  },
})

export default TestNavigationButton
