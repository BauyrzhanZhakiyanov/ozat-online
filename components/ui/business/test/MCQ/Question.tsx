import { TaskQuestionModel } from '@/types/api/test'

interface QuestionProps {
  taskQuestion: TaskQuestionModel
  userAnswer: any
}

const Question = (props: QuestionProps) => {
  const { taskQuestion, userAnswer } = props
  const questionType = taskQuestion.question.type

  switch (questionType) {
    case 'MCQ':
      return (
        // <MCQQuestionComponent
        //   taskQuestion={taskQuestion}
        //   userAnswer={userAnswer}
        // />
      )
    default:
      return null
  }
}

export default Question
