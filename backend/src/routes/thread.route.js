import express from "express";
import { createNewThread, getAllThreadHistroy, getThreadById, deleteThreadById } from "../controller/threads.controller.js";
import wrapAsyn from "../utils/wrapAsyn.js";
import { verifyToken } from "../utils/jwt.util.js";
const router = express.Router({ mergeParams: true });

router.route("/chat")
  .post(verifyToken, wrapAsyn(createNewThread))

router.route("/chat")
  .get(verifyToken, wrapAsyn(getAllThreadHistroy));

router.route("/chat/:id")
  .get(verifyToken, wrapAsyn(getThreadById));

router.route("/chat/:id")
  .delete(verifyToken, wrapAsyn(deleteThreadById));

export default router;