import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

interface CustomImageProps {
  imagePath: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

const CustomImage = (props: CustomImageProps) => {
  const { imagePath, style } = props
  return (
    <View style={[styles.container, style]}>
      <Image source={imagePath} style={style as StyleProp<ImageStyle>} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CustomImage
