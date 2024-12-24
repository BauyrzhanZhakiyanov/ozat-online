import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'

interface CustomTabBarProps {
  tabs: {
    key: string
    label: string
    available: boolean
  }[]
  selectedTab: string
  onTabSelect: (tabKey: string) => void
}

const CustomTabBar = (props: CustomTabBarProps) => {
  const { tabs, selectedTab, onTabSelect } = props
  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabButton,
            tab.key === selectedTab
              ? styles.selectedTabButton
              : styles.unselectedTabButton,
          ]}
          onPress={() => onTabSelect(tab.key)}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab.key === selectedTab
                ? styles.selectedTabButtonText
                : styles.unselectedTabButtonText,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderColor: Colors.sunriseLight,
    borderWidth: 1,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    maxWidth: 200,
  },
  unselectedTabButton: {
    backgroundColor: 'transparent',
  },
  selectedTabButton: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    ...Fonts.Regular14,
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  unselectedTabButtonText: {
    color: '#00394C',
  },
  selectedTabButtonText: {
    ...Fonts.Bold14,
    color: Colors.white,
  },
})

export default CustomTabBar
