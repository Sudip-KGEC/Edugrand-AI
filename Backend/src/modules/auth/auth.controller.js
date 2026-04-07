import * as authService from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const sendOtp = asyncHandler(async (req, res) => {
  const result = await authService.sendOtp(req.body.email);
  res.json(result);
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const result = await authService.verifyOtp(req.body);

  if (result.type === "LOGIN") {
    res.cookie("token", result.token, cookieOptions);
  }

  res.json(result);
});

export const completeProfile = asyncHandler(async (req, res) => {
  const result = await authService.completeProfile(req.body);

  res.cookie("token", result.token, cookieOptions);

  res.status(201).json(result);
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  res.json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({ success: true, data: user });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req);

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({ success: true, message: "Logged out successfully" });
});