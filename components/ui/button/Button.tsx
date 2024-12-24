import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { BorderRadii, Fonts } from '@/constants'
import { Colors } from '@/constants/colors'

interface Props {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

const CustomButton = (props: Props) => {
  const { title, onPress, style, textStyle, disabled } = props
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null, style]}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text
        style={[
          styles.buttonText,
          disabled ? styles.disabledButtonText : null,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    borderRadius: BorderRadii.br10,
    marginHorizontal: 1,
    marginVertical: 1,
    ...Fonts.SemiBold20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  disabledButtonText: {
    color: Colors.black,
  },
})

export default CustomButton
