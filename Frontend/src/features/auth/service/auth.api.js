import axios from "axios";
const API_URL = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = async (username, email, password) => {
  try {
    const response = await API_URL.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await API_URL.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const logout = async () => {
  try {
    await API_URL.post("/logout");
  } catch (error) {
    throw error;
  }
};
export const getMe = async () => {
  try {
    const response = await API_URL.get("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
