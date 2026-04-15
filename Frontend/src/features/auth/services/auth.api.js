import api from "@/app/api/axios";

export const sendOtp = async (email) => {
  const res = await api.post("/auth/send-otp", { email });
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const completeProfile = async (data) => {
  const res = await api.post("/auth/complete-profile", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/auth/update-profile", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};