import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import React from "react";
import { FormProvider } from "react-hook-form";
import { ClassicSignUpBodyType } from "../types";
import useSignUpForm from "./useSignUpForm";

interface ISignUpForm extends IBasicForm<ClassicSignUpBodyType> {}

const SignUpForm: React.FC<ISignUpForm> = ({ onSubmit, loading }) => {
  const { formMethods, handleSubmit } = useSignUpForm({ onSubmit });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit} className="unified-form-container w-full">
        {/* Form Header */}
        <div className="text-center pb-6 border-b border-neutral-200 dark:border-neutral-700 mb-6">
          <Icons.Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join us today and get started with your account
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.User className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="username"
              defaultValue=""
              displayName="Username"
              placeholder="Choose a unique username"
              autoComplete="username"
              size="lg"
              rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Username must not exceed 30 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "Username can only contain letters, numbers, underscores, and hyphens",
                },
              }}
              helpText="3-30 characters, letters, numbers, underscore, and hyphen only"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.Mail className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="email"
              defaultValue=""
              displayName="Email"
              placeholder="Enter your email address"
              autoComplete="email"
              size="lg"
              rules={{
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email address",
                },
                maxLength: {
                  value: 320,
                  message: "Email address is too long",
                },
              }}
              helpText="We'll use this email to send important account updates"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.EyeSlash className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="password"
              defaultValue=""
              displayName="Password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              type="password"
              size="lg"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) => {
                  // Check for uppercase letter
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  // Check for lowercase letter
                  if (!/[a-z]/.test(value)) {
                    return "Password must contain at least one lowercase letter";
                  }
                  // Check for number
                  if (!/\d/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  // Check for special character
                  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(value)) {
                    return "Password must contain at least one special character";
                  }
                  return true;
                },
              }}
              helpText="Must include: uppercase, lowercase, number, and special character"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.CheckCircle className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="verifyPassword"
              defaultValue=""
              displayName="Verify Password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              type="password"
              size="lg"
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === formMethods.getValues("password") ||
                  "Passwords do not match",
              }}
              helpText="Must match the password entered above"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="space-y-4">
          <Button
            type="submit"
            variant={loading ? "outline" : "primary"}
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Icons.LoadingSpinner className="w-4 h-4" />
                Creating Account...
              </>
            ) : (
              <>
                <Icons.CheckCircle className="w-4 h-4" />
                Create Account
              </>
            )}
          </Button>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors font-medium"
            >
              Sign in here
            </button>
          </div>
        </div>

        {/* Form Help */}
        <div className="unified-form-help">
          <Icons.InformationCircle className="w-5 h-5 text-info-500 flex-shrink-0" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">Account Creation Guidelines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Choose a unique username that represents you</li>
              <li>Use a valid email address you have access to</li>
              <li>Create a strong password with mixed characters</li>
              <li>Keep your login credentials secure and private</li>
            </ul>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
