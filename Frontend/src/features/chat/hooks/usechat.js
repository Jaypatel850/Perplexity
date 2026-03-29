import { socket } from "../service/socket.chat";
import { sendMessage, fetchChats, fetchMessages, deleteChat } from "../service/api.chat";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  AddNEWMessage,
  AddmessagesBatch,
  removeChat,
} from "../chat.slice";
import { useDispatch, useSelector } from "react-redux";

// ─── Send a message, create chat if needed ───────────────────────────────────
export const useChat = () => {
  const dispatch = useDispatch();

  const HandleSendMessage = async (message, chatId) => {
    dispatch(setLoading(true));
    try {
      const data = await sendMessage(message, chatId);
      const { chatId: responseChatId, title, response } = data;
      dispatch(createNewChat({ chatID: responseChatId, title }));
      dispatch(AddNEWMessage({ chatID: responseChatId, message, role: "user" }));
      dispatch(AddNEWMessage({ chatID: responseChatId, message: response, role: "assistant" }));
      dispatch(setCurrentChatId(responseChatId));
      return responseChatId;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { socket, HandleSendMessage };
};

// ─── Load sidebar chat list only (no N+1 message prefetch) ──────────────────
export const useFetchChats = () => {
  const dispatch = useDispatch();

  return async (userId) => {
    dispatch(setLoading(true));
    try {
      const chats = await fetchChats(userId);
      // Normalize to map keyed by id — messages loaded lazily per chat
      const normalized = chats.reduce((acc, chat) => {
        acc[chat._id] = {
          id: chat._id,
          title: chat.title,
          messages: [],
          lastupdated: chat.updatedAt || chat.createdAt,
        };
        return acc;
      }, {});
      dispatch(setChats(normalized));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ─── Load messages for a specific chat (lazy, deduplicates) ─────────────────
export const useFetchMessages = () => {
  const dispatch = useDispatch();
  const chatsMap = useSelector((s) => s.chat.chats);

  return async (chatId) => {
    // Skip if messages already loaded for this chat
    if (chatsMap[chatId]?.messages?.length > 0) return;

    dispatch(setLoading(true));
    try {
      const messages = await fetchMessages(chatId);
      dispatch(AddmessagesBatch({ chatID: chatId, messages }));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ─── Delete a chat + all its messages ────────────────────────────────────────
export const useDeleteChat = () => {
  const dispatch = useDispatch();

  return async (chatId) => {
    try {
      await deleteChat(chatId);
      dispatch(removeChat(chatId));
      return true;
    } catch (error) {
      dispatch(setError(error.message));
      return false;
    }
  };
};