import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native'
import Collapsible from 'react-native-collapsible'
import { ProgressBar } from 'react-native-paper'
import { getCourseImageUrl } from '@/store/firebase/file'
import CustomText from '../../common/Text'
import LessonComponent from '../lesson/LessonComponent'
import { Section } from '@/types/api/section'
import { useSectionStore } from '@/storage/stateStorage/useSectionStore'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

interface SectionComponentProps {
  section: Section
  sectionNumber: number
  isExpanded: boolean
  onSectionPress: () => void
}

const SectionComponent = ({
  section,
  sectionNumber,
  isExpanded,
  onSectionPress,
}: SectionComponentProps) => {
  // TODO refactor

  const { setSectionId } = useSectionStore()
  useEffect(() => {
    setSectionId(String(section.id))
  }, [section.id])

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getCourseImageUrl(section.image)
        setImageUrl(url)
      } catch (error) {
        console.error('Failed to load section image:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [section.image])

  const formattedSectionNumber =
    sectionNumber < 10 ? `0${sectionNumber}` : sectionNumber.toString()

  return (
    <View
      style={[
        styles.sectionContainer,
        isExpanded && styles.sectionContainerExpanded,
      ]}
    >
      <TouchableOpacity onPress={onSectionPress} activeOpacity={0.8}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionImage}>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Image
                source={{ uri: imageUrl ?? undefined }}
                style={[
                  styles.image,
                  {
                    backgroundColor: section.backgroundColor,
                    opacity: 0.85,
                  },
                ]}
              />
            )}
          </View>

          <View style={styles.sectionContent}>
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <CustomText style={styles.sectionNumber}>
                  {`${formattedSectionNumber}-бөлім`}
                </CustomText>
                <CustomText style={styles.sectionTitle}>
                  {section.title}
                </CustomText>
                <ProgressBar
                  progress={section.progress}
                  color="#F7931E"
                  style={styles.progressBar}
                />
              </View>
              <MaterialIcons
                name={isExpanded ? 'expand-less' : 'expand-more'}
                size={24}
                color="#1B163F"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <View style={styles.lessonContainer}>
          {section.lessons && section.lessons.length > 0 ? (
            section.lessons.map((lesson, index) => (
              <LessonComponent
                key={lesson.id}
                lesson={lesson}
                lessonNumber={index + 1}
              />
            ))
          ) : (
            <CustomText style={styles.lessonText}>
              No lessons available
            </CustomText>
          )}
        </View>
      </Collapsible>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderRadius: 24,
    marginVertical: 8,
    backgroundColor: 'white',
    shadowColor: '#B5B3C1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  sectionContainerExpanded: {},
  sectionHeader: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingVertical: 8,
    paddingRight: 16,
    alignItems: 'center',
  },
  sectionImage: {
    width: 84,
    height: 84,
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sectionContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionNumber: {
    color: '#1B163F',
    fontSize: 10,
    opacity: 0.65,
    fontWeight: '300',
    marginBottom: 4,
    lineHeight: 12,
    letterSpacing: 0.15,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#0C0A1',
    lineHeight: 21,
    letterSpacing: 0.15,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  lessonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  lessonText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
})

export default SectionComponent
