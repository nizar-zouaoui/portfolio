import { LoginForm } from "@nizar-repo/authenticator";
import React from "react";
import useClassicLogin from "./useClassicLogin";

const Login: React.FC = () => {
  const { onSubmit, loading } = useClassicLogin();
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-20">
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
