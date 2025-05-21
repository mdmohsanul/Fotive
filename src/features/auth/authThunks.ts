import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserAuth, googleAuth } from "../../api/auth";

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle" , async(code:string) => {
    try{
        if(code){
            const response = await googleAuth(code);
            return response.data.data;
        }
        
    }catch(error){
        console.error("Error while requesting google code ", error)
    }

})

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
      try {
        const res = await checkUserAuth()
        return res.data;
      } catch (error:any) {
        return rejectWithValue(error?.response?.data || "Unauthorized");
      }
    }
  );
  