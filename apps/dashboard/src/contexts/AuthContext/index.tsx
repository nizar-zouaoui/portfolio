import { AuthMethods } from "@nizar-repo/auth-types";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { ClassicLoginBodyType, UserData } from "@nizar-repo/authenticator";
import {
  updateSession,
  createSession,
  deleteSession,
} from "./session-management";
import Api from "../../sdks";

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
  logout: () => void;
  login: (props: LoginProps) => void;
  loading: boolean;
  userData: UserData | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type LoginProps = {
  authMethod: AuthMethods.CLASSIC;
  data: ClassicLoginBodyType;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshSession = async () => {
    try {
      const res = await updateSession();
      if (!res) throw new Error("Failed to update session");
      setUserData(res.userData);
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
            // router.push("/");
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
