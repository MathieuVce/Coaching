import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector as useRawSelector } from 'react-redux';
import authReducer from "../slices/auth";

const reducer = {
  auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useRawSelector;

export default store;