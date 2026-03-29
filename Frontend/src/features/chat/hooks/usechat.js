import { socket } from "../service/socket.chat";
import { sendMessage, fetchChats, fetchMessages } from "../service/api.chat";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
} from "../chat.slice";
import { useDispatch } from "react-redux";
export const useChat = () => {
  const dispatch = useDispatch();
  const HandleSendMessage = async (message, chatId) => {
    dispatch(setLoading(true));
    try {
      const data = await sendMessage(message, chatId);
      const { chat, aimessage } = data;

      dispatch(
        setChats((prev) => {
          return {
            ...prev,
            [chatId]: {
              ...chat,
              messages: [{ content: message, role: "user" }, aimessage],
            },
          };
        })
      );
      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    socket,
    HandleSendMessage,
  };
};
