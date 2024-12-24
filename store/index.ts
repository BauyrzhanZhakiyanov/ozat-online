import migrations, { persistVersion } from '@/store/migrations'
import { createMigrate, persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from './slices/auth'
import { api, mobileApi } from '@/store/api'

const blacklist: string[] = []
const persistConfig = {
  key: 'root',
  version: persistVersion,
  storage: AsyncStorage,
  blacklist,
  migrate: createMigrate(migrations, { debug: false }),
}

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  [mobileApi.reducerPath]: mobileApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, mobileApi.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
