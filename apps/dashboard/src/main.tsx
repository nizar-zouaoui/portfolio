import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@nizar-repo/tailwindcss-config/tailwind/styles/globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./Wrappers/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
