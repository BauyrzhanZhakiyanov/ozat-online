import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import Clock from '@/assets/icons/Clock'
import { TestAttemptsModel } from '@/types/api/test'
import CheckMark from '@/assets/icons/Checkmark'
import CheckCircle from '@/assets/icons/CheckCircle'
import CustomButton from '@/components/ui/button/Button'
import { useSelectTestStore } from '@/storage/stateStorage/useTestStore'
import { useLessonStore } from '@/storage/stateStorage/useLessonStore'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'
import {
  completedTestState,
  inProgressTestState,
  startTestState,
} from '@/constants/test'

interface TestAttemptsListProps {
  testAttempts?: TestAttemptsModel[]
}

interface TestFinishedAttemptProps {
  attempt: TestAttemptsModel
  onPress: () => void
}

interface TestInProgressAttemptProps {
  attempt: TestAttemptsModel
  onPress: () => void
}

const TestFinishedAttempt = ({
  attempt,
  onPress,
}: TestFinishedAttemptProps) => {
  return (
    <TouchableOpacity style={styles.attemptButton} onPress={onPress}>
      <View style={styles.row}>
        <Clock />
        <Text>
          {`${Math.floor(attempt.timeSpentSeconds / 60)} min ${
            attempt.timeSpentSeconds % 60
          } sec`}
        </Text>
      </View>
      <View>
        <CircularProgress
          value={Number(attempt.scorePercentage.toFixed(0))}
          radius={17.5}
          inActiveStrokeColor={'#e0e0e0'}
          activeStrokeColor={Colors.correct}
          duration={500}
          activeStrokeWidth={6}
          inActiveStrokeWidth={6}
          showProgressValue={false}
        />
        <View style={styles.centeredContent}>
          <Text style={styles.progressText}>
            {Math.round(attempt.scorePercentage)}%
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <CheckMark />
        <Text style={styles.finishText}>Аяқталды</Text>
      </View>
    </TouchableOpacity>
  )
}

const TestInProgressAttempt = ({
  attempt,
  onPress,
}: TestInProgressAttemptProps) => {
  return (
    <TouchableOpacity
      style={[styles.attemptButton, { flexDirection: 'column' }]}
      onPress={onPress}
    >
      <View style={styles.testAttempt}>
        <View style={styles.row}>
          <Clock />
          {/* TODO: Consider moment for start test time */}
          <Text>{`${Math.floor(60 / 60)} min ${80 % 60} sec`}</Text>
        </View>
        <View>
          <CircularProgress
            value={Number(Math.round(attempt.scorePercentage))} // TODO, ask backend to return progress on inProgress attempts
            radius={17.5}
            inActiveStrokeColor={'#e0e0e0'}
            activeStrokeColor={Colors.primary}
            duration={500}
            activeStrokeWidth={6}
            inActiveStrokeWidth={6}
            showProgressValue={false}
          />
          <View style={styles.centeredContent}>
            <Text style={styles.progressText}>
              {Math.round(attempt.scorePercentage)}%
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <CheckCircle />
          <Text style={styles.finishText}>Аяқталмаған</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomButton
          title="Жалғастыру"
          onPress={onPress}
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 8,
            marginTop: 10,
            paddingVertical: 7,
            paddingHorizontal: 28.5,
          }}
          textStyle={{
            ...Fonts.SemiBold18,
          }}
        />
      </View>
    </TouchableOpacity>
  )
}

const TestAttemptsList = ({ testAttempts }: TestAttemptsListProps) => {
  const navigation = useRouter()
  const { lessonId } = useLessonStore()
  const { selectedTestTabs } = useSelectTestStore()
  const selectedTestTab = lessonId ? selectedTestTabs[lessonId] || '' : ''

  const hasIncompleteAttempt = testAttempts?.some(
    (attempt) => attempt.testStatus === 'IN_PROGRESS',
  )

  const hasCompletedAttempts = testAttempts?.some(
    (attempt) => attempt.testStatus === 'COMPLETED',
  )

  const handleStartTestAgain = () => {
    const tempStartTestState = {
      ...startTestState,
      attemptId: '',
      testId: selectedTestTab,
    }
    navigation.navigate('TestView', {
      testPassStatus: tempStartTestState,
    })
  }

  const handleProgressTest = (attempt: TestAttemptsModel) => {
    navigation.navigate('TestView', {
      testPassStatus: {
        ...inProgressTestState,
        attemptId: attempt.attemptId,
        testId: selectedTestTab,
      },
    })
  }

  const handleFinishedAttempt = (attempt: TestAttemptsModel) => {
    navigation.navigate('TestView', {
      testPassStatus: {
        ...completedTestState,
        attemptId: attempt.attemptId,
        testId: selectedTestTab,
      },
    })
  }

  const renderItem = ({ item }: { item: TestAttemptsModel }) => (
    <View>
      <View style={styles.bottomShadow} />
      {item.testStatus === 'COMPLETED' ? (
        <TestFinishedAttempt
          attempt={item}
          onPress={() => handleFinishedAttempt(item)}
        />
      ) : (
        <TestInProgressAttempt
          attempt={item}
          onPress={() => handleProgressTest(item)}
        />
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={testAttempts}
        renderItem={renderItem}
        keyExtractor={(item) => item.attemptId || Math.random().toString()}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={
          hasCompletedAttempts && !hasIncompleteAttempt ? (
            <TouchableOpacity
              style={[styles.attemptButton, styles.incompleteAttempt]}
              onPress={handleStartTestAgain}
            >
              <Text style={styles.continueText}>Қайта тапсыру</Text>
            </TouchableOpacity>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContentContainer: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  attemptButton: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    width: 319,
    minHeight: 86,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 32,
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 24,
    backgroundColor: '#FFF',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.sunriseLight,
    shadowColor: 'rgba(28, 12, 113, 1)',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  testAttempt: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  touchableArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newTestAttempt: {
    backgroundColor: '#ddd',
    textAlign: 'center',
    justifyContent: 'center',
  },
  bottomShadow: {
    height: 10,
    marginHorizontal: 29,
    marginTop: -6,
    marginBottom: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#B5B3C1',
    opacity: 0.11,
  },
  incompleteAttempt: {
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    fontSize: 10,
    lineHeight: 14,
    color: Colors.black,
  },
  finishText: {
    fontSize: 12,
  },
  attemptItemText: {
    color: '#00394C',
    textAlign: 'center',
    ...Fonts.Regular14,
  },
  continueText: {
    color: Colors.white,
    ...Fonts.SemiBold22,
  },
})

export default TestAttemptsList
