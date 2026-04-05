import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as authRepo from "../../modules/auth/auth.repository.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, please login",
    });
  }

  // 🔹 Check blacklist
  const isBlacklisted = await authRepo.isTokenBlacklisted(token);

  if (isBlacklisted) {
    res.clearCookie("token");
    return res.status(401).json({
      success: false,
      message: "Session expired, login again",
    });
  }

  // 🔹 Safe JWT verify
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  // 🔹 DB fetch
  const user = await authRepo.findUserById(decoded.id);

  if (!user) {
    res.clearCookie("token");
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  // 🔥 Attach BOTH minimal + full user (best practice)
  req.user = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  req.userFull = user; // ✅ optimization (no second DB call)

  next();
});


export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};