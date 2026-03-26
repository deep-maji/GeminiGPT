import express from "express";
import wrapAsyn from "../utils/wrapAsyn.js";
import { login, register } from "../controller/users.controller.js";
const router = express.Router();

router.route("/login")
  .post(wrapAsyn(login));
router.route("/register")
  .post(wrapAsyn(register))

export default router;