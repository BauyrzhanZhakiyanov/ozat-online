import React from 'react'
import { Platform, View } from 'react-native'
import WhatsAppNumberScreen from '../../../../screens/WhatsAppNumberScreen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignUpForm = () => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'android'}
    >
      <View style={{ flex: 1 }}>
        <WhatsAppNumberScreen />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SignUpForm
