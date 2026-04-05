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
    const initAuth = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
        isAuthInitialized.current = true;
      }
    };

    initAuth();
  }, []);

  // ================= AUTH ACTIONS =================

  const login = useCallback((userData) => {
    setUser(userData);
    setShowAuthModal(false); // auto close modal
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUser(null);
  }, []);

  // ================= MODAL CONTROL =================

  const openAuth = useCallback(() => {
    // 🔥 prevent modal spam
    setShowAuthModal((prev) => (prev ? prev : true));
  }, []);

  const closeAuth = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  // 🔥 Register global trigger (axios)
  useEffect(() => {
    setAuthHandler(() => {
      // only open after auth check complete
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
      {/* 🔥 Prevent UI flash before auth ready */}
      {!loading && children}
    </AuthContext.Provider>
  );
};