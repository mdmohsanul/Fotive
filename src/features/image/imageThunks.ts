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

export const fetchAllImages = createAsyncThunk<Image[], string | undefined>(
  "image/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/albums/user/${userId}/images`);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Failed to fetch albums");
    }
  }
);

export const uploadImage = createAsyncThunk<
  Image,
  { formData: FormData; albumId: string | undefined }
>("image/upload", async ({ formData, albumId }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/albums/${albumId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/upload",
      },
    });
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data || "Failed to fetch albums");
  }
});

export const deleteImage = createAsyncThunk(
  "image/delete",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/albums/${imageId}/images`);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Failed to fetch albums");
    }
  }
);