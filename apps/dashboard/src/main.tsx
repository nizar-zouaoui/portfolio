import "@nizar-repo/tailwindcss-config/tailwind/styles/globals.css";
import { ToastProvider } from "@nizar-repo/toast/Context/ToastContext";
import { DarkModeProvider } from "@nizar-repo/ui";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { PageHeaderProvider } from "./contexts/PageHeaderContext";
import AppRouter from "./Wrappers/AppRouter";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
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
  // </StrictMode>
);
