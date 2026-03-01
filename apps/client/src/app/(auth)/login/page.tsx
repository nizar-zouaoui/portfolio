import Login from "Components/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Simple Deliver",
  description:
    "Sign in to your Simple Deliver account to access your marketing dashboard and manage your campaigns.",
};

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Simple Deliver
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access your marketing dashboard
          </p>
        </div>

        {/* Login Form */}
        <Login />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
