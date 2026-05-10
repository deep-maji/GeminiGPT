import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  }
})

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Gemini-GPT" <${config.GOOGLE_USER}>`,
      to,
      subject,
      html,
    })

    console.log("Message sent : %s", info.messageId);
    console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.log("Error sending email : ", error);
  }
}

const emailService = () => {
  transporter.verify((error, success) => {
    if (error) {
      console.error('Error connecting to email server:', error);
    } else {
      console.log('Email server is ready to send messages');
    }
  });
}

export default emailService;