import { ReactNode, useCallback, useEffect, useState } from 'react'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

export default function AppLoading({ children }: { children: ReactNode }) {
  const [isReady, setReady] = useState(false)

  const loadFonts = useCallback(async () => {
    await Font.loadAsync({
      Inter_400Regular,
      Inter_500Medium,
      Inter_700Bold,
    })
    setReady(true)
    await SplashScreen.hideAsync()
  }, [])

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
    loadFonts()
  }, [loadFonts])

  if (!isReady) {
    return null
  }

  return children
}
