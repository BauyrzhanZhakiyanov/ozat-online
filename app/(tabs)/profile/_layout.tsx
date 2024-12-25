import React from 'react'
import { Stack } from 'expo-router'

const _Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="success" />
      <Stack.Screen name="change-phone" />
      <Stack.Screen name="change-password" />
    </Stack>
  )
}

export default _Layout
