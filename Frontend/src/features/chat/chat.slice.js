import {createSlice, current} from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats:{},
    currentChatId: null,
    isloading: false,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const {chatID , title} = action.payload;
      state.chats[chatID] = {
        id: chatID,
        title,
        messages: [],
        lastupdated: new Date().toISOString(),
      };
    },
    AddNEWMessage: (state, action) => {
      const { chatID, message ,role} = action.payload;
      if (!state.chats[chatID]) {
        state.chats[chatID] = {
          id: chatID,
          title: "",
          messages: [],
          lastupdated: new Date().toISOString(),
        };
      }
      state.chats[chatID].messages.push({
        message,
        role,
        timestamp: new Date().toISOString(),
      });
      state.chats[chatID].lastupdated = new Date().toISOString();
    },
    AddmessagesBatch: (state, action) => {
      const { chatID, messages } = action.payload;
      if (!state.chats[chatID]) return; // guard: chat may not be in store yet
      state.chats[chatID].messages = messages.map((msg) => ({
        message: msg.content,
        role: msg.role,
        timestamp: msg.createdAt || msg.timestamp,
      }));
      state.chats[chatID].lastupdated = new Date().toISOString();
    },
    removeChat: (state, action) => {
      delete state.chats[action.payload];
      if (state.currentChatId === action.payload) state.currentChatId = null;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isloading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
    },
});
export const { setChats, setCurrentChatId, setLoading, setError, createNewChat, AddNEWMessage, AddmessagesBatch, removeChat } = chatSlice.actions;
export default chatSlice.reducer;