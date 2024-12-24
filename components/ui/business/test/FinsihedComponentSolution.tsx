import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SolutionRender from './SolutionRender'
import CheckMark from '@/assets/icons/Checkmark'
import Incorrect from '@/assets/icons/Incorrect'
import Camera from '@/assets/icons/Camera'
import CameraIncorrect from '@/assets/icons/CameraIncorrect'
import { Fonts } from '@/constants'

interface FinsihedComponentSolutionProps {
  solutionText: string
  isCorrect: boolean
}

const FinsihedComponentSolution = ({
  solutionText,
  isCorrect,
}: FinsihedComponentSolutionProps) => {
  const customStyle = isCorrect
    ? { backgroundColor: '#D7FFB8' }
    : { backgroundColor: '#FFDFE0' }

  return (
    <>
      <View style={[styles.finishedController, customStyle]}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {isCorrect ? <CheckMark /> : <Incorrect />}
            <Text style={styles.headerText}>
              {isCorrect
                ? 'Дұрыс, жарайсың!'
                : 'Қате, видео түсіндірмені қараңыз'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            {isCorrect ? <Camera /> : <CameraIncorrect />}
          </TouchableOpacity>
        </View>
        <SolutionRender solution={solutionText} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  finishedController: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
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

export default FinsihedComponentSolution
