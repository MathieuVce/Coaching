import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector as useRawSelector } from 'react-redux';
import authReducer from "../slices/auth";
import infoReducer from "../slices/info";
import fileReducer from "../slices/file";
import thunkMiddleware from 'redux-thunk'

const reducer = {
  auth: authReducer,
  info: infoReducer,
  file: fileReducer
}
const composedEnhancer = applyMiddleware(thunkMiddleware)

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  enhancers: [composedEnhancer]
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useRawSelector;

export default store;