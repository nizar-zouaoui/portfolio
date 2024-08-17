import React, { useEffect } from "react";

import { AuthSDK } from "@nizar-repo/auth-sdk";
const Authenticator = () => {
  if (typeof window !== "undefined") {
    const anything = localStorage.token;
    console.log(anything);
  }
  console.log(process.env.BASE_URL);
  useEffect(() => {
    const testApiSDK = new AuthSDK("https://localhost:3000/");
    testApiSDK
      .classicSignIn({
        body: {
          email: "email@example.com",
          password: "password",
        },
      })
      .then((res) => console.log(res));
  }, []);
  return <div>Authenticator</div>;
};

export default Authenticator;
