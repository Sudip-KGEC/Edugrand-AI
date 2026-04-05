import { AuthProvider } from "./context/auth.provider";
import { ThemeProvider } from "./context/theme.provider";
import { LanguageProvider } from "./context/language.provider";

import { useAuth } from "./context/useAuth";
import AuthModal from "@/features/auth/components/AuthModal";

// 🔥 Internal layer (so we can use hooks safely)
function AppContent({ children }) {
  const { showAuthModal, closeAuth, loading } = useAuth();

  // ⛔ Prevent UI before auth ready
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {children}

     
      {showAuthModal && <AuthModal onClose={closeAuth} />}
    </>
  );
}

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent>{children}</AppContent>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}