import React, { ReactNode, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Modal, Portal, ProgressBar } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import BackBar from '@/components/ui/header/BackBar'
import CloseIcon from '@/assets/icons/CloseIconSvg'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'
import CustomButton from '@/components/ui/button/Button'
import ActiveCheckMarkSvg from '@/assets/icons/ActiveCheckmarkSvg'
import ActiveWrongMarkSvg from '@/assets/icons/ActiveWrongMarkSvg'

interface ResultShowComponentProps {
  element: ReactNode
  mainText: string
  correctAnswersCount: number
  totalTasks: number
  type: 'CORRECT' | 'ERROR'
}

const ResultShowComponent = (props: ResultShowComponentProps) => {
  const { element, mainText, correctAnswersCount, totalTasks, type } = props
  return (
    <View style={style.resultContainer}>
      <View>{element}</View>
      <View style={style.resultContainerText}>
        <View>
          <Text style={style.defaultText}>
            Барлық сұрақтар саны: {totalTasks}
          </Text>
          <Text style={style.mainText}>{mainText}</Text>
        </View>
        <View>
          <ProgressBar
            progress={
              type === 'CORRECT'
                ? Math.round((correctAnswersCount / totalTasks) * 100)
                : Math.round(
                    ((totalTasks - correctAnswersCount) / totalTasks) * 100,
                  )
            }
            color="#F7931E"
            style={style.progressBar}
          />
        </View>
      </View>
    </View>
  )
}

const ShowResults = () => {
  const { testId, attemptId, correctAnswersCount, totalTasks } =
    useLocalSearchParams()
  const navigation = useRouter()
  const [showModal, setShowModal] = useState(false)

  const handleFinishedAttempt = () => {
    navigation.replace('TestView', {
      testPassStatus: {
        ...completedTestState,
        attemptId: attemptId ?? '',
        testId: testId,
      },
    })
  }

  const handleStartTestAgain = () => {
    setShowModal(true)
  }

  const handleStartTestNavigation = () => {
    const tempStartTestState = {
      ...startTestState,
      attemptId: '',
      testId: testId,
    }
    navigation.replace('TestView', {
      testPassStatus: tempStartTestState,
    })
  }

  return (
    <SafeAreaView style={style.testViewContainer}>
      <View style={style.testViewContainerMain}>
        <View style={style.backBarContainer}>
          <BackBar text="Тесттер тізімі" onPress={navigation.back} />
        </View>
        <Portal>
          <Modal visible={showModal} dismissable={false}>
            <View style={style.modalContainer}>
              <View style={style.modalContainerCloseIcon}>
                <TouchableOpacity
                  style={style.modalContainerCloseIcon}
                  onPress={() => setShowModal(false)}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={style.modalContainerText}>
                <Text
                  style={{
                    ...Fonts.Bold24,
                    textAlign: 'center',
                    color: Colors.primary,
                  }}
                >
                  Маңызды ақпарат!
                </Text>
              </View>
              <View style={style.modalContainerText}>
                <Text style={[style.defaultText, { textAlign: 'center' }]}>
                  Қайта тапсырған уақытта сіз тест үшін кэшбэк ала алмайсыз, тек
                  бірінші нәтижеге беріледі
                </Text>
              </View>
              <View style={style.modalContainerButton}>
                <CustomButton
                  title="Жалғастыру"
                  onPress={() => {
                    setShowModal(false)
                    handleStartTestNavigation()
                  }}
                  style={styles.continue}
                  textStyle={{
                    ...Fonts.SemiBold18,
                  }}
                />
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={style.testZone}>
          <View style={style.progressContainer}>
            <CircularProgress
              value={(correctAnswersCount / totalTasks) * 100}
              radius={97}
              inActiveStrokeColor={'#e0e0e0'}
              activeStrokeColor={Colors.primary}
              duration={500}
              activeStrokeWidth={48.5}
              inActiveStrokeWidth={48.5}
              showProgressValue={false}
            />
            <View style={style.centeredContent}>
              <Text style={style.progressText}>
                {Math.round((correctAnswersCount / totalTasks) * 100)}%
              </Text>
            </View>
          </View>
          <View style={{}}>
            <ResultShowComponent
              element={<ActiveCheckMarkSvg />}
              mainText={`Дұрыс жауаптар саны ${correctAnswersCount}`}
              correctAnswersCount={correctAnswersCount}
              totalTasks={totalTasks}
              type="CORRECT"
            />
            <ResultShowComponent
              element={<ActiveWrongMarkSvg />}
              mainText={`Қате жауаптар саны ${totalTasks - correctAnswersCount}`}
              correctAnswersCount={correctAnswersCount}
              totalTasks={totalTasks}
              type="ERROR"
            />
          </View>
          <View style={style.resultContainerControllers}>
            <CustomButton
              title="Сұрақтарға шолу"
              onPress={() => handleFinishedAttempt()}
              style={style.questionsView}
              textStyle={{
                ...Fonts.SemiBold18,
              }}
            />
            <CustomButton
              title="Қайта тапсыру"
              onPress={() => handleStartTestAgain()}
              style={style.repeatTest}
              textStyle={{
                ...Fonts.SemiBold18,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  testViewContainer: {
    flex: 1,
  },
  continue: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
    paddingVertical: 6,
    borderRadius: 26,
    backgroundColor: Colors.primary,
  },
  questionsView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  repeatTest: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  testViewContainerMain: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.mainBackground,
  },
  backBarContainer: {},
  testZone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  progressContainer: {
    width: 194,
    height: 194,
  },
  centeredContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    ...Fonts.SemiBold40,
    color: Colors.black,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginLeft: 8,
    marginRight: 16,
    gap: 16,
  },
  resultContainerText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    ...Fonts.Regular14,
    color: Colors.black,
    opacity: 0.65,
  },
  mainText: {
    ...Fonts.SemiBold18,
    color: Colors.black,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  resultContainerControllers: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    width: 260,
    borderRadius: 32,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 25,
    display: 'flex',
    gap: 7,
    alignSelf: 'center',
  },
  modalContainerCloseIcon: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContainerText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  modalContainerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
  },
})

export default ShowResults
