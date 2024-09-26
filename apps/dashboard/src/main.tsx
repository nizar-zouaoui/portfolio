import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@nizar-repo/tailwindcss-config/tailwind/styles/globals.css";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
