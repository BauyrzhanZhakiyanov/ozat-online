import { api } from '.'
import { CourseResponse, FullCourse } from '@/types/api/course'

const prefix = 'payment-service'

const paymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyCourse: build.query<FullCourse, string>({
      query: (id) => ({
        url: `${prefix}/payment/private/my-courses/${id}`,
      }),
    }),
    getMyCourses: build.query<CourseResponse[], void>({
      query: () => ({
        url: `${prefix}/payment/private/my-courses/`,
      }),
    }),
  }),
})

export const { useGetMyCourseQuery, useGetMyCoursesQuery } = paymentApi
