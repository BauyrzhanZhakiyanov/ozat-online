import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Fonts } from '@/constants'

interface AchievementCardProps {
  text: string
  image?: ImageSourcePropType
}

const AchievementCard = (props: AchievementCardProps) => {
  const { text, image } = props
  return (
    <LinearGradient
      colors={['#F0C735', '#D98F39']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.itemContainer, image ? styles.additionalStyling : null]}
    >
      <View style={[styles.contentContainer, { justifyContent: 'center' }]}>
        <Text style={styles.text}>{text}</Text>
        {image && <Image source={image} style={styles.image} />}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 136,
    height: 58,
    borderRadius: 20,
    paddingTop: 7,
    paddingRight: 10,
    paddingLeft: 14,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  additionalStyling: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Fonts.Medium18,
    color: '#fff',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  backgroundImage: {
    opacity: 0.3,
    borderRadius: 20,
  },
})

export default AchievementCard
