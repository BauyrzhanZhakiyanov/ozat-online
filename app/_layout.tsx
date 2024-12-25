import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React, { PropsWithChildren, useState } from 'react'
import 'react-native-reanimated'
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter'

import { Provider } from 'react-redux'
import { persistor, store } from '@/store'
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  useFonts as useMontserratFonts,
} from '@expo-google-fonts/montserrat'
import {
  Urbanist_400Regular,
  useFonts as useUrbanistFonts,
} from '@expo-google-fonts/urbanist'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar, useColorScheme } from 'react-native'
import SplashScreen from '@/app/SplashScreen'
import { PersistGate } from 'redux-persist/integration/react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

export default function RootLayout({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const [interLoaded] = useInterFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  const [montserratLoaded] = useMontserratFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  })

  const [urbanistLoaded] = useUrbanistFonts({
    Urbanist_400Regular,
  })

  const [loaded] = useFonts({
    Inter: require('@/assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter_18pt-Bold.ttf'),
  })
  const [animationFinished, setAnimationFinished] = useState(false)

  if (
    !loaded ||
    !interLoaded ||
    !montserratLoaded ||
    !urbanistLoaded ||
    !animationFinished
  ) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <SplashScreen onFinish={() => setAnimationFinished(true)} />
      </SafeAreaProvider>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="auth" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}
