"use client";
import React from "react";
import useClassicLogin from "./useClassicLogin";
import { LoginForm } from "@nizar-repo/authenticator";
import Link from "next/link";

const Login = () => {
  const { formMethods, onSubmit, loading } = useClassicLogin();
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-40">
      <LoginForm
        formMethods={formMethods}
        loading={loading}
        onSubmit={onSubmit}
      />
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          New here?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
