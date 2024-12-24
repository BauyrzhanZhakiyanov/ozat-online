import { Tabs } from 'expo-router'
import React from 'react'

import TaskIcon from '@/assets/icons/TaskIcon'
import MessageIcon from '@/assets/icons/MessageIcon'
import HomeIcon from '@/assets/icons/HomeIcon'
import ProfileIcon from '@/assets/icons/ProfileIcon'
import { Colors } from '@/constants/colors'

const screenOptions = {
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
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: '',
          tabBarIcon: () => <TaskIcon />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: '',
          tabBarIcon: () => <MessageIcon />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: '',
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </Tabs>
  )
}
