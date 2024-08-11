import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const signup = (name, email, password, location, phone, type) =>
  api.post("/auth/signup", { name, email, password, location, phone, type });
export const fetchBooks = () => api.get("/books");
export const fetchBookById = (id) => api.get(`/books/${id}`);
export const createBook = (bookData) => api.post("/books", bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export default api;
