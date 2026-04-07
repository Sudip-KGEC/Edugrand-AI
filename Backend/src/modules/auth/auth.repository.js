import User from "../../database/models/User.model.js";
import Otp from "../../database/models/Otp.model.js";
import BlacklistToken from "../../database/models/BlacklistToken.model.js";

export const saveOtp = async (email, otp) => {
return await Otp.findOneAndUpdate(
  { email },
  {
    otp: String(otp),
    otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
  },
  {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  }
);
};

export const findOtp = (email) => {
  return Otp.findOne({ email });
};

export const deleteOtp = (id) => {
  return Otp.deleteOne({ _id: id });
};

export const findUserByEmail = (email) => {
  return User.findOne({ email: email.toLowerCase().trim() }).lean();
};

export const createUser = (data) => {
  return new User(data).save();
};

export const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const isTokenBlacklisted = (token) => {
  return BlacklistToken.findOne({ token });
};

export const findUserById = (userId) => {
  return User.findById(userId).select("-password");
};