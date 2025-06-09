import axios from "axios"

// export const api = axios.create({
//   baseURL: "http://localhost:4000/api/v1",
//   // baseURL: "https://fotive.onrender.com/api/v1",

//   withCredentials: true, // Send and recieve cookies
// });
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "https://fotive.onrender.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const googleAuth = (code: string) =>
  api.get(`/users/google?code=${code}`);

export const checkUserAuth = () => api.get("/users/current-user");

export const logout = () => api.post("/users/logout");
