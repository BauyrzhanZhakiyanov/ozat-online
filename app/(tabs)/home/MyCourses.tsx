import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'
import Courses from '@/components/ui/business/course/Courses'
import CustomText from '@/components/ui/common/Text'
import BackBar from '@/components/ui/header/BackBar'

const MyCourses = () => {
  const navigation = useRouter()
  return (
    <SafeAreaView style={style.courseContainer}>
      <View style={style.backBarContainer}>
        <BackBar
          text="Басты бет"
          onPress={() => {
            navigation.navigate('MainScreen')
          }}
        />
      </View>
      <CustomText style={style.headerText}>Менің курстарым</CustomText>
      <Courses />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  courseContainer: {
    backgroundColor: Colors.mainBackground,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  backBarContainer: {
    paddingLeft: 16,
  },
  headerText: {
    ...Fonts.SemiBold28,
    marginLeft: 16,
    marginTop: 16,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
})

export default MyCourses
