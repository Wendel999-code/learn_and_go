import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: ("ENROLLEE" | "ADMIN")[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!role) return <Navigate to="/auth/login" replace />;

 
  if (!allowedRoles.includes(role)) {
   
    return role === "ADMIN" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/enrollee" replace />
    );
  }

  return children;
}
