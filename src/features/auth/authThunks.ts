import { createAsyncThunk } from "@reduxjs/toolkit";
import { googleAuth } from "../../api/auth";

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