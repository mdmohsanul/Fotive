import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import albumReducer from "../features/album/albumSlice";
import imageReducer from "../features/image/imageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    album: albumReducer,
    image: imageReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;