import { useAuth } from "../context/useAuth";
import AccessDenied from "@/shared/components/AccessDenied";

export default function RoleRoute({ roles, children }) {
  const { user } = useAuth();

  if (!user) return null;

  if (roles && !roles.includes(user.role)) {
    return <AccessDenied title="Access Denied" />;
  }

  return children;
}