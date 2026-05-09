import Users from "../models/users.model.js";
import connectDB from "../config/db/connectDB.js";

const init = async () => {
  await connectDB();
  await Users.deleteMany();
  console.log("All user data is deleted");

}

try {
  init();
} catch (error) {
  console.log("Init - Error");

}