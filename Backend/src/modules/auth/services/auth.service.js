import crypto from "crypto";
import * as userRepo from "../repositories/user.repository.js";
import * as otpRepo from "../repositories/otp.repository.js";
import * as sessionRepo from "../repositories/session.repository.js";
import { sendOtpEmail } from "../utils/mailer.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.js";
import { AppError } from "../../../utils/AppError.js";

const OTP_EXPIRY = 10 * 60 * 1000;

export async function sendOtp(email) {
  const otp = crypto.randomInt(100000, 999999).toString();

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await otpRepo.upsertOtp({
    email,
    otpHash,
    expiresAt: new Date(Date.now() + OTP_EXPIRY),
  });

  await sendOtpEmail(email, otp);
}

export async function verifyOtp(email, otp, ip, userAgent) {
  const record = await otpRepo.findOtpByEmail(email);
  if (!record) throw new AppError("OTP expired", 400);

  const hash = crypto.createHash("sha256").update(otp).digest("hex");

  if (hash !== record.otpHash) {
    throw new AppError("Invalid OTP", 401);
  }

  await otpRepo.deleteOtpByEmail(email);

  let user = await userRepo.findByEmail(email);

  if (!user) {
    return { isNewUser: true, email };
  }

  const { refreshToken, refreshHash } = await generateRefreshToken();

  await sessionRepo.createSession({
    userId: user._id,
    refreshHash,
    ip,
    userAgent,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  return { accessToken, refreshToken, user };
}

export async function completeProfile(email, data, ip, userAgent) {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new AppError("User exists", 400);

  const user = await userRepo.createUser({
    email,
    ...data,
    verified: true,
  });

  const { refreshToken, refreshHash } = await generateRefreshToken();

  await sessionRepo.createSession({
    userId: user._id,
    refreshHash,
    ip,
    userAgent,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  return { accessToken, refreshToken, user };
}

export async function refreshToken(token, ip, userAgent) {
  if (!token) throw new AppError("Unauthorized", 401);

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const session = await sessionRepo.findValidSession(hash);
  if (!session) throw new AppError("Invalid refresh token", 401);

  await sessionRepo.revokeSession(session._id);

  const user = await userRepo.findById(session.userId);

  const { refreshToken, refreshHash } = await generateRefreshToken();

  await sessionRepo.createSession({
    userId: user._id,
    refreshHash,
    ip,
    userAgent,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  return { accessToken, refreshToken };
}

export async function logout(token) {
  if (!token) return;

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  await sessionRepo.revokeByHash(hash);
}

export async function logoutAll(userId) {
  await sessionRepo.revokeAllUserSessions(userId);
}

export async function updateProfile(userId, data) {
  return await userRepo.updateUser(userId, data);
}