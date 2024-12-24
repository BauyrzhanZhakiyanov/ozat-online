import React from 'react'
import { Switch, Text, View } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useThemeMode } from '@/context/ThemeContext'
import { useAppDispatch } from '@/store'
import { logout } from '@/store/slices/auth'

const Profile = () => {
  const navigation = useRouter()
  const dispatch = useAppDispatch()
  const { isDarkMode, toggleTheme } = useThemeMode()
  const theme = useTheme()

  const onLogout = () => {
    dispatch(logout())
    navigation.replace('/auth/')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: theme.colors.onBackground, marginBottom: 20 }}>
          ProfileScreen
        </Text>
        <Button
          onPress={onLogout}
          mode="contained"
          style={{ marginBottom: 20 }}
        >
          Шығу
        </Button>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.onBackground, marginRight: 8 }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile
