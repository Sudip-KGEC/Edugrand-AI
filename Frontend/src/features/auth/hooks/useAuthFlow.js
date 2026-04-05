import { useState } from "react";
import {
  sendOtp,
  verifyOtp,
  completeProfile,
  logoutUser,
  updateProfile,
  getUserProfile,
} from "../services/auth.api";
import { useAuth } from "@/app/context/useAuth";
import { useNavigate } from "react-router-dom";

export default function useAuthFlow(onClose) {
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    role: "student",
    college: "",
    cgpa: "",
  });

  const handleSendOtp = async () => {
    try {
      if (!email.includes("@")) {
        return setError("Enter valid email");
      }

      setLoading(true);
      setError("");

      await sendOtp(email);

      setOtp("");
      setStep("otp");
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (otp.length !== 6) {
        return setError("OTP must be 6 digits");
      }

      setLoading(true);
      setError("");

      const res = await verifyOtp(email, otp);

      if (res.type === "LOGIN") {
        const userData = await getUserProfile();
        login(userData);
        onClose?.();
        navigate("/");
      }

      if (res.type === "REGISTER") {
        setStep("profile");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    try {
      if (!profile.name || !profile.college) {
        return setError("Fill required fields");
      }

      setLoading(true);
      setError("");

      await completeProfile({
        email,
        ...profile,
      });

      const userData = await getUserProfile();
      login(userData);
      onClose?.();
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      const res = await updateProfile(data);
      setUser(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return {
    step,
    email,
    otp,
    profile,
    loading,
    error,
    setStep,
    setEmail,
    setOtp,
    setProfile,
    sendOtp: handleSendOtp,
    verifyOtp: handleVerifyOtp,
    completeProfile: handleCompleteProfile,
    updateProfile: handleUpdateProfile,
    logout: handleLogout,
  };
}