import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function RoleRoute({ role, children }) {
  const { user } = useAuth();

  if (!user?.data) return <Navigate to="/" />;

  if (user.data.role !== role) return <Navigate to="/" />;

  return children;
}