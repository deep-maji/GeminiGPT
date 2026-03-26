import express from "express";
import { streamChat } from "../controller/streamingChat.controller.js";
import wrapAsyn from "../utils/wrapAsyn.js";
import { verifyToken } from "../utils/jwt.util.js";
const router = express.Router();

router.route("/chat")
  .post(verifyToken, wrapAsyn(streamChat))

export default router;