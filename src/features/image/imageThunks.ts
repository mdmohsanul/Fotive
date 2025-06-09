import { api } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { Image } from "./imageSlice";
import type { CommentList } from "@/types/comment";

export const fetchImages = createAsyncThunk<Image[], string | undefined>(
  "image/fetchImages",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/albums/${albumId}/images`);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Failed to fetch albums");
    }
  }
);

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

export const deleteImage = createAsyncThunk<
  Image,
  { imageId: string | undefined; userId: string | undefined }
>("image/delete", async ({ imageId, userId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/albums/${userId}/images/${imageId}`);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data || "Failed to fetch albums");
  }
});

export const fetchfavoritesByUser = createAsyncThunk<
  Image[],
  string | undefined
>("image/fetchFavoritesByUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/albums/user/${userId}/favorites`);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data || "Failed to fetch albums");
  }
});
type favorite = {
  isFavorite: boolean;
};
export const updateFavoriteImage = createAsyncThunk<
  Image,
  { imageId: string | undefined; favorite: favorite }
>("image/updateFav", async ({ imageId, favorite }, { rejectWithValue }) => {
  try {
    const response = await api.patch(
      `/albums/images/${imageId}/favorite`,
      favorite
    );
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data || "Failed to fetch albums");
  }
});

export const fetchComments = createAsyncThunk<CommentList, string | undefined>(
  "image/fetchComments",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/albums/images/${imageId}/comments`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Failed to fetch albums");
    }
  }
);
type UpdateCommentArgs = {
  imageId: string | undefined;
  comment: { comment: string };
};

export const updateComment = createAsyncThunk<any, UpdateCommentArgs>(
  "image/updateComment",
  async ({ imageId, comment }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/albums/images/${imageId}/comment`,
        comment
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Failed to fetch albums");
    }
  }
);