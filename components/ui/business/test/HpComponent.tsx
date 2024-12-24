import React from 'react'
import { StyleSheet, View } from 'react-native'
import CustomImage from '@/components/ui/image/Image'

const hpImg = require('@/assets/images/business/etc/hpIcon.jpg')

interface HpComponentProps {
  hpSize: number
}

const HpComponent = (props: HpComponentProps) => {
  const { hpSize } = props
  return (
    <View style={style.hpContainer}>
      {hpSize > 0 &&
        Array.from({ length: hpSize }).map((_, index) => (
          <CustomImage key={index} imagePath={hpImg} />
        ))}
    </View>
  )
}

const style = StyleSheet.create({
  hpContainer: {
    flexDirection: 'row',
  },
})

export default HpComponent
