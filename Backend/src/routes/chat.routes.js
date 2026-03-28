const { Router } = require('express');
const chatController = require('../controller/chat.controller');
const { verifyToken } = require('../middleware/auth.middleware.js');
const chatRouter = Router();
// Mounted at /api/chat in app.js
// POST /api/chat        -> handle sending a message / creating chat
// GET  /api/chat/user/:userId -> list chats for a user
// GET  /api/chat/:chatId      -> get messages for a chat
chatRouter.post('/', verifyToken, chatController.chat);
chatRouter.get('/user/:userId', verifyToken, chatController.getChat);
chatRouter.get('/:chatId', verifyToken, chatController.getMessages);
module.exports = chatRouter;