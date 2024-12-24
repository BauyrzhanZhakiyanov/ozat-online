import React from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import KaTeX from 'react-native-katex'

interface MathRendererProps {
  math: string
  display: boolean
  style?: StyleProp<TextStyle>
}

const MathRenderer = (props: MathRendererProps) => {
  const { math, display, style } = props
  return (
    <KaTeX
      expression={math}
      style={[style, display ? styles.displayMath : styles.inlineMath]}
      throwOnError={false}
      displayMode={display}
    />
  )
}

const styles = StyleSheet.create({
  displayMath: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  inlineMath: {},
})

export default MathRenderer
