import { IUser } from '@/store/slices/auth'

export interface LoginRequest {
  mobile: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  status: number
  userId: number
  firstName: string
  lastName: string
  message: string
  errorCode?: string
  statusCode?: number
}

export interface RegisterRequest {
  mobile: string
  password: string
  roles: string
  firstName: string
  lastName: string
}
export interface RegisterResponse {
  // userId(
  //   name: string,
  //   surname: string,
  //   whatsappNumber: string,
  //   userId: any,
  // ): unknown
  statusCode: number
  message: string
  token: string
  refreshToken: string
  expirationTime: string
  balance: number
  roles: string
}

export interface SendCodeResponse {
  statusCode: number
  message: string
}

export interface VerifyCodeResponse {
  statusCode: number
  message: string
}

export type UpdateUserRequest = Partial<
  Pick<
    IUser,
    | 'name'
    | 'surname'
    | 'patronymic'
    | 'email'
    | 'parentEmail'
    | 'phone'
    | 'parentPhone'
    | 'extraPhone'
    | 'level'
  >
>
