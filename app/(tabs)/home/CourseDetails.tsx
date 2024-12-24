import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCourseStore } from '@/storage/stateStorage/useCourseStore'
import CustomText from '@/components/ui/common/Text'
import BackBar from '@/components/ui/header/BackBar'
import { Fonts } from '@/constants'
import SectionComponent from '@/components/ui/business/section/SectionComponent'
import { useGetMyCourseQuery } from '@/store/api/payment'
import { getCourseImageUrl } from '@/store/firebase/file'

const windowHeight = Dimensions.get('window').height

const CourseDetails = () => {
  const { courseId } = useLocalSearchParams()
  const navigation = useRouter()

  const { setCourseData } = useCourseStore()

  const { data, isLoading, error } = useGetMyCourseQuery(courseId)

  useEffect(() => {
    if (data) {
      setCourseData(data.id.toString(), data.title)
    }
  }, [data])

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loadingImage, setLoadingImage] = useState(true)
  const [expandedSectionId, setExpandedSectionId] = useState<number | null>(
    null,
  )

  useEffect(() => {
    const fetchImage = async () => {
      if (data?.image) {
        try {
          const url = await getCourseImageUrl(data.backgroundImage)
          setImageUrl(url)
        } catch (error) {
          console.error('Failed to load image:', error)
        } finally {
          setLoadingImage(false)
        }
      }
    }
    fetchImage()
  }, [data?.image])

  const handleSectionClick = (sectionId: number) => {
    setExpandedSectionId((prevId) => (prevId === sectionId ? null : sectionId))
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />
  }

  if (error) {
    return <CustomText>Error fetching course</CustomText>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBarWrapper}>
        <BackBar
          text="Курстар"
          onPress={() => navigation.navigate('MyCourses')}
          style={styles.backBar}
          textStyle={{ color: '#E8E4FF' }}
          arrowColor="#E8E4FF"
        />
      </View>

      <Animated.View style={styles.backgroundContainer}>
        {loadingImage ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : imageUrl ? (
          <ImageBackground
            source={{ uri: imageUrl }}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <CustomText style={styles.courseTitle}>{data?.title}</CustomText>
          </ImageBackground>
        ) : (
          <Text>Image not available</Text>
        )}
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        <View style={styles.contentZone}>
          <View style={styles.contentZoneHeader}>
            <CustomText style={{ ...Fonts.Bold20, marginBottom: 8 }}>
              {data ? `${data.sections.length} бөлім` : `Курс жасалуда`}
            </CustomText>
            <CustomText
              style={{
                ...Fonts.Inter_300Light,
                color: '#1B163F',
                opacity: 0.65,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              {data?.description ? data.description : 'Курс сипаттамасы жоқ'}
            </CustomText>
          </View>
          <View style={styles.contentZoneBody}>
            {data?.sections && data.sections.length > 0 ? (
              data.sections.map((section, index) => (
                <SectionComponent
                  key={section.id}
                  section={section}
                  sectionNumber={index + 1}
                  isExpanded={expandedSectionId === section.id}
                  onSectionPress={() => handleSectionClick(section.id)}
                />
              ))
            ) : (
              <Text>No sections available</Text>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backBar: {
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
  backgroundContainer: {
    height: windowHeight * 0.35,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  backBarWrapper: {
    position: 'absolute',
    zIndex: 1111,
    width: '100%',
    left: 24,
    top: 35,
  },
  courseTitle: {
    color: 'white',
    position: 'absolute',
    zIndex: 1111,
    ...Fonts.Bold28,
    left: 27,
  },
  scrollViewContent: {
    paddingTop: windowHeight * 0.35 - 100,
  },
  contentZone: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingLeft: 8,
    paddingRight: 16,
    paddingTop: 24,
  },
  contentZoneHeader: {
    paddingHorizontal: 16,
  },
  contentZoneBody: {},
})

export default CourseDetails
