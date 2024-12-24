import { api } from '@/store/api/index'
import {
  AnswerTaskRequest,
  AnswerTaskResponse,
  TaskFullModel,
  TestAttemptsModel,
  TestFullModel,
} from '@/types/api/test'

const prefix = 'assessment-service/test-attempt/tests'

const assessmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTestTask: build.query<TaskFullModel, { testId: string; taskId: string }>(
      {
        query: ({ testId, taskId }) => ({
          url: `${prefix}${testId}/tasks/${taskId}/`,
        }),
      },
    ),
    getTestAttempts: build.query<TestAttemptsModel[], string>({
      query: (id) => ({
        url: `${prefix}/${id}/attempts/`,
      }),
    }),
    getTestAttempt: build.query<
      TestAttemptsModel,
      { testId: number; attemptId: number }
    >({
      query: ({ testId, attemptId }) => ({
        url: `${prefix}/${testId}/attempts/${attemptId}/`,
      }),
    }),
    answerTask: build.mutation<
      AnswerTaskResponse,
      { testId: string; taskId: string; body: AnswerTaskRequest }
    >({
      query: ({ testId, taskId, body }) => ({
        url: `${prefix}/${testId}/tasks/${taskId}/answer/`,
        body,
      }),
    }),
    getFullTest: build.query<TestFullModel, number>({
      query: (id) => ({
        url: `${prefix}/${id}/`,
      }),
    }),
    startTest: build.mutation<TestFullModel, number>({
      query: (id) => ({
        url: `${prefix}/${id}/start/`,
        method: 'POST',
      }),
    }),
    finishTest: build.mutation<TestAttemptsModel, string>({
      query: (id) => ({
        url: `${prefix}/${id}/finish/`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetTestTaskQuery,
  useFinishTestMutation,
  useStartTestMutation,
  useLazyGetFullTestQuery,
  useLazyGetTestAttemptQuery,
  useGetTestAttemptQuery,
  useGetTestAttemptsQuery,
  useAnswerTaskMutation,
  useLazyGetTestTaskQuery,
} = assessmentApi
