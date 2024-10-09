import { AuthMethods } from "@nizar-repo/auth-types";
import React, { createContext, useState, ReactNode } from "react";
import { ClassicLoginBodyType, UserData } from "@nizar-repo/authenticator";
import {
  updateSession,
  createSession,
  deleteSession,
} from "./session-management";
import Api from "../../sdks";
import { Loader } from "@nizar-repo/ui";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

  const { isLoading: refreshSessionLoading, isSuccess: refreshSessionSuccess } =
    useQuery("refreshSession", updateSession, {
      onSuccess: (res) => {
        if (res) {
          setUserData(res.userData);
          setIsAuthenticated(true);
        }
      },
      refetchOnWindowFocus: false, // Optional: avoid refetching when the window gains focus
    });

  const { mutate: classicLoginMutation, isLoading: classicLoginLoading } =
    useMutation(
      ({ data }: LoginProps) => Api.authSDK.classicSignIn({ body: data }),
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
        onError: (e) => console.log(e),
      }
    );

  const login = (props: LoginProps) => {
    classicLoginMutation(props);
  };

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
    login,
    classicLoginLoading,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!refreshSessionLoading && refreshSessionSuccess ? children : <Loader />}
    </AuthContext.Provider>
  );
};
