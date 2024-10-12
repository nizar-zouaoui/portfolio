import React from "react";
import { Metadata } from "next";
import Login from "../../../Components/Auth/Login";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page to Simple Deliver",
};
const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
