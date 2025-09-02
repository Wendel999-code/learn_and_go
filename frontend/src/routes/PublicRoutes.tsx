import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function PublicRoute({ children }: Props) {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (role === "ADMIN") return <Navigate to="/admin" replace />;
  if (role === "ENROLLEE") return <Navigate to="/enrollee" replace />;

  return children;
}
