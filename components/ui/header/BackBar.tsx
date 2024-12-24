import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React from 'react'
import ArrowLeft from '@/assets/icons/ArrowLeft'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'

interface BackBarProps {
  text?: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  arrowColor?: string
}

const BackBar = ({
  text,
  onPress,
  style,
  textStyle,
  arrowColor,
}: BackBarProps) => {
  return (
    <View style={[styles.backBarContainer, style]}>
      <TouchableOpacity style={[styles.iconContainer]} onPress={onPress}>
        <ArrowLeft color={arrowColor} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 24,
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    paddingHorizontal: 3,
    paddingVertical: 4.5,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    ...Fonts.Urbanist_400Regular,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
  },
})

export default BackBar
