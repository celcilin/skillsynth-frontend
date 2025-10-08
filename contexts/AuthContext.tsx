// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // or 'next/navigation' for app directory
import { authApi } from "@/utils/api";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await authApi.getUser();
      setUser(response.data);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      const { access_token, refresh_token, expires_in, user } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh", refresh_token);
      localStorage.setItem("expires", String(Date.now() + expires_in * 1000));

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
