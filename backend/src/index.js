import "dotenv/config";
import express from "express";
import chatRoute from "./routes/chat.route.js";
import streamingChatRoute from "./routes/StreamingChat.route.js";
import ExpressError from "./utils/ExpressError.js";
import connectToDB from "./db/connectDB.js";
import usersRoute from "./routes/users.route.js";
import cros from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cros());

// login & register route
app.use("/api/v1/user", usersRoute);
// chat route
app.use("/api/v1/", chatRoute);
// Api v2 Streaimg chat
app.use("/api/v2/", streamingChatRoute);


// Handel not matched root
app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Route not found!"));
})

// Error handling middleware
app.use((err, req, res, next) => {
  let { message = "Something wrong in our side", status = 500 } = err;
  console.log(err);
  res.status(status).json({ status, message: message });
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listiing on port ${process.env.PORT}`);
  connectToDB();
})