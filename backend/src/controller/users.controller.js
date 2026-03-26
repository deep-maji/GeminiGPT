import Users from "../models/users.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import ExpressError from "../utils/ExpressError.js";
import { genarateToken, verifyToken } from "../utils/jwt.util.js";


const register = async (req, res, next) => {
  if (!req.body) {
    throw new ExpressError(httpStatus.UNAUTHORIZED, "Missing Credentials");
  }

  let { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ExpressError(httpStatus.UNAUTHORIZED, "Missing Credentials");
  }



  const existUser = await Users.findOne({ email });
  if (existUser) {
    // eairly return statement
    return res.status(httpStatus.FOUND).json({ message: "User already exists!" });
  }

  const SALT = 10;
  const hashPassword = await bcrypt.hash(password, SALT);

  const newUserData = {
    fullname,
    email,
    password: hashPassword
  }

  console.log(newUserData);

  const newUser = new Users(newUserData);
  await Users.insertOne(newUser);
  res.status(httpStatus.CREATED).json({ message: "User registered successfully!" });
}

const login = async (req, res, next) => {
  if (!req.body) {
    throw new ExpressError(httpStatus.UNAUTHORIZED, "Missing Credentials");
  }
  const { email, password } = req?.body;
  if (!email || !password) {
    throw new ExpressError(httpStatus.UNAUTHORIZED, "Missing Credentials");
  }

  const user = await Users.findOne({ email });

  // user not exsit
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Invaild email or User do not exsits" });
  }

  // comparing hash and normal text password 
  const checkUser = bcrypt.compare(password, user.password);
  // checking password is match or not
  if (checkUser) {
    const payload = {
      id: user._id,
      email,
    }
    const token = genarateToken(payload);
    user.token = token;
    const save = await user.save();
    return res.status(httpStatus.OK).json({ message: "Loged In!", token, email, id: user._id });
  }
  else {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invaild password!" });
  }
}


export { register, login };