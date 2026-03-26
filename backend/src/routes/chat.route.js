import express from "express";
import { chat, getAllChatHistroy, getChatById } from "../controller/chats.controller.js";
import wrapAsyn from "../utils/wrapAsyn.js";
import { verifyToken } from "../utils/jwt.util.js";
const router = express.Router({ mergeParams: true });

router.route("/chat")
  .post(verifyToken, wrapAsyn(chat))

router.route("/chat")
  .get(verifyToken, wrapAsyn(getAllChatHistroy));

router.route("/chat/:id")
  .get(verifyToken, wrapAsyn(getChatById));

export default router;