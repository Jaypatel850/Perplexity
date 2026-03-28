const { generateResponse, generateTitle } = require("../services/ai.service");
const chatmodel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function chat(req, res) {
  const { message, chat: chatFromBody, chatId } = req.body;
  try {
    const activeChatId = chatId || chatFromBody; // support both field names
    let chat;
    if (activeChatId) {
      // Find existing chat that belongs to the user
      chat = await chatmodel.findOne({ _id: activeChatId, user: req.user.id });
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
    }
    else {
      // Create a new chat session
      const title = await generateTitle(message);
      chat = new chatmodel({
        user: req.user.id,
        title: title,
      });
      await chat.save();
    }
    const messagesHistory = await messageModel.find({ chat: chat._id });
    const aiResponse = await generateResponse(message);

    // Store one document per turn: user message in `content`, AI reply in `AIcontent`
    try {
      const chatMessage = new messageModel({
        chat: chat._id,
        content: message,
        AIcontent: aiResponse,
      });
      await chatMessage.save();
    } catch (saveErr) {
      console.error("Failed to save chat message:", saveErr);
    }

    res.json({ response: aiResponse, title: chat.title, chatId: chat._id });
  } catch (error) {
    console.error("Error generating chat response:", error);
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

module.exports = { chat, getMessages,getChat };
