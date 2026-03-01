import { LoginForm } from "@nizar-repo/authenticator";
import React from "react";
import useClassicLogin from "./useClassicLogin";

const Login: React.FC = () => {
  const { onSubmit, loading } = useClassicLogin();
  return (
    <div className="w-full max-w-md mx-auto">
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
