export interface QuestionMCQModel {
  type: string
  id: string
  text: string
  levelId: string
  solutionType: string
  url: string
  solution: string
  hint: string
  authorId: string
  createdAt: string
  updatedAt: string
  status: string
  correctAnswer: string
  options: { text: string }[]
}

export interface QuestionModel {
  type: 'MCQ' | 'GAP_FILL' | 'MATCHING' | 'FREE_TEXT'
  id: string
  text: string
  levelId: string
  solutionType: string
  url: string
  solution: string
  hint: string
  authorId: string
  createdAt: string
  updatedAt: string
  status: string
  correctAnswer: string
  options: { id: string; text: string }[]
  correctOptionId: string
  userAnswer: string | null
  correcAnswer: string
  advancedHint: string
}

export interface TaskAttemptActionModel {
  id: string
  attemptNumber: number
  mentorEnabled: boolean
  hintEnabled: boolean
  advancedHintEnabled: boolean
  requiredLives: number
}

export interface TaskAttemptActionsModel {
  id: string
  attemptNumber: number
  mentorEnabled: boolean
  hintEnabled: boolean
  advancedHintEnabled: boolean
  requiredLives: number
}

export interface TaskFullModel {
  id: string
  taskOrder: number
  testId: string
  lives: number
  score: number
  difficultyType: string
  taskQuestions: TaskQuestionModel[]
  attemptActions: TaskAttemptActionModel[]
}

export interface TaskModel {
  taskOrder: number
  taskId: string
  isCompleted: boolean
  isCorrect: boolean | null
  attempts?: AttemptModel[]
}

export interface AttemptModel {
  attemptNumber: number
  isCorrect: boolean
}

export interface TaskQuestionModel {
  id: string
  questionId: string
  questionOrder: number
  question: QuestionModel
  isCorrect: string
  userAnswer: string
}

export interface TestAttemptsModel {
  attemptId: string
  scorePercentage: number
  totalQuestions: number
  correctAnswers: number
  timeSpentSeconds: number
  attemptNumber: number
  completedAt: string
  testStatus: 'COMPLETED' | 'IN_PROGRESS'
}

export interface TestAttemptModel extends TestAttemptsModel {
  taskResults: {
    taskId: string
    isCorrect: boolean
    question: QuestionModel
    userAnswer: string
  }[]
}

export interface TestFullModel {
  test: {
    id: string
    testName: string
    testTemplate: TestTemplateModel
    totalTasks: number
    totalScore: number
    duration: number
    taskIds: TaskModel[]
    currentTaskOrder: number
    levelId: string
    status: string
    createdAt: string
    updatedAt: string
    version: number
    lastUpdatedBy: string
    grade: string
    url: string
    certificateId: string
    taskLimit: number
    courseId: string
    sectionId: string
    lessonId: string
    durationAvailable: boolean
    gradeAvailable: boolean
    cacheAvailable: boolean
    retakeAvailable: boolean
    lessonTest: boolean
  }
  testStatus: 'COMPLETED' | 'IN_PROGRESS'
}

export interface TestShortModel {
  id: string
  testName: string
  templateName: string
}

export interface TestTemplateModel {
  id: string
  templateName: string
  cashbackEnabled: boolean
  certificateEnabled: boolean
  taskLimitEnabled: boolean
  checkImmediatelyEnabled: boolean
}

export interface TestPassStatus {
  id: number
  testStateName: string
  testStateDescription: string
  testStateCode: string
  attemptId?: string
  testId?: string
}

export interface AnswerTaskRequest {
  questionId: string
  type: 'MCQ'
  data: {
    userAnswerId: string
  }
}

export interface AnswerTaskResponse {
  timestamp: string
  status: number
  error: string
  message: string
  errorCode: string
  path: string
}
