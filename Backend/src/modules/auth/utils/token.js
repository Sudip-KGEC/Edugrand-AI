import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AppError } from "../../../utils/AppError.js";

export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export async function generateRefreshToken() {
  const refreshToken = crypto.randomBytes(64).toString("hex");

  const refreshHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  return { refreshToken, refreshHash };
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw err;
    }
    throw new AppError("Invalid access token", 401);
  }
}