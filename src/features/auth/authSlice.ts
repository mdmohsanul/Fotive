import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import {
  loginWithGoogle,
  checkAuth,
  logoutUser,
  emailLogin,
  registerUser,
} from "./authThunks";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        Object.assign(state, {
          loading: false,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          isAuthenticated: true,
        });
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        Object.assign(state, {
          loading: false,
          user: action.payload.data,

          isAuthenticated: true,
        });
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(emailLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailLogin.fulfilled, (state, action) => {
        console.log(action);
        Object.assign(state, {
          loading: false,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          isAuthenticated: true,
        });
      })
      .addCase(emailLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer