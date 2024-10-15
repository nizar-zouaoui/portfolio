"use client";
import { AuthProvider } from "../Contexts/AuthContext";
import Navbar from "../Components/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { DarkModeProvider } from "@nizar-repo/ui";

const queryClient = new QueryClient();

export default function Wrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}
