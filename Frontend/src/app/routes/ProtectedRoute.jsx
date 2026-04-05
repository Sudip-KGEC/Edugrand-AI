import { useEffect } from "react";
import { useAuth } from "@/app/context/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading, openAuth } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      openAuth();
    }
  }, [loading, user, openAuth]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!user) return null;

  if (role && user.role !== role) {
    return <div className="text-center py-20 text-red-500">Access Denied</div>;
  }

  return children;
}