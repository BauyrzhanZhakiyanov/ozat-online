import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import EagleWelcome from '@/assets/images/business/eagle/eagle-welcome'
import CustomText from '@/components/ui/common/Text'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const bookImage = require('@/assets/images/business/book/book.png')

const Welcome = () => {
  return (
    <View
      style={[styles.container, { width: windowWidth, height: windowHeight }]}
    >
      <View style={styles.elipse1}></View>
      <View style={styles.elipse2}></View>
      <View style={styles.elipse3}></View>
      <View style={styles.content}>
        <View style={styles.eagle}>
          <EagleWelcome />
        </View>
        <View>
          <CustomText style={styles.welcomeMainText}>Қош келдіңіз!</CustomText>
        </View>
        <View>
          <CustomText style={styles.welcomeAddText}>
            Еліміздегі ең үздік инновациялық платформада білім алып, жарқын
            болашағыңызды бүгіннен бастаңыз
          </CustomText>
        </View>
      </View>
      <View style={[styles.book1, styles.book]}>
        <Image source={bookImage} />
      </View>
      <View style={[styles.book2, styles.book]}>
        <Image source={bookImage} />
      </View>
      <View style={[styles.book3, styles.book]}>
        <Image source={bookImage} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMainText: {
    ...Fonts.Bold40,
    color: Colors.primary,
  },
  welcomeAddText: {
    ...Fonts.Regular20,
    color: Colors.black,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 16,
    width: 320,
  },
  eagle: {
    marginTop: 147,
  },
  elipse1: {
    position: 'absolute',
    width: 387,
    height: 506,
    transform: [{ rotate: '-30.121deg' }],
    flexShrink: 0,
    backgroundColor: '#FFBE5E',
    borderRadius: 506,
    top: -324,
    right: 61,
  },
  elipse2: {
    position: 'absolute',
    width: 470,
    height: 470,
    flexShrink: 0,
    backgroundColor: '#F3AF4A',
    borderRadius: 470,
    borderWidth: 2,
    borderColor: '#FFF1DD',
    top: -204,
    left: -24,
    right: -1,
    bottom: -540,
    zIndex: -1,
  },
  elipse3: {
    position: 'absolute',
    width: 506,
    height: 506,
    flexShrink: 0,
    backgroundColor: '#F3AF4A',
    borderRadius: 506,
    top: -182,
    left: -188,
    right: -57,
    bottom: -488,
    zIndex: -2,
  },
  book: {
    position: 'absolute',
  },
  book1: {
    top: 320,
    left: -43,
    transform: [{ rotate: '37.122deg' }],
  },
  book2: {
    top: 250,
    left: 330,
  },
  book3: {
    top: 406,
    right: -29,
    transform: [{ rotate: '37.122deg' }],
  },
})

export default Welcome
