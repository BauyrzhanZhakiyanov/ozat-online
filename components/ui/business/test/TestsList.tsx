import React, { useEffect, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TestAttemptsList from './TestAttemptsList'
import TestStartComponent from './TestStartComponent'
import { useSelectTestStore } from '@/storage/stateStorage/useTestStore'
import CustomTabBar from '@/components/ui/tabs/CustomTabBar'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'
import { useTestStore } from '@/storage/testStorage/useTestStore'
import { TestShortModel } from '@/types/api/test'
import { useGetTestAttemptsQuery } from '@/store/api/assessment'

interface TestListProps {
  lessonId: string
  test?: TestShortModel[]
}

const TestsList = (props: TestListProps) => {
  const { lessonId, test = [] } = props
  const { selectedTestTabs, setSelectedTestTab } = useSelectTestStore()
  const selectedTestTab = selectedTestTabs[lessonId] || ''
  const { setTestId } = useTestStore()
  const { data, isLoading, error } = useGetTestAttemptsQuery(selectedTestTab, {
    skip: !selectedTestTab,
  })

  const handleTestTab = (tabId: string) => {
    setSelectedTestTab(lessonId, tabId)
    setTestId(tabId)
  }

  useEffect(() => {
    if (test.length > 0) {
      const selectedTab = selectedTestTabs[lessonId]
      const selectedTestTabExists = test.some((item) => item.id === selectedTab)
      if (!selectedTestTabExists) {
        setSelectedTestTab(lessonId, test[0].id)
        setTestId(test[0].id)
      } else {
        setTestId(selectedTab)
      }
    } else {
      setSelectedTestTab(lessonId, '')
      setTestId('')
    }
  }, [test, lessonId])

  const testTabs = useMemo(
    () =>
      test.map((item) => {
        return {
          key: item.id,
          label: item.testName,
          available: true,
        }
      }),
    [test],
  )

  return (
    <View style={styles.testZone}>
      <CustomTabBar
        tabs={testTabs}
        selectedTab={selectedTestTab}
        onTabSelect={handleTestTab}
      />
      <View style={styles.testDataContainer}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.testContentZone}>
            {data && data.length > 0 ? (
              <TestAttemptsList testAttempts={data} />
            ) : (
              <TestStartComponent />
            )}
          </View>
        )}
      </View>
    </View>
  )
}

export default TestsList

const styles = StyleSheet.create({
  testZone: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  showTests: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  testContentZone: {},
  segmentedButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderColor: '#E4EDFF',
    borderWidth: 1,
    width: 370,
    alignSelf: 'center',
    padding: 5,
  },
  segmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  selectedSegmentButton: {
    backgroundColor: '#F7931E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  segmentButtonText: {
    color: '#00394C',
    textAlign: 'center',
    ...Fonts.Regular14,
  },
  selectedSegmentButtonText: {
    color: 'white',
    ...Fonts.Bold14,
  },
  testDataContainer: {
    flex: 1,
    gap: 10,
  },
  dataItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dataItemText: {
    fontSize: 16,
    color: '#333',
  },
})
