import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

export const sendEmail = async (to, subject, text, html) => {

  await new Promise((res, rej) => {
    transporter.sendMail({
      from: `"Gemini-GPT" <${config.GOOGLE_USER}>`,
      to,
      subject,
      html,
    }, (err, info) => {
      if (err) {
        console.log("Error sending email : ", error);
        rej(err);
      }
      else {
        res(info)
        console.log("Message sent : %s", info.messageId);
        console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));
      }
    })
  })
}

// export const sendEmail = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Gemini-GPT" <${config.GOOGLE_USER}>`,
//       to,
//       subject,
//       html,
//     })

//     console.log("Message sent : %s", info.messageId);
//     console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));

//   } catch (error) {
//     console.log("Error sending email : ", error);
//   }
// }

const emailService = async () => {
  try {
    await transporter.verify();
    console.log("Email server is ready");
  } catch (err) {
    console.error(err);
  }
};

export default emailService;