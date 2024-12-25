import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/store/slices/auth'
import { HeaderBack } from '@/components/ui/header'
import {
  Controller,
  ControllerProps,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import CustomInput from '@/components/ui/input/Input'
import { Inter, Inter600, Inter700 } from '@/components/ui/common/Fonts'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '@/components/ui/button/Button'
import { useUpdateUserMutation } from '@/store/api/user'
import { Colors } from '@/constants/colors'
import { selectUser } from '@/store/selectors/auth'
import utils from '@/utils'
import { Center, Row } from '@/components/ui/common'
import { Shadows } from '@/constants'
import EditIcon from '@/assets/icons/EditIcon'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'

const avatarImg = require('@/assets/images/business/user/avatar.jpg')

const ProfileInput: ControllerProps['render'] = ({
  field: { onChange, onBlur, value, name },
  formState: { errors },
}) => {
  const labels = {
    name: { label: 'Аты', placeholder: 'Толық атыңызды жазыңыз' },
    surname: { label: 'Тегі', placeholder: 'Тегіңізді жазыңыз' },
    patronymic: { label: 'Әкесінің аты', placeholder: 'Әкесінің атын жазыңыз' },
    email: { label: 'Email поштаңыз', placeholder: 'example@example.com' },
    parentEmail: {
      label: 'Ата-анаңыздың поштасы',
      placeholder: 'example@example.com',
    },
    level: { label: 'Сыныбыңыз', placeholder: 'Сыныпты таңдаңыз' },
    extraPhone: { label: 'Қосымша нөмір', placeholder: '+7 (000) 000-00-00' },
  }[name]
  return (
    <CustomInput
      {...labels}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      // @ts-ignore
      error={errors[name]?.message}
      style={styles.input}
      containerStyle={styles.containerInput}
      labelStyle={styles.inputLabel}
      placeholderTextColor={Colors.placeholder}
    />
  )
}

const Index = () => {
  const navigation = useRouter()
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  const values = {
    name: user.name,
    surname: user.surname,
    patronymic: user.patronymic,
    email: user.email,
    parentEmail: user.parentEmail,
    phone: user.phone,
    parentPhone: user.parentPhone,
    level: user.level,
    extraPhone: user.extraPhone,
  }

  console.log(user)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: values,
  })

  const [updateUser] = useUpdateUserMutation()

  const onLogout = () => {
    dispatch(logout())
    navigation.replace('/auth')
  }

  const onSave: SubmitHandler<typeof values> = (formData) => {
    console.log(formData)
    if (0 > 1) {
      updateUser({
        name: formData.name,
        surname: formData.surname,
        patronymic: formData.patronymic,
        email: formData.email,
        parentEmail: formData.parentEmail,
        level: formData.level,
      })
    }
  }

  const onAvatar = async () => {
    try {
      const file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      })
      if (file) {
        console.log(file)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <HeaderBack
        title={''}
        rightElement={
          isDirty ? (
            <TouchableOpacity onPress={handleSubmit(onSave)}>
              <Inter600 style={styles.headerRightText}>Өзгерту</Inter600>
            </TouchableOpacity>
          ) : null
        }
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.form}
      >
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={onAvatar}>
            <View style={styles.avatar}>
              <Image
                style={{ flex: 1 }}
                source={user.avatar ? { uri: user.avatar } : avatarImg}
              />
            </View>
            <View style={styles.edit}>
              <EditIcon />
            </View>
          </TouchableOpacity>
          <Inter600 style={styles.username}>
            {user.name} {user.surname}
          </Inter600>
          <Center>
            <Inter600 style={styles.username}>
              {utils.prettyPrice(user.balance || 7500)}
            </Inter600>
            <Inter style={styles.balanceSubtitle}>баланста</Inter>
          </Center>
        </View>
        <Row style={styles.cards}>
          <TouchableOpacity style={styles.bonusCard}>
            <LinearGradient
              colors={['#F8ACFF', '#696EFF']}
              start={{ x: 0.1, y: 0.2 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradient}
            >
              <Inter700 style={styles.bonusCardText}>
                {utils.prettyPrice(user.bonuses || 1000)}
              </Inter700>
              <Inter style={styles.bonusCardTextSmall}>бонус</Inter>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bonusCard}>
            <LinearGradient
              colors={['#F8ACFF', '#696EFF']}
              start={{ x: 0.1, y: 0.2 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradient}
            >
              <Inter600 style={styles.bonusCardTextSmall}>Төлем жасау</Inter600>
            </LinearGradient>
          </TouchableOpacity>
        </Row>
        <Controller
          control={control}
          name="surname"
          rules={{
            required: 'Тегіңізді жазыңыз',
            minLength: {
              value: 3,
              message: 'Тегі 2 символдан кем болмауы керек',
            },
            pattern: {
              value: /^[А-Яа-яЁёІіҢңҮүҰұҚқӨөҺһ\s]+$/i,
              message: 'Тек қазақша әріптерін жазыңыз',
            },
          }}
          render={ProfileInput}
        />

        <Controller
          control={control}
          name="name"
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
          render={ProfileInput}
        />

        <Controller
          control={control}
          name="patronymic"
          rules={{
            required: 'Әкесінің атын жазыңыз',
            minLength: {
              value: 3,
              message: 'Әкесінің аты 2 символдан кем болмауы керек',
            },
            pattern: {
              value: /^[А-Яа-яЁёІіҢңҮүҰұҚқӨөҺһ\s]+$/i,
              message: 'Тек қазақша әріптерін жазыңыз',
            },
          }}
          render={ProfileInput}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Есіміңізді толық жазыңыз',
            minLength: {
              value: 3,
              message: 'Пошта міндетті түрде толтырылады',
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Қате пошта',
            },
          }}
          render={ProfileInput}
        />
        <Controller
          control={control}
          name="phone"
          rules={{ required: 'Телефон номерді енгізіңіз' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Телефон нөміріңіз"
              placeholder="+7 (000) 000-00-00"
              keyboardType="phone-pad"
              mask="+7 (999) 999-99-99"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
              containerStyle={styles.containerInput}
              placeholderTextColor={Colors.placeholder}
            />
          )}
        />
        <Controller
          control={control}
          name="parentPhone"
          rules={{ required: 'Телефон номерді енгізіңіз' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Ата-ана нөмірі"
              placeholder="+7 (000) 000-00-00"
              keyboardType="phone-pad"
              mask="+7 (999) 999-99-99"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
              containerStyle={styles.containerInput}
              placeholderTextColor={Colors.placeholder}
            />
          )}
        />
        <Controller
          control={control}
          name="extraPhone"
          rules={{ required: 'Телефон номерді енгізіңіз' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Қосымша нөмір"
              placeholder="+7 (000) 000-00-00"
              keyboardType="phone-pad"
              mask="+7 (999) 999-99-99"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
              containerStyle={styles.containerInput}
              placeholderTextColor={Colors.placeholder}
            />
          )}
        />
        <View style={styles.buttons}>
          <CustomButton
            title={'Нөмірді ауыстыру'}
            onPress={() => navigation.navigate('profile/change-phone')}
            style={styles.button}
          />
          <CustomButton
            title={'Құпиясөзді ауыстыру'}
            onPress={() => navigation.navigate('profile/change-password')}
            style={styles.button}
          />
          <CustomButton
            title={'Шығу'}
            onPress={onLogout}
            style={[styles.button, styles.buttonOutline]}
            textStyle={styles.buttonOutlineText}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerRightText: {
    color: Colors.black,
  },
  avatarContainer: {
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    borderRadius: 100,
    height: 100,
    aspectRatio: 1,
    overflow: 'hidden',
    ...Shadows.s10,
    backgroundColor: Colors.white,
  },
  edit: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: Colors.primary,
    width: 31,
    aspectRatio: 1,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    lineHeight: 24,
  },
  balanceSubtitle: {
    fontSize: 12,
    lineHeight: 20,
    color: `rgba(0, 0, 0, 0.30)`,
  },
  input: {
    height: 47,
    padding: 10,
    borderColor: Colors.black,
  },
  inputLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  form: {
    gap: 20,
    marginTop: 5,
  },
  containerInput: {
    marginVertical: 0,
  },
  buttons: {
    marginTop: 16,
    gap: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonOutlineText: {
    color: Colors.primary,
  },
  cards: {
    gap: 20,
  },
  bonusCard: {
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 105,
  },
  bonusCardText: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.ghostWhite,
  },
  bonusCardTextSmall: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.ghostWhite,
  },
  gradient: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Index
