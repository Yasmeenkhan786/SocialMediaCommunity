import axios from "axios";

const API = axios.create({ baseURL: "https://social-community-server.vercel.app" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});
export const uploadPost = (data) => API.post("/posts", data);
export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) => API.put(`posts/${id}/like`, { userId: userId });
export const deletePost = (id, userId) => API.patch(`posts/${id}/delete`, { userId: userId });
export const getPost = () => API.get("/posts");

