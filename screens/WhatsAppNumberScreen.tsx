import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Controller, useForm } from 'react-hook-form'
import { TextInputMask } from 'react-native-masked-text'
import { useWhatsAppStore } from '@/storage/stateStorage/useWhatsappStore'
import CustomText from '@/components/ui/common/Text'
import CustomButton from '@/components/ui/button/Button'
import { Colors } from '@/constants/colors'
import { BorderRadii, Fonts, FontSizes } from '@/constants'
import { useRouter } from 'expo-router'
import { cleanMobileNumber } from '@/utils/auth'
import { useSendCodeMutation } from '@/store/api/user'

const kazImg = require('@/assets/images/business/etc/kaz.png')

interface FormData {
  whatsappNumber: string
}

const WhatsAppNumberScreen = () => {
  const [sendConfirmationCode] = useSendCodeMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const {
    whatsappNumber,
    setWhatsAppNumber,
    defaultWhatsAppNumber,
    setDefaultWhatsAppNumber,
  } = useWhatsAppStore()
  const navigation = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    const mobile = cleanMobileNumber(data.whatsappNumber)
    if (mobile.length !== 10) {
      setError('Телефон номеріңізді дұрыс енгізіңіз')
      return
    } else {
      setError(null)
    }
    setLoading(true)
    try {
      setDefaultWhatsAppNumber(data.whatsappNumber)
      setWhatsAppNumber(mobile)
      navigation.navigate('CodeVerification')
      await sendConfirmationCode({ mobile }).unwrap()
    } catch (error) {
      console.error('Error sending confirmation code:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText style={styles.whatsappTitle}>
          WhatsApp нөміріңізді енгізіп, жүйеге тіркеліңіз
        </CustomText>
      </View>
      <View style={styles.countryContainer}>
        <Image style={styles.flag} source={kazImg} resizeMode={'contain'} />
        <CustomText style={styles.countryText}>Қазақстан</CustomText>
      </View>
      <View style={styles.numberInput}>
        <CustomText
          style={{
            ...Fonts.Regular20,
            fontSize: FontSizes.fs16,
            fontWeight: '400',
            paddingRight: 28,
          }}
        >
          +7
        </CustomText>
        <View
          style={{
            width: 1,
            backgroundColor: Colors.gray,
            height: 26,
            marginRight: 28,
          }}
        ></View>
        <Controller
          control={control}
          name="whatsappNumber"
          defaultValue={whatsappNumber}
          rules={{ required: 'Whatsapp номеріңізді енгізің' }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInputMask
              ref={ref}
              type={'custom'}
              options={{
                mask: '(999) 999-99-99',
              }}
              style={[
                styles.input,
                errors.whatsappNumber ? styles.inputError : null,
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="(000) 000-00-00"
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.whatsappNumber && (
          <Text style={styles.errorText}>{errors.whatsappNumber.message}</Text>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <CustomButton
        title="Жалғастыру"
        onPress={handleSubmit(onSubmit)}
        style={styles.loginButton}
        disabled={loading}
        textStyle={styles.loginButtonText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  flag: {
    height: 32,
    width: 32,
  },
  whatsappTitle: {
    ...Fonts.Regular18,
    color: Colors.black,
    opacity: 0.7,
  },
  countryText: {
    ...Fonts.Regular20,
    color: Colors.black,
  },
  numberInput: {
    width: '100%',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    ...Fonts.Regular20,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  loginButtonDisabled: {
    backgroundColor: Colors.default,
  },
  loginButtonText: {
    color: Colors.white,
    borderRadius: BorderRadii.br10,
    marginHorizontal: 1,
    marginVertical: 1,
  },
})

export default WhatsAppNumberScreen
