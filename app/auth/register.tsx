import React from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'expo-router'
import { useWhatsAppStore } from '@/storage/stateStorage/useWhatsappStore'
import { useRegisterMutation } from '@/store/api/user'
import { useAppDispatch } from '@/store'
import { setToken, updateUserAction } from '@/store/slices/auth'
import { Colors } from '@/constants/colors'
import CustomImage from '@/components/ui/image/Image'
import CustomText from '@/components/ui/common/Text'
import CustomInput from '@/components/ui/input/Input'
import { Fonts } from '@/constants'
import CustomButton from '@/components/ui/button/Button'
import BackIconButton from '@/components/ui/button/BackIconButton'

const logoImg = require('@/assets/images/business/logo/logoLogin.png')

interface FormData {
  name: string
  surname: string
  password: string
  confirmPassword: string
  termsAccepted: boolean
}

const Register = () => {
  const navigation = useRouter()
  const [register] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>()
  const { whatsappNumber } = useWhatsAppStore()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Құпия сөздер сәйкес келмейді',
      })
      return
    }
    const roles = 'R_STD'
    try {
      const newRegisterResponse = await register({
        mobile: whatsappNumber,
        password: data.password,
        roles,
        firstName: data.name,
        lastName: data.surname,
      }).unwrap()
      if (newRegisterResponse.statusCode !== 200) {
        Alert.alert('Тіркелу кезінде қателік', newRegisterResponse.message)
      } else {
        dispatch(
          updateUserAction({
            name: data.name,
            surname: data.surname,
            phone: whatsappNumber,
            id: 1,
            roles: newRegisterResponse.roles,
            balance: newRegisterResponse.balance,
          }),
        )
        dispatch(
          setToken({
            token: newRegisterResponse.token,
            refreshToken: newRegisterResponse.refreshToken,
          }),
        )
        navigation.navigate('/(tabs)')
      }
    } catch (error) {
      console.error('Register failed:', error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        enableAutomaticScroll={Platform.OS === 'android'}
      >
        <View style={styles.innerContainer}>
          <View style={styles.topNav}>
            <BackIconButton style={styles.backButton} />
            <CustomImage imagePath={logoImg} style={styles.customImage} />
          </View>
          <CustomText style={styles.registrationTitleText}>Тіркелу</CustomText>
          <KeyboardAwareScrollView
            enableAutomaticScroll={Platform.OS === 'android'}
            extraScrollHeight={Platform.OS === 'ios' ? 100 : 120}
          >
            <View style={styles.main}>
              <Controller
                control={control}
                name="name"
                defaultValue=""
                rules={{
                  required: 'Есіміңізді толық жазыңыз',
                  minLength: {
                    value: 3,
                    message: 'Есіміңіз 3 символдан кем болмауы керек',
                  },
                  pattern: {
                    value: /^[А-Яа-яЁёІіҢңҮүҰұҚқӨөҺһ\s]+$/i,
                    message: 'Тек қазақша әріптерін жазыңыз',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Атыңызды жазыңыз"
                    placeholder="Толық атыңызды жазыңыз"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.name?.message}
                    style={styles.input}
                  />
                )}
              />

              <Controller
                control={control}
                name="surname"
                defaultValue=""
                rules={{
                  required: ' Тегіңізді жазыңыз',
                  minLength: {
                    value: 3,
                    message: 'Тегі 2 символдан кем болмауы керек',
                  },
                  pattern: {
                    value: /^[А-Яа-яЁёІіҢңҮүҰұҚқӨөҺһ\s]+$/i,
                    message: 'Тек қазақша әріптерін жазыңыз',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Тегіңізді жазыңыз"
                    placeholder="Тегіңізді жазыңыз"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    error={errors.surname?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: ' Құпия сөзді енгізіңіз',
                  minLength: {
                    value: 6,
                    message: 'Құпия сөз 6 символдан кем болмауы керек',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Құпия сөз"
                    placeholder="Кемінде 6 белгі құралуы тиіс"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    textContentType="none"
                    error={errors.password?.message}
                    style={styles.input}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                defaultValue=""
                rules={{
                  required: ' Құпия сөзді енгізіңіз',
                  minLength: {
                    value: 6,
                    message: 'Құпия сөз 6 символдан кем болмауы керек',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Құпия сөзді растау"
                    placeholder="Құпия сөді қайта жазыңыз"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    textContentType="none"
                    error={errors.confirmPassword?.message}
                    style={styles.input}
                  />
                )}
              />
              <Controller
                control={control}
                name="termsAccepted"
                defaultValue={true}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.switchContainer}>
                    <Switch
                      onValueChange={onChange}
                      value={value}
                      trackColor={{ false: Colors.gray, true: Colors.green }}
                      thumbColor={value ? Colors.secondary : Colors.lightGray}
                    />
                    <View style={styles.switchTextContainer}>
                      <Text style={styles.switchBoldText}>
                        Күнделікті хабарландыру
                      </Text>
                      <Text>
                        Қосымшадағы хабарландыруларды күнделікті алып тұрамын
                      </Text>
                    </View>
                  </View>
                )}
              />
              <CustomButton
                title="Тіркелу"
                onPress={handleSubmit(onSubmit)}
                style={styles.loginButton}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
  },
  innerContainer: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 60,
  },
  registrationTitleText: {
    marginLeft: 25,
    ...Fonts.Regular32,
  },
  customImage: {
    width: 95,
    height: 95,
    margin: 24,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 20,
  },
  main: {
    marginHorizontal: 20,
  },
  input: {
    width: '88%',
    height: 56,
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  switchTextContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    width: 300,
  },
  switchBoldText: {
    ...Fonts.SemiBold20,
  },
  switchText: {
    ...Fonts.Regular18,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
})

export default Register
