import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants/index'

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    onPrimary: Colors.white,
    background: Colors.white,
    onBackground: Colors.black,
    surface: Colors.white,
    onSurface: Colors.black,
    error: Colors.error,
    onError: Colors.white,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    ...Fonts,
  },
}

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.primary,
    onPrimary: Colors.white,
    background: Colors.black,
    onBackground: Colors.white,
    surface: '#121212',
    onSurface: Colors.white,
    error: Colors.error,
    onError: Colors.white,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    ...Fonts,
  },
}
