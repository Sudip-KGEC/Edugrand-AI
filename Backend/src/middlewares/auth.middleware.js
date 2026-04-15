import { verifyAccessToken } from "../modules/auth/utils/token.js";
import { findById } from "../modules/auth/repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  let payload;

  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    throw new AppError("Invalid access token", 401);
  }

  const user = await findById(payload.id).select("-__v");

  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  if (!user.verified) {
    throw new AppError("Email not verified", 403);
  }

  req.user = user;
  next();
});

export const restrictTo = (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access denied", 403));
    }
    next();
  };