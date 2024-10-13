import SEOHelmet from "../../components/SEO";
import Login from "../../components/Login";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <SEOHelmet
        title="Login"
        description="Login page is destined to authenticate the user."
      />
      <Login />
    </>
  );
};

export default LoginPage;
