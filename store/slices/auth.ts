import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  id: number
  name: string
  surname: string
  phone: string
  parentPhone: string
  extraPhone: string
  email: string
  parentEmail: string
  level: string
  balance: number
  bonuses: number
  roles: string
  patronymic: string
  avatar: string
}
interface AuthState {
  user: IUser | null
  token: string
  refreshToken: string
}

const INITIAL_STATE_AUTH: AuthState = {
  user: null,
  token: '',
  refreshToken: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE_AUTH,
  reducers: {
    setUserAction(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    updateUserAction(state, action: PayloadAction<Partial<IUser>>) {
      // @ts-ignore
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    setToken(
      state,
      action: PayloadAction<{ token?: string; refreshToken?: string }>,
    ) {
      if (action.payload.token) {
        state.token = action.payload.token
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }
    },
    logout(state) {
      state.user = INITIAL_STATE_AUTH.user
      state.token = INITIAL_STATE_AUTH.token
      state.refreshToken = INITIAL_STATE_AUTH.refreshToken
    },
  },
})

export const { setUserAction, updateUserAction, setToken, logout } =
  authSlice.actions

export { INITIAL_STATE_AUTH, authSlice }

export default authSlice.reducer
