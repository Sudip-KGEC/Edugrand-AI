import Otp from "../models/Otp.model.js";

export const findOtpByEmail = (email) =>
  Otp.findOne({ email });

export const upsertOtp = ({ email, otpHash, expiresAt }) =>
  Otp.findOneAndUpdate(
    { email },
    {
      otpHash,
      expiresAt,
      attempts: 0,
    },
    {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    }
  );

export const incrementAttempts = (email) =>
  Otp.updateOne(
    { email },
    { $inc: { attempts: 1 } }
  );

export const deleteOtpByEmail = (email) =>
  Otp.deleteOne({ email });

export const deleteExpiredOtps = () =>
  Otp.deleteMany({ expiresAt: { $lt: new Date() } });