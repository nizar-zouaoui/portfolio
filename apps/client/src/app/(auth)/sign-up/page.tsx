import SignUp from "Components/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Simple Deliver",
  description:
    "Create your Simple Deliver account to start building effective marketing campaigns with WhatsApp and email integration.",
};

const SignUpPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Simple Deliver
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start your marketing journey today
          </p>
        </div>

        {/* Sign Up Form */}
        <SignUp />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
