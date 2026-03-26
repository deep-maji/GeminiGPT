import mongoose from "mongoose"

export default async function () {
  try {

    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`DataBase connected id : ${conn.connection.host}`);

  } catch (error) {
    console.log("DB connection error : ", error);
    process.exit(1);
  }
}