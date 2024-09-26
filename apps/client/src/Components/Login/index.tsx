"use client";
import React from "react";
import LoginForm from "./LoginForm";
import useClassicLogin from "./useClassicLogin";

const Login = () => {
  const { formMethods, onSubmit, loading } = useClassicLogin();
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-40">
      <LoginForm
        formMethods={formMethods}
        loading={loading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
