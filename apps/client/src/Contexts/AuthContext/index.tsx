"use client";
import { AuthMethods } from "@nizar-repo/auth-types";
import {
  ClassicLoginBodyType,
  ClassicSignUpBodyType,
  UserData,
} from "@nizar-repo/authenticator";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import { Loader } from "@nizar-repo/ui";
import generateApiMessage from "helpers/generateApiMessage";
import { SESSION_STATUS } from "helpers/session-management/SessionTypes";
import { useAuthStatus } from "hooks/useAuthStatus";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import Api from "../../sdks";
import { createSession, deleteSession, updateSession } from "./sessionHandlers";

interface AuthContextType {
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const isAuthenticated = useAuthStatus(); // Use hook instead of state
  const queryClient = useQueryClient();
  const { toast } = useToastContext();

  const { isLoading: sessionLoading } = useQuery(
    "refreshSession",
    updateSession,
    {
      onSuccess: async (res) => {
        if (res?.sessionStatus === SESSION_STATUS.SESSION_UPDATED) {
          setUserData(res.userData);
          toast({
            type: "success",
            message: "Welcome to simple deliver",
            timer: 2000,
          });
        } else {
          setUserData(null);
        }
      },
      onError: (error) => {
        toast({
          type: "error",
          message: generateApiMessage(error),
          timer: 2000,
        });
      },
      refetchOnWindowFocus: false,
    }
  );
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
          setUserData({
            email: res.email,
            username: res.username,
          });
          queryClient.invalidateQueries("refreshSession");
          router.push("/");
        },
        onError: (error) => {
          toast({
            type: "error",
            message: generateApiMessage(error),
            timer: 2000,
          });
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
          setUserData({
            email: res.email,
            username: res.username,
          });
          queryClient.invalidateQueries("refreshSession");
          router.push("/");
        },
        onError: (error) => {
          toast({
            type: "error",
            message: generateApiMessage(error),
            timer: 2000,
          });
        },
      }
    );

  const logout = async () => {
    await deleteSession();
    setUserData(null);
    queryClient.removeQueries("refreshSession");
    router.push("/");
  };

  const value = {
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
