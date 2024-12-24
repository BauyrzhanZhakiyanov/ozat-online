import React from 'react'
import { View } from 'react-native'
import CombinedRenderer from '@/utils/content/htmlLatexParser'

interface MCQQuestionTextRendererProps {
  text: string
}

const MCQQuestionTextRenderer = (props: MCQQuestionTextRendererProps) => {
  const { text } = props
  return (
    <View>
      <CombinedRenderer content={text} />
    </View>
  )
}

export default MCQQuestionTextRenderer
