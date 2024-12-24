import { api, mobileApi } from '.'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendCodeResponse,
  VerifyCodeResponse,
} from '@/types/api/auth'

const prefix = 'user-service'

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `${prefix}/auth/login/`,
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `${prefix}/user/public/register/`,
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${prefix}/auth/logout`,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
})

const authApi2 = mobileApi.injectEndpoints({
  endpoints: (build) => ({
    sendCode: build.mutation<SendCodeResponse, { mobile: string }>({
      query: (body) => ({
        url: 'auth/send-code',
        method: 'POST',
        body,
      }),
    }),
    verifyCode: build.mutation<
      VerifyCodeResponse,
      { mobile: string; code: string }
    >({
      query: (body) => ({
        url: 'auth/verify-code',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const verifyConfirmationCode = async (
  mobile: string,
  code: string,
): Promise<VerifyCodeResponse> => {
  const random = Math.random()
  if (random > 0.5) {
    return { statusCode: 200, message: 'Code verified successfully' }
  } else {
    return { statusCode: 401, message: 'No matches' }
  }
}

export const { useSendCodeMutation, useVerifyCodeMutation } = authApi2

export const { useLoginMutation, useRegisterMutation } = authApi
