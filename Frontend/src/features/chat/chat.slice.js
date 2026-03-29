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
export const { setChats, setCurrentChatId, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;