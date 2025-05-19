import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000/api/v1/users",
    withCredentials: true, // Send and recieve cookies
  });

export const googleAuth = (code:string) => api.get(`/google?code=${code}`)


export const emailLogin = (data: { email: string; password: string }) =>
  api.post("/login", data);


export const logout = () => api.post("/logout");
