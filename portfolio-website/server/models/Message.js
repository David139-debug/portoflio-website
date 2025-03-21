const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    content: {
        type: String,
    },

    sender: {
        type: String,
    },

    receiver: {
        type: String
    },

    time: {
        type: String
    }
}, { timestamps: true });

MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Message", MessageSchema);