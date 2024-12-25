import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Inter, Inter700 } from '@/components/ui/common/Fonts'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import CustomButton from '@/components/ui/button/Button'

const { height } = Dimensions.get('window')

const Success = () => {
  const { title, body } = useLocalSearchParams()
  const navigation = useRouter()
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.check}>
          <Ionicons name={'checkmark'} color={Colors.white} size={50} />
        </View>
        <Inter700 style={styles.title}>{title}</Inter700>
        <Inter style={styles.body}>{body}</Inter>
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          title={'Ок'}
          onPress={() => navigation.dismissTo('/profile/')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: height * 0.2,
    paddingHorizontal: 40,
  },
  content: {
    flex: 3,
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    color: Colors.black,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 20,
    color: '#000000B2',
  },
  check: {
    width: 70,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
    backgroundColor: Colors.crayola,
    marginBottom: 14,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    width: '100%',
    alignSelf: 'flex-start',
  },
})

export default Success
