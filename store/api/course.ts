import { api } from '.'
import { LessonModelFull } from '@/types/api/lesson'

const prefix = 'course-service'

const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFullLesson: build.query<LessonModelFull, string>({
      query: (id) => ({
        url: `${prefix}/course/public/lesson/id/${id}`,
      }),
    }),
  }),
})

export const { useGetFullLessonQuery } = courseApi
