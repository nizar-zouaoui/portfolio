"use client";
import { ToastProvider } from "@nizar-repo/toast/Context/ToastContext";
import { DarkModeProvider } from "@nizar-repo/ui";
import Navbar from "Components/NavBar";
import { AuthProvider } from "Contexts/AuthContext";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Wrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Script>{`(function () {
  function changeTheme(newTheme) {
    window.__theme = newTheme;
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");

      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#fffff");
    } else {
      document.documentElement.classList.add("dark");

      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#111827");
    }
  }

  var prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var preferredTheme;

  try {
    preferredTheme = localStorage.getItem("theme");
  } catch (error) {}

  window.__setPreferredTheme = function (newTheme) {
    if (newTheme !== "system") {
      changeTheme(newTheme);
    } else {
      changeTheme(prefersDarkQuery.matches ? "dark" : "light");
    }

    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };

  prefersDarkQuery.addEventListener("change", function (e) {
    window.__setPreferredTheme("system");
  });

  if (preferredTheme && preferredTheme !== "system") {
    changeTheme(preferredTheme);
  } else {
    changeTheme(prefersDarkQuery.matches ? "dark" : "light");
  }
})();
      `}</Script>
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <ToastProvider>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </ToastProvider>
        </DarkModeProvider>
      </QueryClientProvider>
    </>
  );
}
