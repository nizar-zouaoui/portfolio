import Login from "components/Login";
import SEOHelmet from "components/SEO";
import React from "react";

const LoginPage: React.FC = () => {
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
