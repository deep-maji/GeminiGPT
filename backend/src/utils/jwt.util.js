import jwt from "jsonwebtoken";
import httStatus from "http-status";
import ExpressError from "./ExpressError.js";
import config from "../config/config.js";


const verifyToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader && !authHeader?.startsWith("Bearer ")) {
    return res.status(httStatus.FORBIDDEN).json({ message: "Invaild Token or user not loged in" });
  }

  try {
    const token = authHeader.split(" ")[1];

    if (token === undefined || !isVaildJWT(token)) {
      throw new ExpressError(httStatus.BAD_REQUEST, "Token Required!");
    }

    const privateKey = config.JWT_KEY;
    const decoded = jwt.verify(token, privateKey);
    req.userData = decoded;
    next();
  } catch (error) {
    next(new ExpressError(httStatus.FORBIDDEN, error.message));
  }

}

const getJWTdecodeData = (token) => {
  try {
    return jwt.verify(token, config.JWT_KEY);
  } catch (error) {
    throw error;
  }
}

const genAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_KEY, { expiresIn: "15m" });
}

const genRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_KEY, { expiresIn: "7d" });
}

const isVaildJWT = (token) => {
  if (token === undefined || token === null) {
    return false;
  }
  return token.split('.').length === 3;
};

export { genAccessToken, verifyToken, genRefreshToken, getJWTdecodeData };