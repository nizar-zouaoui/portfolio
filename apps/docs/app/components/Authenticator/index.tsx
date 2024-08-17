import React, { useEffect } from "react";

import { AuthSDK } from "@nizar-repo/auth-sdk";

const Authenticator = () => {
  let token: string | null = null;
  if (typeof window !== "undefined") token = localStorage.getItem("token");

  const testApiSDK = new AuthSDK(
    process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000/",
    token
  );
  useEffect(() => {
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
