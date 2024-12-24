import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomImage from '@/components/ui/image/Image'
import CustomText from '@/components/ui/common/Text'
import { Colors } from '@/constants/colors'
import { BorderRadii, Fonts } from '@/constants'
import SignInForm from '@/components/ui/business/auth/SignInForm'
import SignUpForm from '@/components/ui/business/auth/SignUpForm'

const logoImg = require('@/assets/images/business/logo/logoLogin.png')

const AuthScreen = () => {
  const [activeScreen, setActiveScreen] = useState<'signIn' | 'signUp'>(
    'signIn',
  )
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomImage imagePath={logoImg} style={styles.customImage} />
        <View style={styles.authContainer}>
          <TouchableOpacity
            style={[
              styles.authContainerArea,
              activeScreen === 'signIn'
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setActiveScreen('signIn')}
          >
            <CustomText style={styles.authContainerText}>
              Жүйеге кіру
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.authContainerArea,
              activeScreen === 'signUp'
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setActiveScreen('signUp')}
          >
            <CustomText style={styles.authContainerText}>Тіркелу</CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.screenContainer}>
          {activeScreen === 'signIn' ? <SignInForm /> : <SignUpForm />}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  customImage: {
    width: 135,
    height: 135,
    marginBottom: 16,
    marginTop: 64,
  },
  authContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    width: 353,
    backgroundColor: '#EDEEEF',
    borderRadius: BorderRadii.br10,
    height: 36,
    padding: 3,
  },
  authContainerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadii.br10,
  },
  activeButton: {
    backgroundColor: 'white',
    ...Fonts.SemiBold20,
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  authContainerText: {
    ...Fonts.Bold18,
    color: Colors.black,
  },
  screenContainer: {
    width: 353,
    paddingTop: 12,
    height: '100%',
  },
})

export default AuthScreen
