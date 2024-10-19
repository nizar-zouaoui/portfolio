import SignUp from "Components/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up to Simple Deliver",
};
const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
