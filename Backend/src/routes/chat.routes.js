const { Router } = require('express');
const chatController = require('../controller/chat.controller');
const { verifyToken } = require('../middleware/auth.middleware.js');
const chatRouter = Router();

// POST   /api/chat/            -> send message / create chat
// GET    /api/chat/user/:userId -> list chats for a user
// GET    /api/chat/:chatId      -> get messages for a chat
// DELETE /api/chat/:chatId      -> delete chat + its messages
chatRouter.post('/', verifyToken, chatController.chat);
chatRouter.get('/user/:userId', verifyToken, chatController.getChat);
chatRouter.get('/:chatId', verifyToken, chatController.getMessages);
chatRouter.delete('/:chatId', verifyToken, chatController.deleteChat);
module.exports = chatRouter;