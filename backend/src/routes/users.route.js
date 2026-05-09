import express from "express";
import wrapAsyn from "../utils/wrapAsyn.js";
import {
  login,
  register,
  logout,
  logoutAll,
  verifyEmail,
  resendOTPforVerifyEmail,
  refreshTokenToAccessToken,
} from "../controller/users.controller.js";
const router = express.Router();

router.route("/login")
  .post(wrapAsyn(login));

router.route("/register")
  .post(wrapAsyn(register));

router.route("/refresh-token")
  .post(wrapAsyn(refreshTokenToAccessToken))

router.route("/logout")
  .post(wrapAsyn(logout))

router.route("/logout-all")
  .post(wrapAsyn(logoutAll))

router.route("/verify-email")
  .post(wrapAsyn(verifyEmail))

router.route("/resend-otp")
  .post(wrapAsyn(resendOTPforVerifyEmail))

export default router;