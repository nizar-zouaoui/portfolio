"use client";
import { AuthMethods } from "@nizar-repo/auth-types";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Api from "../../sdks";
import { useRouter } from "next/navigation";
import { createSession, deleteSession, updateSession } from "./sessionHandlers";
import {
  ClassicLoginBodyType,
  ClassicSignUpBodyType,
  UserData,
} from "@nizar-repo/authenticator";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { Loader } from "@nizar-repo/ui";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (props: LoginProps) => void;
  classicLoginLoading: boolean;
  userData: UserData | null;
  classicSignUp: UseMutateFunction<
    {
      accessToken: string;
      email: string;
      username: string;
    },
    unknown,
    ClassicSignUpBodyType,
    unknown
  >;
  classicSignUpLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type LoginProps = {
  authMethod: AuthMethods.CLASSIC;
  data: ClassicLoginBodyType;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { isLoading: sessionLoading } = useQuery(
    "refreshSession",
    updateSession,
    {
      onSuccess: async (res) => {
        if (res?.sessionStatus === "SESSION_UPDATED") {
          setUserData(res.userData);
          setIsAuthenticated(true);
        } else {
          setUserData(null);
          setIsAuthenticated(false);
        }
      },
      refetchOnWindowFocus: false,
    }
  );
  console.log(sessionLoading);
  const router = useRouter();

  const { mutate: classicLoginMutation, isLoading: classicLoginLoading } =
    useMutation(
      async (data: ClassicLoginBodyType) => {
        return Api.authSDK.classicSignIn({
          body: {
            ...data,
            password: await hashPassword(data.password),
          },
        });
      },
      {
        onSuccess: async (res) => {
          await createSession(res.accessToken);
          setIsAuthenticated(true);
          setUserData({
            email: res.email,
            username: res.username,
          });
          queryClient.invalidateQueries("refreshSession");
          router.push("/");
        },
      }
    );
  const login = ({ authMethod, data }: LoginProps) => {
    switch (authMethod) {
      case AuthMethods.CLASSIC:
        classicLoginMutation(data);
    }
  };

  const { mutate: classicSignUpMutation, isLoading: classicSignUpLoading } =
    useMutation(
      async (data: ClassicSignUpBodyType) => {
        return Api.authSDK.classicSignUp({
          body: {
            username: data.username,
            email: data.email,
            password: await hashPassword(data.password),
          },
        });
      },
      {
        onSuccess: async (res) => {
          await createSession(res.accessToken);
          setIsAuthenticated(true);
          setUserData({
            email: res.email,
            username: res.username,
          });
          queryClient.invalidateQueries("refreshSession");
          router.push("/");
        },
      }
    );

  const logout = async () => {
    await deleteSession();
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    queryClient.removeQueries("refreshSession");
    router.push("/");
  };

  const value = {
    token,
    isAuthenticated,
    logout,
    login,
    classicLoginLoading,
    classicSignUp: classicSignUpMutation,
    classicSignUpLoading,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!sessionLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
