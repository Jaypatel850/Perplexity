const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    AIcontent:{
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Message', messageSchema);