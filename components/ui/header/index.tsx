import React from 'react'
import {
  Keyboard,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Inter500 } from '@/components/ui/common/Fonts'
import { Colors } from '@/constants/colors'
import ArrowLeft from '@/assets/icons/ArrowLeft'

interface Props {
  title: string
  rightElement?: React.ReactNode
  leftElement?: React.ReactNode
  style?: StyleProp<ViewStyle>
  color?: string
}

const Header = (props: Props) => {
  const { title, rightElement, leftElement, style } = props
  return (
    <Pressable style={[styles.header, style]} onPress={Keyboard.dismiss}>
      {leftElement || <View style={styles.emptyIcon} />}
      <Inter500 style={styles.headerTitle}>{title}</Inter500>
      {rightElement || <View style={styles.emptyIcon} />}
    </Pressable>
  )
}

export const HeaderBack = (props: Omit<Props, 'leftElement'>) => {
  const { title, rightElement, style, color = Colors.black } = props

  const router = useRouter()
  return (
    <Pressable style={[styles.header, style]} onPress={Keyboard.dismiss}>
      <TouchableOpacity onPress={router.back} style={styles.back}>
        <ArrowLeft />
      </TouchableOpacity>
      <Inter500 style={[styles.headerTitle, { color }]}>{title}</Inter500>
      {rightElement || <View style={styles.emptyIcon} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    textAlign: 'center',
  },
  back: {
    padding: 24,
    margin: -24,
  },
  emptyIcon: {
    width: 24,
    aspectRatio: 1,
  },
})

export default Header
