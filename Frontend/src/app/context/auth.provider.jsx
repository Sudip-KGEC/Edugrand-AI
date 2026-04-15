import { useState, useEffect, useCallback, useRef } from "react";
import { AuthContext } from "./auth.context";
import { getUserProfile } from "@/features/auth/services/auth.api";
import api, { setAccessToken } from "@/app/api/axios";
import { setAuthHandler } from "@/app/authEvent";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isAuthInitialized = useRef(false);

  const normalizeUser = (res) => {
    return res?.user || res?.data?.user || res?.data || res || null;
  };

  const fetchProfile = useCallback(async () => {
    const res = await getUserProfile();
    return normalizeUser(res);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true, _skipAuthRefresh: true }
        );

        if (res?.data?.accessToken) {
          setAccessToken(res.data.accessToken);
        }

        const profile = await fetchProfile();

        if (mounted) setUser(profile);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) {
          isAuthInitialized.current = true;
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, [fetchProfile]);

  const login = useCallback((userData, token) => {
    if (token) setAccessToken(token);
    setUser(userData);
    setShowAuthModal(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const updateUser = useCallback((data) => {
    setUser((prev) => {
      const updated = normalizeUser(data);
      return { ...prev, ...updated };
    });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch {
      setUser(null);
    }
  }, [fetchProfile]);

  const openAuth = useCallback(() => {
    setShowAuthModal((prev) => (prev ? prev : true));
  }, []);

  const closeAuth = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  useEffect(() => {
    setAuthHandler(() => {
      if (isAuthInitialized.current) openAuth();
    });
  }, [openAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        showAuthModal,
        openAuth,
        closeAuth,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};