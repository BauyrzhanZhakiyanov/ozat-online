import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useSendCodeMutation, verifyConfirmationCode } from '@/store/api/user'
import { useRouter } from 'expo-router'
import IconButton from '@/components/ui/button/IconButton'
import CustomText from '@/components/ui/common/Text'
import WhatsappLogo from '@/assets/images/business/auth/whatsapp'
import { Colors } from '@/constants/colors'
import { Fonts, FontSizes } from '@/constants'
import { useWhatsAppStore } from '@/storage/stateStorage/useWhatsappStore'

const CodeVerification = () => {
  const { whatsappNumber, defaultWhatsAppNumber } = useWhatsAppStore()
  const navigation = useRouter()
  const [otp, setOtp] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(20)
  const [inputBgColors, setInputBgColors] = useState([
    Colors.default,
    Colors.default,
    Colors.default,
    Colors.gray,
  ])
  const inputs = useRef<(TextInput | null)[]>([])
  const intervalRef = useRef<any>(null)
  const shakeAnimation = useRef(new Animated.Value(0)).current
  const [otpCodeError, setOtpCodeError] = useState<string | null>(null)
  const [sendConfirmationCode] = useSendCodeMutation()

  useEffect(() => {
    startTimer()
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      sendOtpRequest()
    }
  }, [otp])

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) {
          return prev - 1
        } else {
          clearInterval(intervalRef.current)
          setTimer(20)
          startTimer()
          ;(async () => {
            await sendConfirmationCode(whatsappNumber)
          })()
          return 20
        }
      })
    }, 1000)
  }

  const handleBackPress = () => {
    clearInterval(intervalRef.current)
    navigation.back()
  }

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value

    if (value && index < 3) {
      inputs.current[index + 1]?.focus()
    }

    setOtp(newOtp)
  }

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp]
      if (otp[index] !== '') {
        newOtp[index] = ''
      } else if (index > 0) {
        newOtp[index - 1] = ''
        inputs.current[index - 1]?.focus()
      }
      setOtp(newOtp)
    }
  }

  const sendOtpRequest = async () => {
    try {
      const verifyCodeResponse = await verifyConfirmationCode(
        whatsappNumber,
        otp.join(''),
      )
      if (verifyCodeResponse.statusCode === 200) {
        setInputBgColors([
          Colors.green,
          Colors.green,
          Colors.green,
          Colors.green,
        ])
        clearInterval(intervalRef.current)
        setTimeout(() => {
          navigation.navigate('/auth/Registration')
        }, 500)
        setOtpCodeError(null)
      } else {
        shake()
        setOtpCodeError('Қате, қайта жазып көріңіз')
        setInputBgColors([Colors.red, Colors.red, Colors.red, Colors.red])
        setTimeout(() => {
          setOtp(['', '', '', ''])
          setInputBgColors([Colors.gray, Colors.gray, Colors.gray, Colors.gray])
          inputs.current[0]?.focus()
          setOtpCodeError(null)
        }, 500)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const shake = () => {
    Vibration.vibrate()
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollViewContainer}
      enableAutomaticScroll={Platform.OS === 'android'}
    >
      <View style={styles.innerContainer}>
        <View style={styles.backButton}>
          <IconButton
            iconName="chevron-left"
            onClick={handleBackPress}
            iconSize={15}
            iconColor="black"
          />
        </View>
        <View style={styles.codeTextContainer}>
          <CustomText style={styles.text}>Кодты енгізіңіз</CustomText>
          <WhatsappLogo />
        </View>
        <View style={styles.whatsappText}>
          <CustomText>
            <Text style={styles.highlightedText}>
              +7 {defaultWhatsAppNumber}
            </Text>{' '}
            нөміріне WhatsApp қосымшаңызға келген кодты жазыңыз
          </CustomText>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <Animated.View
              key={index}
              style={{ transform: [{ translateX: shakeAnimation }] }}
            >
              <TextInput
                ref={(ref) => (inputs.current[index] = ref)}
                style={[styles.otpInput, { borderColor: inputBgColors[index] }]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
              />
            </Animated.View>
          ))}
        </View>
        <View style={styles.errorMessageView}>
          {otpCodeError && (
            <CustomText style={{ color: Colors.red }}>
              {otpCodeError}
            </CustomText>
          )}
        </View>
        <CustomText style={styles.timerGenText}>
          <Text style={styles.timerText}>Кодты қайта жіберу: </Text>
          {formatTime(timer)}
        </CustomText>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  codeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 10,
  },
  whatsappText: {
    marginTop: 16,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Fonts.Bold32,
  },
  backButton: {
    width: 39,
    height: 39,
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedText: {
    ...Fonts.SemiBold20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 15,
    fontSize: 24,
    textAlign: 'center',
    width: 63,
    height: 72,
  },
  timerGenText: {
    marginTop: 80,
    fontSize: FontSizes.fs16,
    textAlign: 'center',
  },
  timerText: {
    ...Fonts.Regular18,
  },
  errorMessageView: {
    paddingTop: 10,
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CodeVerification
