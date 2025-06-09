import { createSlice } from "@reduxjs/toolkit";
import {
  createAlbum,
  deleteAlbum,
  fetchAlbums,
  shareAlbum,
  updateData,
} from "./albumThunk";
import type { Album } from "@/types/album";

interface AlbumSlice {
  albums: Album[];
  error: string | null | undefined;
  loading: boolean;
  sortedAlbums: Album[];
  sortOrder: "asc" | "desc";
  albumFilter: "all" | "shared" | "myAlbums";
}

const initialState: AlbumSlice = {
  albums: [],
  error: null,
  loading: false,
  sortedAlbums: [],
  sortOrder: "desc",
  albumFilter: "all",
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setSortFilter: (state, action) => {
      state.sortedAlbums = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },

    setAlbumFilter: (state, action) => {
      state.albumFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums?.push(action?.payload);
        state.sortedAlbums.push(action?.payload);
        state.loading = false;
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.sortedAlbums = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (item) => item.albumId !== action.payload.albumId
        );
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        const findAlbum = state.albums.findIndex(
          (album) => album.albumId === action.payload.albumId
        );

        if (findAlbum !== -1) {
          state.albums[findAlbum] = action.payload;
        }
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(shareAlbum.fulfilled, (state, action) => {
        state.loading = false;
        const findAlbum = state.albums.findIndex(
          (album) => album.albumId === action.payload.albumId
        );

        if (findAlbum !== -1) {
          state.albums[findAlbum] = action.payload;
        }
      })
      .addCase(shareAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSortFilter, setAlbumFilter, setSortOrder } =
  albumSlice.actions;
export default albumSlice.reducer;

