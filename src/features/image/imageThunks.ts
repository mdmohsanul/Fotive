import { api } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { Image } from "./imageSlice";

export const fetchImages = createAsyncThunk<Image[] , string | undefined>("image/fetchImages", async(albumId,{rejectWithValue}) => {
      try{
            const response = await api.get(`/albums/${albumId}/images`)
            return response.data.data
        }catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(
              err.response?.data || "Failed to fetch albums"
            );
          }
})