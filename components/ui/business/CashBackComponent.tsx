import React from 'react'
import { StyleSheet, Text } from 'react-native'
import CustomImage from '../image/Image'
import { LinearGradient } from 'expo-linear-gradient'
import GiftBox from '@/assets/icons/GiftBox'
import { Colors } from '@/constants/colors'
import { Fonts } from '@/constants'

const cashbackImg = require('@/assets/images/business/etc/cashbackCoin.png')

interface CashBackComponentProps {
  cashbackAmount?: number
}

const CashBackComponent = (props: CashBackComponentProps) => {
  const { cashbackAmount } = props
  return (
    <LinearGradient
      colors={['#F0C735', '#EF9B38']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style.cashbackContainer}
    >
      <CustomImage imagePath={cashbackImg} />
      {cashbackAmount ? (
        <Text style={style.cashbackText}>{cashbackAmount}</Text>
      ) : (
        <GiftBox />
      )}
    </LinearGradient>
  )
}

const style = StyleSheet.create({
  cashbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    height: 36,
    borderRadius: 21,
    padding: 9,
  },
  cashbackText: {
    ...Fonts.SemiBold18,
    color: Colors.white,
    fontWeight: '600',
  },
})

export default CashBackComponent
