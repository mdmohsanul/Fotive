import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/auth";

import type { AxiosError } from "axios";
import type { IFormInput } from "@/components/Album/AlbumForm";


export interface Album {
  name: string;
  description: string;
  albumId: string;
  createdAt: string;
  _id: string;
}
type AlbumId = {
  albumId: string;
};
export const createAlbum = createAsyncThunk<Album, IFormInput>(
  "album/createAlbum",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.post("/albums/createAlbum", data);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue("Unexpected error");
    }
  }
);

export const fetchAlbums = createAsyncThunk(
  "album/fetchAlbum",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/albums");
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue("Unexpected error");
    }
  }
);

export const deleteAlbum = createAsyncThunk<AlbumId>(
  "album/deleteAlbum",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/albums/${albumId}`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue("Unexpected error");
    }
  }
);