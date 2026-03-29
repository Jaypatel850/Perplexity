import Axios from "axios";

const API = Axios.create({
  baseURL: "http://localhost:3000/api/chat",
  withCredentials: true,
});

export const sendMessage = async (message, chatId = null) => {
  const res = await API.post("/", chatId ? { message, chatId } : { message });
  return res.data;
};

export const fetchChats = async (userId) => {
  const res = await API.get(`/user/${userId}`);
  return res.data;
};

export const fetchMessages = async (chatId) => {
  const res = await API.get(`/${chatId}`);
  return res.data;
};

export const deleteChat = async (chatId) => {
  const res = await API.delete(`/${chatId}`);
  return res.data;
};

export default API;
