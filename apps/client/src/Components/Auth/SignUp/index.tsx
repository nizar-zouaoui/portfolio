"use client";
import { SignUpForm } from "@nizar-repo/authenticator";
import Link from "next/link";
import useClassicSignUp from "./useClassicSignUp";

const SignUp = () => {
  const { onSubmit, loading } = useClassicSignUp();
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-40">
      <SignUpForm loading={loading} onSubmit={onSubmit} />
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          {/* create Link to login page with dark mode text color */}
          <Link
            href="/login"
            className="text-blue-500 dark:text-blue-300 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
