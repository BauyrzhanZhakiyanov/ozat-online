import React from 'react'
import { StyleSheet, View } from 'react-native'
import CustomImage from '../../image/Image'
import CustomButton from '../../button/Button'
import { useTestStore } from '@/storage/testStorage/useTestStore'
import { useRouter } from 'expo-router'
import { Fonts } from '@/constants'
import { startTestState } from '@/constants/test'

const birdImg = require('@/assets/images/business/test/HelloBird.png')

const TestStartComponent = () => {
  const { testId } = useTestStore()
  const navigation = useRouter()
  return (
    <View style={style.container}>
      <CustomImage imagePath={birdImg} />
      <CustomButton
        title="Бастау"
        style={style.button}
        textStyle={{
          ...Fonts.SemiBold20,
        }}
        onPress={() => {
          navigation.navigate('TestView', {
            testPassStatus: {
              ...startTestState,
              attemptId: '',
              testId: testId ? testId : '',
            },
          })
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 10,
  },
})

export default TestStartComponent
