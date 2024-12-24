import { TestPassStatus } from '@/types/api/test'

export const startTestState: TestPassStatus = {
  id: 1,
  testStateName: 'START',
  testStateDescription: 'State to start the test from scratch',
  testStateCode: 'START',
  attemptId: '',
  testId: '',
}

export const inProgressTestState: TestPassStatus = {
  id: 2,
  testStateName: 'IN_PROGRESS',
  testStateDescription: 'State to show the test in progress',
  testStateCode: 'IN_PROGRESS',
  attemptId: '',
  testId: '',
}

export const completedTestState: TestPassStatus = {
  id: 3,
  testStateName: 'COMPLETED',
  testStateDescription: 'State to show the test is completed',
  testStateCode: 'COMPLETED',
  attemptId: '',
  testId: '',
}
