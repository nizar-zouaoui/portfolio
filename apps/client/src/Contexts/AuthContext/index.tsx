"use client";
import { AuthMethods, AuthRouteTypes } from "@nizar-repo/auth-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Api from "../../sdks";
import { useRouter } from "next/navigation";
import { createSession, deleteSession, updateSession } from "./sessionHandlers";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
  logout: () => void;
  login: (props: LoginProps) => void;
  loading: boolean;
  userData: UserData | null;
}

export type UserData = {
  email: string;
  username: string;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export type ClassicLoginBodyType =
  AuthRouteTypes["/auth/classic/login/"]["POST"]["body"];

type LoginProps = {
  authMethod: AuthMethods.CLASSIC;
  data: ClassicLoginBodyType;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const refreshSession = async () => {
    try {
      const res = await updateSession();
      const resJson = await res.json();
      setUserData(resJson.userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Failed to refresh session:", error);
      setIsAuthenticated(false);
    }
  };

  const login = ({ authMethod, data }: LoginProps) => {
    switch (authMethod) {
      case AuthMethods.CLASSIC:
        Api.authSDK
          .classicSignIn({
            body: data,
          })
          .then(async (res) => {
            await createSession(res.accessToken);
            setUserData({
              email: res.email,
              username: res.username,
            });
            router.push("/");
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
    }
  };

  const logout = async () => {
    await deleteSession();
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const initializeSession = async () => {
      await refreshSession();
    };
    initializeSession();
  }, []);

  const value = {
    token,
    isAuthenticated,
    refreshSession,
    logout,
    login,
    loading,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
