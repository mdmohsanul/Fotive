import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/auth";

import type { AxiosError } from "axios";
import type { IFormInput } from "@/components/Album/AlbumForm";


export interface Album {
   name:string;
   description:string;
   albumId:string;
   createdAt:string
  }
export const createAlbum = createAsyncThunk<Album,IFormInput>("album/createAlbum" , async(data,{rejectWithValue}) =>{
    try{
        console.log(data)
        const response = await api.post("/albums/createAlbum",data)
       
        return response.data
    }catch (error) {
        return rejectWithValue(error || "Failed to create album");
      }
})

export const fetchAlbums = createAsyncThunk("album/fetchAlbum" , async(_,{rejectWithValue}) => {
    try{
        const response = await api.get("/albums")
        return response.data.data
    }catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.response?.data || "Failed to fetch albums"
        );
      }
})