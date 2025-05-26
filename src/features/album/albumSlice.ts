import { createSlice } from "@reduxjs/toolkit";
import { createAlbum, fetchAlbums, type Album } from "./albumThunk";

interface AlbumSlice {
    albums:Album[]
    error: string | null | undefined;
  loading: boolean;
}

const initialState : AlbumSlice = {
   albums:[],
   error:null,
   loading:false
}

const albumSlice = createSlice({
    name:"album",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createAlbum.fulfilled,(state,action) => {
            state.albums?.push(action?.payload)
            state.loading= false
        })
        .addCase(fetchAlbums.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAlbums.fulfilled , (state,action) => {
            state.albums = action.payload
            state.loading = false
        })
        .addCase(fetchAlbums.rejected , (state,action) => {
            state.loading = false;
        state.error = action.error.message;
        })
    }

})

export default albumSlice.reducer