import Axios from "axios";

const API_URL = Axios.create({
  baseURL: "http://localhost:3000/api/chat",
  withCredentials: true
});

export async function sendMessage(message, chatId = null) {
  const payload = chatId ? { message, chatId } : { message };
  const res = await API_URL.post("/", payload);
  return res.data;
}

export async function fetchChats(userId) {
  const res = await API_URL.get(`/user/${userId}`);
  return res.data;
}

export async function fetchMessages(chatId) {
  const res = await API_URL.get(`/${chatId}`);
  return res.data;
}

export default API_URL;
