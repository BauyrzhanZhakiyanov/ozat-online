import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { QuestionModel } from '@/types/api/test'
import { Colors } from '@/constants/colors'
import ContentRender from '@/utils/content/ContentRender'
import { useTestStore } from '@/storage/testStorage/useTestStore'

interface MCQQuestionComponentProps {
  question: QuestionModel
  isFinished: boolean
  userAnswer?: string
  taskId: string
}

const MCQQuestionComponent = (props: MCQQuestionComponentProps) => {
  const { question, isFinished, userAnswer, taskId } = props
  const { userAnswers, setUserAnswer } = useTestStore()

  const currentUserAnswer = userAnswers[taskId]?.[question.id]?.optionId || null

  // TODO maybe bug with currentUserAnswer
  useEffect(() => {
    if (userAnswer && !currentUserAnswer) {
      setUserAnswer(taskId, question.id, userAnswer)
    }
  }, [userAnswer, taskId, question.id])

  const handleOptionSelect = (optionId: string) => {
    if (!isFinished) {
      setUserAnswer(taskId, question.id, optionId)
    }
  }

  const renderOption = (option: { id: string; text: string }) => {
    const isCorrectAnswer = option.id === question.correctOptionId
    const isUserAnswer = option.id === currentUserAnswer

    let backgroundColor = '#fff'
    let borderColor = '#ddd'
    let textColor = '#000'

    if (isFinished) {
      if (isCorrectAnswer) {
        backgroundColor = Colors.correctAnswer
        borderColor = '#00DD00'
        textColor = '#18BA18'
      } else if (isUserAnswer && !isCorrectAnswer) {
        backgroundColor = Colors.wrongAnswer
        borderColor = '#FF4B4C'
        textColor = '#FF2C20'
      }
    } else {
      if (isUserAnswer) {
        backgroundColor = Colors.selecteduserAnswer
        borderColor = '#F7931E'
        textColor = Colors.primary
      }
    }

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.option,
          {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          },
        ]}
        onPress={() => handleOptionSelect(option.id)}
        disabled={isFinished}
        accessibilityLabel={`Option ${option.id}`}
        accessibilityState={{ selected: isUserAnswer }}
      >
        <ContentRender
          htmlContent={option.text}
          isOption={true}
          textColor={textColor}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionText}>
        <ContentRender htmlContent={question.text} />
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option) => renderOption(option))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  questionText: {
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    display: 'flex',
    width: '100%',
    minHeight: 37,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(187, 187, 187, .2)',
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MCQQuestionComponent
