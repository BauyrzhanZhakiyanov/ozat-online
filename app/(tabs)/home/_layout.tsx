import React from 'react'
import { Stack } from 'expo-router'

const Home = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyCourses" />
      <Stack.Screen name="CourseDetails" />
      <Stack.Screen name="Lesson" />
      <Stack.Screen name="FileViewer" />
      <Stack.Screen name="TestView" />
      <Stack.Screen name="ResultTestView" />
      <Stack.Screen name="ShowResults" />
    </Stack>
  )
}

export default Home
