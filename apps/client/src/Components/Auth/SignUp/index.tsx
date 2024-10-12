"use client";
import React from "react";
import { SignUpForm } from "@nizar-repo/authenticator";
import useClassicSignUp from "./useClassicSignUp";
import Link from "next/link";

const SignUp = () => {
  const { formMethods, onSubmit, loading } = useClassicSignUp();
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-40">
      <SignUpForm
        formMethods={formMethods}
        loading={loading}
        onSubmit={onSubmit}
      />
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
