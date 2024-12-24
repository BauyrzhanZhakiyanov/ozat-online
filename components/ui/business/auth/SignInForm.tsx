import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRouter } from 'expo-router'
import { useLoginMutation } from '@/store/api/user'
import { cleanMobileNumber } from '@/utils/auth'
import { useAppDispatch } from '@/store'
import { setToken, updateUserAction } from '@/store/slices/auth'
import CustomInput from '@/components/ui/input/Input'
import CustomButton from '@/components/ui/button/Button'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'

interface FormData {
  phone: string
  password: string
}

const SignInForm = () => {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const navigation = useRouter()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const phone = cleanMobileNumber(data.phone)

    try {
      const response = await login({
        mobile: phone,
        password: data.password,
      }).unwrap()
      console.log('response', response)

      if (response.status === 404 && response.errorCode === 'USER_NOT_FOUND') {
        setError('phone', {
          type: 'manual',
          message: 'Жүйеде қолданушы тіркелмеген',
        })
        return
      }

      if (
        response.status === 400 &&
        response.errorCode === 'INCORRECT_PASSWORD'
      ) {
        setError('password', {
          type: 'manual',
          message: 'Құпия сөз қате, қайта жазып көріңіз',
        })
        return
      }

      if (response.statusCode === 200) {
        const { accessToken, refreshToken, firstName, lastName, userId } =
          response

        if (!accessToken || !firstName || !lastName) {
          Alert.alert('Error', 'Invalid response from server')
          return
        }

        dispatch(
          setToken({
            token: accessToken,
            refreshToken,
          }),
        )
        dispatch(
          updateUserAction({
            name: firstName,
            surname: lastName,
            phone,
            id: userId,
          }),
        )
        navigation.replace('/(tabs)')
      } else {
        console.log('Failed to login:', response)
        Alert.alert('Error', 'Failed to login')
      }
    } catch (error) {
      console.error('Error during loginRequest:', error)
      Alert.alert('Error', 'Failed to login. Please try again.')
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'android'}
    >
      <View style={styles.inner}>
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          rules={{ required: 'Телефон номерді енгізіңіз' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Телефон"
              placeholder="+7 (000) 000-00-00"
              keyboardType="phone-pad"
              mask="+7 (999) 999-99-99"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{ required: ' Құпия сөзді енгізіңіз' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Құпия сөз"
              placeholder="Құпия сөзді жазыңыз"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('/auth/_components/SignInForm')}
        >
          <Text style={styles.forgotPassword}>Құпия сөзді ұмыттым?</Text>
        </TouchableOpacity>
        <CustomButton
          title="Кіру"
          onPress={handleSubmit(onSubmit)}
          style={styles.loginButton}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
  forgotPassword: {
    color: Colors.black,
    textAlign: 'right',
    marginVertical: 8,
    textDecorationLine: 'underline',
    ...Fonts.Regular18,
  },
  loginButton: {
    marginTop: 40,
    paddingVertical: 17,
    paddingHorizontal: 152,
  },
  errorText: {
    color: Colors.error,
    marginBottom: 8,
  },
})

export default SignInForm
