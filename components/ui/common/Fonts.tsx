import React from 'react'
import { StyleSheet, Text, type TextProps } from 'react-native'
import { Colors } from '@/constants/colors'

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'medium' | 'semiBold' | 'bold' | 'link'
}

export function Inter({ style, ...rest }: ThemedTextProps) {
  return (
    <Text style={[{ fontFamily: 'Inter' }, styles.default, style]} {...rest} />
  )
}
export function Inter500({ style, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[{ fontFamily: 'Inter-Medium' }, styles.default, style]}
      {...rest}
    />
  )
}
export function Inter600({ style, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[{ fontFamily: 'Inter-SemiBold' }, styles.default, style]}
      {...rest}
    />
  )
}
export function Inter700({ style, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[{ fontFamily: 'Inter-Bold' }, styles.default, style]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
})
