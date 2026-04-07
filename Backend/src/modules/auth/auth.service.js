import * as authRepo from "./auth.repository.js";
import { generateToken } from "../../utils/generateToken.js";
import { sendEmail } from "../../services/email/email.service.js";
import { otpTemplate } from "../../services/email/email.templates.js";
import jwt from "jsonwebtoken";
import BlacklistToken from "../../database/models/BlacklistToken.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const sendOtp = async (email) => {
  const cleanEmail = email.trim().toLowerCase();

  const user = await authRepo.findUserByEmail(cleanEmail);
  const existingOtp = await authRepo.findOtp(cleanEmail);

  if (
    existingOtp &&
    new Date(existingOtp.otpExpiry).getTime() > Date.now()
  ) {
    const remaining = Math.ceil(
      (new Date(existingOtp.otpExpiry).getTime() - Date.now()) / 1000
    );

    throw ApiError.rateLimit("OTP already sent", remaining);
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await authRepo.saveOtp(cleanEmail, otp);

  await sendEmail({
    to: cleanEmail,
    subject: "Your OTP Code",
    html: otpTemplate(otp),
  });

  return {
    success: true,
    message: "OTP sent",
    isNewUser: !user,
  };
};

export const verifyOtp = async ({ email, otp }) => {
  const cleanEmail = email.trim().toLowerCase();

  const record = await authRepo.findOtp(cleanEmail);

 if (!record) {
  throw ApiError.badRequest("Invalid or expired OTP");
}

  if (new Date(record.otpExpiry).getTime() < Date.now()) {
    throw ApiError.badRequest("OTP expired");
  }

  if (String(record.otp) !== String(otp)) {
    throw ApiError.badRequest("Invalid OTP");
  }

  await authRepo.deleteOtp(record._id);

  const user = await authRepo.findUserByEmail(cleanEmail);

  if (user) {
    const token = generateToken(user);

    return {
      type: "LOGIN",
      token,
      user,
    };
  }

  return {
    type: "REGISTER",
    email: cleanEmail,
  };
};

export const completeProfile = async (data) => {
  const existing = await authRepo.findUserByEmail(data.email);

  if (existing) {
    throw ApiError.conflict("User already exists");
  }

  const user = await authRepo.createUser(data);
  const token = generateToken(user);

  return {
    success: true,
    user,
    token,
  };
};

export const getProfile = async (userId) => {
  const user = await authRepo.findUserById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};

export const updateProfile = async (userId, data) => {
  return await authRepo.updateUser(userId, data);
};

export const logout = async (req) => {
  const token = req.cookies?.token;

  if (token) {
    const decoded = jwt.decode(token);

    await BlacklistToken.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });
  }

  return { success: true };
};