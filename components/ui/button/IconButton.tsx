import React, { ReactNode } from 'react'
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome'

type A = {
  svgIcon: ReactNode
  iconStyle?: ImageStyle
  iconName?: never
}
type B = {
  iconName: string
  iconStyle?: ViewStyle
  svgIcon?: never
}
type Props = (A | B) & {
  onClick: () => void
  style?: ViewStyle
  iconSize?: number
  iconColor?: string
  iconWidth?: number
}

const IconButton = (props: Props) => {
  const {
    iconName,
    svgIcon: SvgIcon,
    onClick,
    style,
    iconStyle,
    iconSize = 24,
    iconColor = 'black',
  } = props
  return (
    <TouchableOpacity onPress={onClick} style={[styles.button, style]}>
      {iconName && (
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={iconStyle as TextStyle}
        />
      )}
      {SvgIcon && (
        <SvgIcon
          width={iconSize}
          height={iconSize}
          style={iconStyle as ViewStyle}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default IconButton
