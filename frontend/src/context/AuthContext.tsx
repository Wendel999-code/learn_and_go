import api from "@/axios/axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Role = "ENROLLEE" | "ADMIN";

interface AuthContextType {
  role: Role | null;
  userId: string | null;
  loading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me", { withCredentials: true });
      setRole(res.data.role || null);
      setUserId(res.data.id || null);

      console.log(res.data);
    } catch {
      setRole(null);
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ role, userId, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
