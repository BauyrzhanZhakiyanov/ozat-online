import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Searchbar, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/colors'
import CustomText from '@/components/ui/common/Text'
import CustomImage from '@/components/ui/image/Image'
import AchievementCarousel from '@/components/ui/business/user/AchievementCarousel'
import ToucheAbleCard from '@/components/ui/card/ToucheAbleCard'
import { Fonts } from '@/constants'
import { useAppSelector } from '@/store'
import { selectUser } from '@/store/selectors/auth'

const profileImg = require('@/assets/images/business/etc/ProfileImage.png')
const planImg = require('@/assets/images/business/mainscreen/personalplan.png')
const parentImg = require('@/assets/images/business/mainscreen/parent.png')
const myCoursesImg = require('@/assets/images/business/mainscreen/mycourses.png')
const chanceImg = require('@/assets/images/business/mainscreen/chance.png')

const MainScreen = () => {
  const theme = useTheme()
  const navigation = useRouter()
  const user = useAppSelector(selectUser)
  const [searchQuery, setSearchQuery] = useState('')

  const onChangeSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.profile}>
        <View style={styles.textContainer}>
          <CustomText style={styles.profileHello}>
            Сәлем,{' '}
            <Text style={styles.profileName}>{user.name || 'Оқушы'}! 👋🏻</Text>
          </CustomText>
          <CustomText style={styles.profileText}>
            маңызды жаңалықтарды жіберіп алма
          </CustomText>
        </View>
        <View style={styles.logoContainer}>
          <CustomImage imagePath={profileImg} style={styles.avatar} />
        </View>
      </View>

      <AchievementCarousel />
      <View style={{ marginTop: 32, marginBottom: 40, paddingRight: 16 }}>
        <Searchbar
          placeholder="Іздеу"
          placeholderTextColor={'rgba(0.6, 0.6, 0.67, 0.6)'}
          value={searchQuery}
          onChangeText={onChangeSearch}
          iconColor={'rgba(0.6, 0.6, 0.67, 0.5)'}
          style={styles.search}
          inputStyle={styles.searchInput}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentList}>
          <ToucheAbleCard
            text="Менің сабақ жоспарым"
            height={162}
            width={162}
            backgroundImage={planImg}
            onPress={() => console.log('Card Pressed')}
            linearGradientColors={['#A9FFEA', '#00B288']}
            linearGradientStart={{ x: 0, y: 0 }}
            linearGradientEnd={{ x: 1, y: 1 }}
            textStyle={styles.text}
            imageSize={{ width: 125, height: 125 }}
            imagePosition={{ top: -10 }}
          />

          <ToucheAbleCard
            text="Ата-ана үшін"
            height={105}
            width={162}
            backgroundImage={parentImg}
            onPress={() => console.log('Card Pressed')}
            linearGradientColors={['#FFA0BC', '#FF1B5E']}
            linearGradientStart={{ x: 0, y: 0 }}
            linearGradientEnd={{ x: 1, y: 1 }}
            textStyle={styles.text}
            imageSize={{ width: 100, height: 100 }}
            imagePosition={{ top: -30 }}
          />
        </View>
        <View style={styles.contentList}>
          <ToucheAbleCard
            text="Менің курстарым"
            height={120}
            width={162}
            backgroundImage={myCoursesImg}
            onPress={() => navigation.navigate('/(tabs)/home/MyCourses')}
            linearGradientColors={['#FFD29D', '#FF9E2D']}
            linearGradientStart={{ x: 0, y: 0 }}
            linearGradientEnd={{ x: 1, y: 1 }}
            textStyle={styles.text}
            imageSize={{ width: 100, height: 100 }}
            imagePosition={{ top: -18 }}
          />
          <ToucheAbleCard
            text="Түсу ықтималдылығы"
            height={150}
            width={162}
            backgroundImage={chanceImg}
            onPress={() => console.log('Card Pressed')}
            linearGradientColors={['#B1EEFF', '#29BAE2']}
            linearGradientStart={{ x: 0, y: 0 }}
            linearGradientEnd={{ x: 1, y: 1 }}
            textStyle={styles.text}
            imageSize={{ width: 100, height: 100 }}
            imagePosition={{ top: 5 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 26,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  profileHello: {
    fontSize: 24,
    ...Fonts.Montserrat_300Light,
  },
  profileName: {
    fontSize: 24,
    ...Fonts.Montserrat_600SemiBold,
  },
  profileText: {
    color: '#8D8D8D',
    ...Fonts.Regular18,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: '#C8B9FD',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 16,
  },
  contentList: {},
  text: {
    paddingBottom: 18,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  search: {
    backgroundColor: Colors.mainBackground,
    borderRadius: 10,
    borderColor: Colors.default,
    borderWidth: 1,
    width: 334,
    paddingVertical: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'center',
    height: 42,
    lineHeight: 42,
    fontSize: 16,
  },
})

export default MainScreen
