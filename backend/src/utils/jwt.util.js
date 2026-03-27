import jwt from "jsonwebtoken";
import httStatus from "http-status";
import ExpressError from "./ExpressError.js";

const genarateToken = (payload) => {
  const privateKey = process.env.JWT_KEY;
  return jwt.sign(payload, privateKey, { expiresIn: "72h" });
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader && !authHeader?.startsWith("Bearer ")) {
    return res.status(httStatus.UNAUTHORIZED).json({ message: "Invaild Token or user not loged in" });
  }

  try {
    const token = authHeader.split(" ")[1];
    if (token === undefined) {
      throw new ExpressError(httStatus.UNAUTHORIZED, "Token Required!");
    }
    const privateKey = process.env.JWT_KEY;
    const decoded = jwt.verify(token, privateKey);
    req.userData = decoded;
    next();
  } catch (error) {
    next(new ExpressError(httStatus.UNAUTHORIZED, error.message));
  }

}

export { genarateToken, verifyToken };