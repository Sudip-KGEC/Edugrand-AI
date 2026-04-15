import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { REFRESH_COOKIE_OPTIONS } from "../utils/cookie.js";

export const sendOtpController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.sendOtp(email);
  res.status(200).json({ message: "OTP sent" });
});

export const verifyOtpController = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"] || "unknown";

  const result = await authService.verifyOtp(email, otp, ip, userAgent);

  if (result.isNewUser) {
    return res.status(200).json(result);
  }

  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(200).json({
    accessToken: result.accessToken,
    user: result.user,
  });
});

export const completeProfileController = asyncHandler(async (req, res) => {
  const { email, ...data } = req.body;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"] || "unknown";

  const { accessToken, refreshToken, user } =
    await authService.completeProfile(email, data, ip, userAgent);

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(201).json({ accessToken, user });
});

export const refreshTokenController = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"] || "unknown";

  const { accessToken, refreshToken } =
    await authService.refreshToken(token, ip, userAgent);

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(200).json({ accessToken });
});

export const logoutController = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  await authService.logout(token);

  res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);

  res.status(200).json({ message: "Logged out" });
});

export const logoutAllController = asyncHandler(async (req, res) => {
  await authService.logoutAll(req.user.id);
  res.status(200).json({ message: "Logged out from all devices" });
});

export const getMeController = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.status(200).json({ user });
});