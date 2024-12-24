import React from 'react'
import { useAppSelector } from '@/store'
import { selectUserNull } from '@/store/selectors/auth'
import { Redirect } from 'expo-router'

const Index = () => {
  const user = useAppSelector(selectUserNull)

  if (!user) {
    return <Redirect href="/auth" />
  }
  return <Redirect href="/home" />
}

export default Index
