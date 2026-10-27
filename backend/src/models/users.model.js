import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: [true, "Email is require!"],
    unique: [true, "Email is already exsit!"],
  },
  password: {
    type: String,
    require: [true, "Password is require!"],
  },
  verified: {
    type: Boolean,
    default: true
  }
})

const Users = mongoose.model("User", userSchema);

export default Users;