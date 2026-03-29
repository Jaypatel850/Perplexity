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
    },
    role:{
        type: String,
        enum: ['user', 'assistant'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);