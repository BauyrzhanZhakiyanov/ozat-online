import { LoginResponse } from '@/types/api/auth'
import { Lesson } from '@/types/api/lesson'
import { FileModel } from '@/types/api/file'
import { TestPassStatus } from '@/types/api/test'

export type RootStackParamList = {
  Welcome: undefined
  Auth: undefined
  SignIn: undefined
  SignUp: { mobile: string }
  Profile: { profileData: LoginResponse }
  CodeVerification: undefined
  RegistrationScreen: undefined
  MobileNumber: undefined
  ConfirmCode: { mobile: string }
  MainScreen: undefined
  MyCoursesScreen: undefined
  Tabs: undefined
  CourseDetails: { courseId: string }
  LessonScreen: { lesson: Lesson }
  FileViewerScreen: { file: FileModel; lessonId: string }
  TestViewScreen: { testPassStatus: TestPassStatus }
  ResultTestViewScreen: { testPassStatus: TestPassStatus }
  ShowResultsScreen: {
    testId: string
    attemptId?: string | null
    correctAnswersCount: number
    totalTasks: number
  }
  PDFViewer: { url: string }
  ImageViewer: { url: string }
}

export type AppStackParamList = {
  Tabs: undefined
  AuthStack: undefined
}

export type AuthStackParamList = {
  Auth: undefined
  CodeVerification: undefined
  RegistrationScreen: undefined
  SignIn: undefined
  SignUp: { mobile: string }
  Profile: { profileData: LoginResponse }
}

export type HomeStackParamList = {
  MainScreen: undefined
  MyCoursesScreen: undefined
  CourseDetails: { courseId: string }
  LessonScreen: { lesson: Lesson }
  FileViewerScreen: { file: FileModel; lessonId: string }
  TestViewScreen: { testPassStatus: TestPassStatus }
  ResultTestViewScreen: { testPassStatus: TestPassStatus }
  ShowResultsScreen: {
    testId: string
    attemptId?: string | null
    correctAnswersCount: number
    totalTasks: number
  }
}

export type ProfileStackParamList = {
  ProfileScreen: undefined
}

export type TaskStackParamList = {
  TaskScreen: undefined
}
