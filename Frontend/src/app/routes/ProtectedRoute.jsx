import { useEffect, useRef } from "react";
import { useAuth } from "@/app/context/useAuth";
import Loader from "@/shared/components/Loader";
import AccessDenied from "../../shared/components/AccessDenied";

export default function ProtectedRoute({ children, role }) {
  const { user, loading, openAuth } = useAuth();
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !triggeredRef.current) {
      triggeredRef.current = true;
      openAuth();
    }
  }, [loading, user, openAuth]);

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  if (!user) return null;

  if (role && user.role !== role) {
    return (
      <AccessDenied title="Access Denied" />
    );
  }

  return children;
}