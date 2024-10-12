"use client";
import React from "react";
import { SignUpForm } from "@nizar-repo/authenticator";
import useClassicSignUp from "./useClassicSignUp";

const SignUp = () => {
  const { formMethods, onSubmit, loading } = useClassicSignUp();
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-40">
      <SignUpForm
        formMethods={formMethods}
        loading={loading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SignUp;
