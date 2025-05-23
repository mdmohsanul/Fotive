import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, checkUserAuth, googleAuth } from "../../api/auth";

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (code: string) => {
    try {
      if (code) {
        const response = await googleAuth(code);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error while requesting google code ", error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await checkUserAuth();
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Unauthorized");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("logout");
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Unauthorized");
    }
  }
);

export const emailLogin = createAsyncThunk(
  "auth/loginWithEmail",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error || "Unauthorized");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: { email: string; password: string; userName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/signup", data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error || "Unauthorized");
    }
  }
); 
