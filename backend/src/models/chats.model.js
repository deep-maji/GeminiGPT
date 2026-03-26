import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "model"],
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

const chatSchema = new mongoose.Schema({
  chat_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
}, { timestamps: true })

const Chats = mongoose.model('Chat', chatSchema);

export default Chats;