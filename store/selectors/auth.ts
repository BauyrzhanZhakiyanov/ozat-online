import { RootState } from '@/store'

export const selectUserNull = (state: RootState) => state.auth.user

export const selectUser = (state: RootState) => state.auth.user!
