import axios from "axios";

const API_URL = "https://book-rental-zzes.onrender.com/api";

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

export const fetchBooks = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  return api.get("/books/books");
};

export const fetchUsers = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  return api.get("/users/users");
};

export const fetchBookById = (id) => api.get(`/books/books/${id}`);

export const createBook = (bookData) => api.post("/books/books", bookData);

export const updateBook = (id, bookData) =>
  api.put(`/books/books/${id}`, bookData);

export const deleteBook = (id) => api.delete(`/books/books/${id}`);

export const getCategories = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  return api.get("/categories/categories");
};

export const updateBookApproval = async (id, isApproved) => {
  return api.patch(`/books/books/${id}`, { isapproved: isApproved });
};

export const updateUserApproval = async (id, isApproved) => {
  return api.patch(`/users/users/${id}`, { isapproved: isApproved });
};

export const deleteUser = (id) => api.delete(`/users/users/${id}`);

export default api;
