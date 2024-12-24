import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Fonts } from '@/constants'

interface Props {
  text?: string
  height: number
  width: number
  backgroundColor?: string
  backgroundImage?: ImageSourcePropType
  onPress: () => void
  linearGradientColors?: string[]
  linearGradientStart?: { x: number; y: number }
  linearGradientEnd?: { x: number; y: number }
  imagePosition?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  textStyle?: TextStyle
  style?: ViewStyle
  imageSize?: { width: number; height: number }
}

const ToucheAbleCard = (props: Props) => {
  const {
    text,
    height,
    width,
    backgroundColor = '#000',
    backgroundImage,
    onPress,
    linearGradientColors = ['#F0C735', '#D98F39'],
    linearGradientStart = { x: 1, y: 0 },
    linearGradientEnd = { x: 0, y: 1 },
    imagePosition,
    textStyle,
    style,
    imageSize = { width: 80, height: 80 },
  } = props
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 10 }}>
      <View style={[styles.cardContainer, { height, width }]}>
        {1 ? (
          <LinearGradient
            colors={linearGradientColors}
            start={linearGradientStart}
            end={linearGradientEnd}
            style={[
              styles.container,
              { height, width, backgroundColor },
              style,
            ]}
          >
            <View style={styles.textContainer}>
              <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.container,
              { height, width, backgroundColor },
              style,
            ]}
          >
            <Text style={[styles.text, textStyle]}>{text}</Text>
          </View>
        )}

        {backgroundImage && (
          <Image
            source={backgroundImage}
            style={[
              styles.backgroundImage,
              imagePosition || styles.centeredImage,
              { width: imageSize.width, height: imageSize.height },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',

    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 20,
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  centeredImage: {},
  textContainer: {
    position: 'absolute',
    bottom: -5,
  },
  text: {
    ...Fonts.SemiBold18,
    color: '#fff',
  },
})

export default ToucheAbleCard
