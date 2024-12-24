import React from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { Fonts } from '@/constants'

interface CustomTextProps extends TextProps {
  style?: TextStyle
}

const CustomText = (props: CustomTextProps) => {
  const { style, children, ...args } = props
  return (
    <Text style={[styles.defaultText, style]} {...args}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  defaultText: {
    ...Fonts.Regular20,
  },
})

export default CustomText
