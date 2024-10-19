import Login from "Components/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page to Simple Deliver",
};
const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
