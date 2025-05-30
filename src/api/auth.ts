import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true, // Send and recieve cookies
});

export const googleAuth = (code: string) =>
  api.get(`/users/google?code=${code}`);

export const checkUserAuth = () => api.get("/users/current-user");

export const logout = () => api.post("/users/logout");
