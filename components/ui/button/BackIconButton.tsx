import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Colors } from '@/constants/colors'
import IconButton from '@/components/ui/button/IconButton'
import { useRouter } from 'expo-router'

interface Props {
  style?: StyleProp<ViewStyle>
}

const BackIconButton = (props: Props) => {
  const { style } = props
  const navigation = useRouter()
  return (
    <IconButton
      iconName="chevron-left"
      onClick={() => {
        navigation.back()
      }}
      iconSize={15}
      iconColor="black"
      style={[styles.backButton, style]}
    />
  )
}

const styles = StyleSheet.create({
  backButton: {
    width: 39,
    height: 39,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.gray,
  },
})

export default BackIconButton
