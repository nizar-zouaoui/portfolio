"use client";
import { AuthProvider } from "../Contexts/AuthContext";
import Navbar from "../Components/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Wrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
