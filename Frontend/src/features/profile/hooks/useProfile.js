import { useState, useEffect } from "react";
import { updateProfileApi } from "../services/profile.api";
import { useAuth } from "@/app/context/useAuth";

export default function useProfile() {
  const { user, login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!user?.data) return;
    setFormData(user.data);
  }, [user]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await updateProfileApi(formData);

      login(res);
      setSuccess("Profile updated successfully ");
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    formData,
    setFormData,
    updateProfile,
    loading,
    error,
    success,
  };
}