import ExpressError from "../utils/ExpressError.js";
import { googleGenAiMain, genarateTitleOfTheChat, streamingChat } from "../services/genai.js";
import Chats from "../models/chats.model.js";
import httpStatus, { status } from "http-status"
import extractTitle from "../utils/getTitle.js";

export const chat = async (req, res, next) => {

  const { prompt, chat_id, history } = req.body;
  const { id, email } = req.userData;
  if (!prompt || !chat_id) {
    throw new ExpressError(404, "Prompt is required!");
  }

  const response = await googleGenAiMain({ prompt, history });
  const contents = response.text;

  const usermessage = {
    role: "user",
    content: prompt,
  }

  const modelmessage = {
    role: "model",
    content: contents,
  }

  const chat = await Chats.findOne({ chat_id });
  let title;
  let save;
  if (!chat) { // first chat
    title = await genarateTitleOfTheChat({ contents });
    title = extractTitle(title.text);
    const chatPayload = {
      chat_id,
      user_id: id,
      title: title,
      messages: [usermessage, modelmessage]
    }

    const newChat = new Chats(chatPayload);
    save = await newChat.save();
  }
  else { // else chat already exsist
    title = chat.title;
    chat.messages.push(usermessage);
    chat.messages.push(modelmessage);
    save = await chat.save();
  }

  modelmessage.title = title;
  modelmessage._id = save._id;
  res.status(httpStatus.OK).json({ response: modelmessage });
}

export const getAllChatHistroy = async (req, res, next) => {
  const { id, email } = req.userData;
  const chatHistroy = await Chats.find({ user_id: id }, 'title').sort({ updatedAt: -1 });
  res.status(httpStatus.OK).json({ chatHistroy });
}

export const getChatById = async (req, res, next) => {
  const { id, email } = req.userData;
  const { id: chatId } = req.params;
  const chat = await Chats.findOne({ user_id: id, _id: chatId });
  res.status(httpStatus.OK).json({ response: chat });
}

export const deleteChat = async (req, res, next) => {
  const { id, email } = req.userData;
  const { id: chatId } = req.params;
  await Chats.findByIdAndDelete({ user_id: id, _id: chatId });
  res.status(httpStatus.OK).json({ message: "Chat removed successfully.", status: httpStatus.OK });
}