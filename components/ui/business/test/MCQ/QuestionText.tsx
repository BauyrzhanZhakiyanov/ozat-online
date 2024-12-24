import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import MathRenderer from '@/components/ui/viewers/MathRenderer'

interface QuestionTextProps {
  text: string
  gapAnswer: string
  setGapAnswer: (answer: string) => void
}

type ParsedElement =
  | string
  | { type: 'math'; content: string; display: boolean }
  | { type: 'gap' }

const QuestionText = (props: QuestionTextProps) => {
  const { text, gapAnswer, setGapAnswer } = props
  const parseQuestionText = (text: string): ParsedElement[] => {
    const regex = /(<gap>)|(\$\$.*?\$\$)|(\$.*?\$)/g

    const elements: ParsedElement[] = []
    let lastIndex = 0

    let match
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index))
      }

      if (match[0] === '<gap>') {
        elements.push({ type: 'gap' })
      } else if (match[0].startsWith('$$')) {
        const content = match[0].substring(2, match[0].length - 2)
        elements.push({ type: 'math', content, display: true })
      } else if (match[0].startsWith('$')) {
        const content = match[0].substring(1, match[0].length - 1)
        elements.push({ type: 'math', content, display: false })
      }

      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex))
    }

    return elements
  }

  const renderedText = parseQuestionText(text).map((element, index) => {
    if (typeof element === 'string') {
      return (
        <Text key={index} style={styles.text}>
          {element}
        </Text>
      )
    } else if (element.type === 'math') {
      return (
        <MathRenderer
          key={index}
          math={element.content}
          display={element.display}
          style={styles.math}
        />
      )
    } else if (element.type === 'gap') {
      return (
        <TextInput
          key={index}
          style={styles.gapInput}
          value={gapAnswer}
          onChangeText={setGapAnswer}
          placeholder="Your answer"
        />
      )
    }
  })

  return <>{renderedText}</>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  math: {},
  gapInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    minWidth: 50,
    marginHorizontal: 5,
    fontSize: 16,
  },
})

export default QuestionText
