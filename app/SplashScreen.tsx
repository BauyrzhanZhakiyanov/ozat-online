import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Image, StyleSheet } from 'react-native'

const logoImg = require('@/assets/images/business/logo/splash_ozat_logo.png')

interface Props {
  onFinish: () => void
}

const SplashScreen = (props: Props) => {
  const { onFinish } = props
  const translationY = useRef(new Animated.Value(-400)).current
  const stopper = useRef(new Animated.Value(0)).current
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translationY, {
        toValue: 75,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translationY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(stopper, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(stopper, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      onFinish()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onFinish, translationY, rotation])

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <LinearGradient
      colors={['#F0C735', '#D98F39']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { translateY: translationY },
              { rotate: rotateInterpolate },
            ],
          },
        ]}
      >
        <Image source={logoImg} style={styles.logo} />
      </Animated.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0C735',
  },
  logoContainer: {},
  logo: {
    width: 280,
    height: 105,
  },
})

export default SplashScreen
