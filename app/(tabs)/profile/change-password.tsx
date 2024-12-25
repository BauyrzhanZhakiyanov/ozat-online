import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '@/constants/colors'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import CustomInput from '@/components/ui/input/Input'
import { Inter700 } from '@/components/ui/common/Fonts'
import { Row } from '@/components/ui/common'
import BackIconButton from '@/components/ui/button/BackIconButton'
import { useRouter } from 'expo-router'
import CustomButton from '@/components/ui/button/Button'

const lockImg = require('@/assets/images/business/lock.png')

const ChangePassword = () => {
  const navigation = useRouter()

  const newPasswordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)

  const defaultValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  const onSave: SubmitHandler<typeof defaultValues> = (formData) => {
    console.log(formData)
    if (formData.newPassword !== formData.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Құпия сөздер сәйкес келмейді',
      })
      return
    }
    navigation.navigate({
      pathname: 'profile/success',
      params: {
        title: 'Сәтті орындалды!',
        body: 'Сіздің құпиясөзіңіз сәтті өзгерді',
      },
    })
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <BackIconButton style={styles.back} />
      <View style={{ flex: 4 }}>
        <Row style={styles.titleContainer}>
          <Inter700 style={styles.title}>Құпиясөзді өзгерту</Inter700>
          <Image source={lockImg} style={styles.lock} />
        </Row>
        <Controller
          control={control}
          name="password"
          rules={{
            required: ' Құпия сөзді енгізіңіз',
            minLength: {
              value: 6,
              message: 'Құпия сөз 6 символдан кем болмауы керек',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Қазіргі құпиясөзді жазыңыз"
              placeholder="Құпиясөзіңізді жазыңыз"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="none"
              error={errors.password?.message}
              placeholderTextColor={Colors.placeholder2}
              style={styles.input}
              containerStyle={styles.containerInput}
              onSubmitEditing={() => newPasswordRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: ' Құпия сөзді енгізіңіз',
            minLength: {
              value: 6,
              message: 'Құпия сөз 6 символдан кем болмауы керек',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              ref={newPasswordRef}
              label="Жаңа құпиясөзді жазыңыз"
              placeholder="Кемінде 6 белгі құралуы тиіс"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="none"
              error={errors.newPassword?.message}
              placeholderTextColor={Colors.placeholder2}
              style={styles.input}
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: ' Құпия сөзді енгізіңіз',
            minLength: {
              value: 6,
              message: 'Құпия сөз 6 символдан кем болмауы керек',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              ref={confirmPasswordRef}
              label="Құпия сөзді растаңыз"
              placeholder="Құпия сөзді қайта жазыңыз"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="none"
              error={errors.confirmPassword?.message}
              placeholderTextColor={Colors.placeholder2}
              style={styles.input}
            />
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          title={'Сақтау'}
          onPress={handleSubmit(onSave)}
          style={styles.save}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 11,
  },
  back: {
    marginLeft: 9,
    marginBottom: 45,
    marginTop: 8,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
  },
  lock: {
    width: 64,
    height: 55,
  },
  save: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  input: { paddingVertical: 18, paddingHorizontal: 16 },
  containerInput: {
    marginBottom: 32,
  },
})

export default ChangePassword
