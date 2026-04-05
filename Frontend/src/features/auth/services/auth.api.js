import api from "@/app/api/axios";

// 🔹 SEND OTP
export const sendOtp = async (email) => {
  const res = await api.post("/auth/send-otp", { email });
  return res.data;
};

// 🔹 VERIFY OTP
export const verifyOtp = async (email, otp) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};

// 🔹 COMPLETE PROFILE
export const completeProfile = async (data) => {
  const res = await api.post("/auth/complete-profile", data);
  return res.data;
};

// 🔹 GET PROFILE
export const getUserProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data; // always return full response
};

// 🔹 UPDATE PROFILE
export const updateProfile = async (data) => {
  const res = await api.put("/auth/update-profile", data);
  return res.data;
};

// 🔹 LOGOUT
export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};