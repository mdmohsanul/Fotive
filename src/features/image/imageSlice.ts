import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllImages,
  fetchComments,
  fetchfavoritesByUser,
  fetchImages,
  updateComment,
  updateFavoriteImage,
  uploadImage,
} from "./imageThunks";
import type { CommentList } from "@/types/comment";

export interface Image {
  _id: string;
  albumId: string;
  userId: string;
  name: string;
  tags: string[];
  isFavorite: true;
  comments: CommentList[];
  imageUrl: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
  size: number;
}
interface ImageSlice {
  images: Image[];
  allImages: Image[];
  error: string | null | undefined;
  loading: boolean;
  favImages: Image[];
  comments: CommentList;
}

const initialState: ImageSlice = {
  images: [],
  allImages: [],
  error: null,
  loading: false,
  favImages: [],
  comments: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.images?.push(action?.payload);
        state.allImages?.push(action?.payload);
      })
      .addCase(fetchAllImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllImages.fulfilled, (state, action) => {
        state.allImages = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchfavoritesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchfavoritesByUser.fulfilled, (state, action) => {
        state.favImages = action.payload;
        state.loading = false;
      })
      .addCase(fetchfavoritesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFavoriteImage.fulfilled, (state, action) => {
        const findImage = state.allImages.findIndex(
          (image) => image.imageId === action.payload.imageId
        );
        if (findImage !== -1) {
          state.allImages[findImage] = action.payload;
          state.favImages[findImage] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateFavoriteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const findImage = state.allImages.findIndex(
          (image) => image.imageId === action.payload.imageId
        );
        if (findImage !== -1) {
          state.allImages[findImage].comments.push(action.payload);
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
