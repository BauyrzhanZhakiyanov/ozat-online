import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelectedTabStore } from '@/storage/stateStorage/useSelectedTabStore'
import TheoryComponent from '@/components/ui/business/theory/TheoryComponent'
import FileComponent from '@/components/ui/business/file/FileComponent'
import LiveComponent from '@/components/ui/viewers/LiveComponent'
import VideoComponent from '@/components/ui/viewers/VideoComponent'
import TestsList from '@/components/ui/business/test/TestsList'
import BackBar from '@/components/ui/header/BackBar'
import CustomTabBar from '@/components/ui/tabs/CustomTabBar'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGetFullLessonQuery } from '@/store/api/course'

const Id = () => {
  const navigation = useRouter()
  const { id, title } = useLocalSearchParams()

  const { data, isLoading, error } = useGetFullLessonQuery(id, {
    refetchOnMountOrArgChange: true,
  })

  const { selectedTabs, setSelectedTab } = useSelectedTabStore()
  const selectedTab = selectedTabs[id]

  const lessonTabs = [
    {
      key: 'theories',
      label: 'Теория',
      available: (data?.theories?.length ?? 0) > 0,
    },
    { key: 'file', label: 'Файл', available: (data?.files?.length ?? 0) > 0 },
    { key: 'live', label: 'Эфир', available: (data?.lives?.length ?? 0) > 0 },
    {
      key: 'video',
      label: 'Видео',
      available: (data?.videos?.length ?? 0) > 0,
    },
    { key: 'tests', label: 'Тест', available: (data?.tests?.length ?? 0) > 0 },
  ]

  useEffect(() => {
    if (data) {
      const availableTabs = lessonTabs.filter((tab) => tab.available)

      if (availableTabs.length > 0) {
        if (!selectedTab) {
          setSelectedTab(id, availableTabs[0].key)
        } else {
          const isSelectedTabAvailable = availableTabs.some(
            (tab) => tab.key === selectedTab,
          )
          if (!isSelectedTabAvailable) {
            setSelectedTab(id, availableTabs[0].key)
          }
        }
      } else {
        setSelectedTab(id, null)
      }
    } else {
      setSelectedTab(id, null)
    }
  }, [data])

  const handleTabSelect = (key: string) => {
    setSelectedTab(id, key)
  }

  const renderSlot = () => {
    switch (selectedTab) {
      case 'theories':
        return <TheoryComponent theories={data?.theories ?? []} />
      case 'file':
        return <FileComponent files={data?.files ?? []} lessonId={id} />
      case 'live':
        return <LiveComponent lives={data?.lives ?? []} />
      case 'video':
        return <VideoComponent videos={data?.videos ?? []} />
      case 'tests':
        return <TestsList test={data?.tests ?? []} lessonId={id} />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={style.lessonContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={style.lessonContainer}>
        <Text>Error loading lesson data.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={style.lessonContainer}>
      <View style={style.backBarContainer}>
        <BackBar
          text={
            title && title.length > 35
              ? `${title.slice(0, 35)}...`
              : title || ''
          }
          onPress={() => navigation.back()}
        />
      </View>
      <View>
        {selectedTab && (
          <CustomTabBar
            tabs={lessonTabs}
            selectedTab={selectedTab}
            onTabSelect={(tabKey: string) => setSelectedTab(id, tabKey)}
          />
        )}
      </View>
      <View style={style.slotContainer}>{renderSlot()}</View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  lessonContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 23,
    paddingVertical: 26,
  },
  backBarContainer: {
    marginBottom: 26,
  },
  segmentedButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 26,
    marginBottom: 4,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderColor: '#E4EDFF',
    borderWidth: 1,
    width: 370,
    alignSelf: 'center',
    padding: 5,
  },
  segmentButton: {},
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
  slotContainer: {
    flex: 1,
    marginTop: 4,
  },
  noContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {
    ...Fonts.Regular14,
    color: Colors.black,
  },
})

export default Id
