import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'
import { FetchArgs } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { logout, setToken } from '@/store/slices/auth'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.ozat.online',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          '/user-service/auth/refreshToken',
          api,
          extraOptions,
        )
        if (refreshResult.data) {
          api.dispatch(setToken(refreshResult.data))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
})

export const mobileApi = createApi({
  reducerPath: 'mobileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mobile.ozat.online' }),
  tagTypes: [],
  endpoints: () => ({}),
})
