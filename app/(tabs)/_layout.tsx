import { Tabs } from 'expo-router'
import React from 'react'

import TaskIcon from '@/assets/icons/TaskIcon'
import MessageIcon from '@/assets/icons/MessageIcon'
import HomeIcon from '@/assets/icons/HomeIcon'
import ProfileIcon from '@/assets/icons/ProfileIcon'
import { Colors } from '@/constants/colors'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: Colors.white,
    height: 100,
    borderTopWidth: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarItemStyle: {
    marginVertical: 20,
  },
  tabBarActiveTintColor: Colors.primary, // Цвет активной вкладки
  tabBarInactiveTintColor: Colors.blue, // Цвет неактивной вкладки
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TaskIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MessageIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name={'index'}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Tabs>
  )
}
