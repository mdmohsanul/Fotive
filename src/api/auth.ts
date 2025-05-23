import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
  withCredentials: true, // Send and recieve cookies
});

export const googleAuth = (code:string) => api.get(`/google?code=${code}`)




export const checkUserAuth = () => api.get("/current-user");

export const logout = () => api.post("/logout");
