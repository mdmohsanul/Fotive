import { createSlice } from "@reduxjs/toolkit";
import { fetchImages } from "./imageThunks";

interface Comment{
        user: string;
        text: string;
        _id: string;
        createdAt: string;
    }

export interface Image {
    _id: string;
            albumId: string;
            name: string;
            tags: string[];
            isFavorite: true,
            comments: Comment[],
            imageUrl: string;
            imageId:string;
            createdAt:string;
            updatedAt: string;
}
interface ImageSlice {
    images:Image []
    error: string | null | undefined;
  loading: boolean;
}

const initialState : ImageSlice = {
   images:[],
   error:null,
   loading:false
}

const imageSlice = createSlice({
    name:"image",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchImages.pending, (state) => {
            state.loading = true
            state.error = null
        }
        )
        .addCase(fetchImages.fulfilled, (state,action) => {
            state.images = action.payload
            state.loading= false
        })
         .addCase(fetchImages.rejected , (state,action) => {
                    state.loading = false;
                state.error = action.error.message;
                })
    }
})

export default imageSlice.reducer