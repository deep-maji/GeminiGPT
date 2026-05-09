import mongoose from "mongoose"
import config from "../config.js";

export default async function () {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`DataBase connected id : ${conn.connection.host}`);

  } catch (error) {
    console.log("DB connection error : ", error);
    process.exit(1);
  }
}