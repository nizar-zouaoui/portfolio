import { AuthMethods } from "@nizar-repo/auth-types";
import React, { createContext, useState, ReactNode } from "react";
import { ClassicLoginBodyType, UserData } from "@nizar-repo/authenticator";
import {
  updateSession,
  createSession,
  deleteSession,
  SESSION_STATUS,
} from "./session-management";
import Api from "../../sdks";
import { Loader } from "@nizar-repo/ui";
import { useMutation, useQuery, useQueryClient } from "react-query";
import hashPassword from "../../helpers/hashPassword";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "../../helpers/generateApiMessage";

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (props: LoginProps) => void;
  classicLoginLoading: boolean;
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
  const queryClient = useQueryClient();
  const { addToast } = useToastContext();

  const { isLoading: refreshSessionLoading, isSuccess: refreshSessionSuccess } =
    useQuery("refreshSession", updateSession, {
      onSuccess: async (res) => {
        if (res?.sessionStatus === SESSION_STATUS.SESSION_UPDATED) {
          setUserData(res.userData);
          setIsAuthenticated(true);
          addToast({
            type: "success",
            message: "Welcome to simple deliver",
            timer: 2000,
          });
        } else {
          setUserData(null);
          setIsAuthenticated(false);
          addToast({
            type: "warning",
            message: "Join us to get the best experience",
            timer: 2000,
          });
        }
      },
      refetchOnWindowFocus: false,
    });

  const { mutate: classicLoginMutation, isLoading: classicLoginLoading } =
    useMutation(
      async ({ data }: LoginProps) => {
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
          window.location.reload();
        },
        onError: (error) => {
          addToast({
            type: "error",
            message: generateApiMessage(error),
            timer: 2000,
          });
        },
      }
    );

  const logout = async () => {
    await deleteSession();
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    queryClient.removeQueries("refreshSession");
    window.location.reload();
  };

  const value = {
    token,
    isAuthenticated,
    logout,
    login: classicLoginMutation,
    classicLoginLoading,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!refreshSessionLoading && refreshSessionSuccess ? children : <Loader />}
    </AuthContext.Provider>
  );
};
