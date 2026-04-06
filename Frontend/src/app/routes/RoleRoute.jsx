import { useAuth } from "../context/useAuth";
import AccessDenied from "@/shared/components/AccessDenied";

export default function RoleRoute({ role, children }) {
  const { user } = useAuth();

  if (role && user.role !== role) {
    return (
      <AccessDenied title="Access Denied" />
    );
  }

  return children;
}