import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export const Center = ({ children }: PropsWithChildren) => {
  return <View style={styles.center}>{children}</View>
}

export const Row = ({ children, style, ...args }: ViewProps) => {
  return (
    <View {...args} style={[styles.row, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
})
