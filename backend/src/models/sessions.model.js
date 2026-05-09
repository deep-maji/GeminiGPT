import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required!"]
  },
  refreshTokenHash: {
    type: String,
    required: [true, "Refresh hash token is required!"]
  },
  ip: {
    type: String,
    required: [true, "IP address is reuired!"]
  },
  userAgent: {
    type: String,
    require: [true, "User agent is required"]
  },
  revoked: {
    type: Boolean,
    default: false
  },
},
  {
    timestamps: true
  })

const Session = mongoose.model("Session", sessionSchema);

export default Session;