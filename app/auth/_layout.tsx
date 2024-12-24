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
      <Stack.Screen name="CodeVerification" />
      <Stack.Screen name="Registration" />
    </Stack>
  )
}

export default Auth
