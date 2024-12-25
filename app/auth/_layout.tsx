import React from 'react'
import { Stack } from 'expo-router'

const Auth = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="code-verification" />
      <Stack.Screen name="register" />
    </Stack>
  )
}

export default Auth
