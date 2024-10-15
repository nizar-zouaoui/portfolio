import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@nizar-repo/tailwindcss-config/tailwind/styles/globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./Wrappers/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { PageHeaderProvider } from "./contexts/PageHeaderContext";
import { ToastProvider } from "@nizar-repo/toast/Context/ToastContext";
import { DarkModeProvider } from "@nizar-repo/ui";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <PageHeaderProvider>
          <DarkModeProvider>
            <ToastProvider>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
            </ToastProvider>
          </DarkModeProvider>
        </PageHeaderProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
