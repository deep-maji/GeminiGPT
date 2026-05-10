import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "../config/config.js";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: config.GOOGLE_REFRESH_TOKEN,
});

const createTransporter = async () => {
  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.GOOGLE_USER,
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      refreshToken: config.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
};

export const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Gemini-GPT" <${config.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const emailService = async () => {
  try {
    const transporter = await createTransporter();

    transporter.verify((error, success) => {
      if (error) {
        console.error("Error connecting to email server:", error);
      } else {
        console.log("Email server is ready");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export default emailService;