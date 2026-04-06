import { AuthProvider } from "./context/auth.provider";
import { ThemeProvider } from "./context/theme.provider";
import { LanguageProvider } from "./context/language.provider";

import { useAuth } from "./context/useAuth";
import AuthModal from "@/features/auth/components/AuthModal";
import Loader from "@/shared/components/Loader";

function AppContent({ children }) {
  const { showAuthModal, closeAuth, loading } = useAuth();

  if (loading) {
    return (
      <Loader fullScreen text="Initializing..." />
    );
  }

  return (
    <>
      {children}

      {showAuthModal && (
        <AuthModal onClose={closeAuth} />
      )}
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