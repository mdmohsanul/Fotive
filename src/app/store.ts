import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import type { TypedUseSelectorHook } from 'react-redux';
import  {  useSelector } from 'react-redux';

export const store = configureStore({
 reducer:{
    auth:authReducer
 }
})

export type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;