import { useState, useEffect, useCallback, useRef } from "react";
import { AuthContext } from "./auth.context";
import { getUserProfile } from "@/features/auth/services/auth.api";
import api from "@/app/api/axios";
import { setAuthHandler } from "@/app/authEvent";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isAuthInitialized = useRef(false);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const data = await getUserProfile();
        if (mounted) setUser(data);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) {
          setLoading(false);
          isAuthInitialized.current = true;
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    setShowAuthModal(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  }, []);

  const openAuth = useCallback(() => {
    setShowAuthModal((prev) => (prev ? prev : true));
  }, []);

  const closeAuth = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  useEffect(() => {
    setAuthHandler(() => {
      if (isAuthInitialized.current) {
        openAuth();
      }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};