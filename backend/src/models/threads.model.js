import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
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

const ThreadSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
  },
  messages: [MessageSchema],
}, { timestamps: true })

const Threads = mongoose.model('Thread', ThreadSchema);

export default Threads;