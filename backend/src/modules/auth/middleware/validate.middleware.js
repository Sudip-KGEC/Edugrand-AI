import { AppError } from "../../../utils/AppError.js";

const emailRegex = /^\S+@\S+\.\S+$/;

export function validateSendOtp(req, _res, next) {
  const { email } = req.body;
  if (!email || !emailRegex.test(email)) {
    return next(new AppError("Valid email is required", 400));
  }
  req.body.email = email.toLowerCase().trim();
  next();
}

export function validateVerifyOtp(req, _res, next) {
  const { email, otp } = req.body;
  if (!email || !emailRegex.test(email)) {
    return next(new AppError("Valid email is required", 400));
  }
  if (!otp || !/^\d{6}$/.test(otp)) {
    return next(new AppError("OTP must be a 6-digit number", 400));
  }
  req.body.email = email.toLowerCase().trim();
  next();
}