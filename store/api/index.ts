import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ozat.online' }),
  tagTypes: [],
  endpoints: () => ({}),
})

export const mobileApi = createApi({
  reducerPath: 'mobileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mobile.ozat.online' }),
  tagTypes: [],
  endpoints: () => ({}),
})
