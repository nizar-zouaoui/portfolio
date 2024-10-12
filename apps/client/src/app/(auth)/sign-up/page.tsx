import { Metadata } from "next";
import React from "react";
import SignUp from "../../../Components/Auth/SignUp";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up to Simple Deliver",
};
const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
