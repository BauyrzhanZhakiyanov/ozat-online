import React from 'react'
import { Stack } from 'expo-router'

const Home = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="my-courses" />
      <Stack.Screen name="course-details" />
      <Stack.Screen name="lesson" />
      <Stack.Screen name="file-viewer" />
      <Stack.Screen name="test-view" />
      <Stack.Screen name="result-test-view" />
      <Stack.Screen name="show-results" />
    </Stack>
  )
}

export default Home
