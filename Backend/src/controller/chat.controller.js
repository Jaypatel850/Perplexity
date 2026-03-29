const { generateResponse, generateTitle } = require("../services/ai.service");
const chatmodel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function chat(req, res) {
  const { message, chat: chatFromBody, chatId } = req.body;
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const activeChatId = chatId || chatFromBody;
    let chat;
    if (activeChatId) {
      chat = await chatmodel.findOne({ _id: activeChatId, user: userId });
      if (!chat) return res.status(404).json({ error: "Chat not found" });
    } else {
      let title;
      try {
        title = await generateTitle(message);
      } catch {
        title = message.slice(0, 40) || "New chat";
      }
      chat = new chatmodel({ user: userId, title: String(title) });
      await chat.save();
    }
    let aiResponse;
    try {
      aiResponse = await generateResponse(message);
    } catch (responseError) {
      console.error("Error generating chat response:", responseError);
      aiResponse = "I’m having trouble generating a reply right now. Please try again in a moment.";
    }
    aiResponse = String(aiResponse);

    // Save user message and AI response as separate documents
    try {
      // Save user message
      const userMessage = new messageModel({
        chat: chat._id,
        content: message,
        role: 'user'
      });
      await userMessage.save();

      // Save AI response
      const assistantMessage = new messageModel({
        chat: chat._id,
        content: aiResponse,
        role: 'assistant'
      });
      await assistantMessage.save();
    } catch (saveErr) {
      console.error("Failed to save chat message:", saveErr);
    }

    res.json({ response: aiResponse, title: chat.title, chatId: chat._id, fallback: true });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
async function getChat(req, res) {
  const { userId } = req.params;
  try {
    const chats = await chatmodel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
}
async function getMessages(req, res) {
  const { chatId } = req.params;
  try {
    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
}

async function deleteChat(req, res) {
  const { chatId } = req.params;
  const userId = req.user?.id;
  try {
    const chat = await chatmodel.findOne({ _id: chatId, user: userId });
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    // Delete all messages first, then the chat
    await messageModel.deleteMany({ chat: chatId });
    await chatmodel.findByIdAndDelete(chatId);
    res.json({ success: true, chatId });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
}

module.exports = { chat, getMessages, getChat, deleteChat };
