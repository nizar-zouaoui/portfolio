import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import React from "react";
import { FormProvider } from "react-hook-form";
import { ClassicLoginBodyType } from "../types";
import useLoginForm from "./useLoginForm";

interface ILoginForm extends IBasicForm<ClassicLoginBodyType> {}

const LoginForm: React.FC<ILoginForm> = ({ onSubmit, loading }) => {
  const { formMethods, handleSubmit } = useLoginForm({ onSubmit });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit} className="unified-form-container w-full">
        {/* Form Header */}
        <div className="text-center pb-6 border-b border-neutral-200 dark:border-neutral-700 mb-6">
          <Icons.User className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
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
              placeholder="Enter your password"
              autoComplete="current-password"
              type="password"
              size="lg"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
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
                Signing In...
              </>
            ) : (
              <>
                <Icons.CheckCircle className="w-4 h-4" />
                Sign In
              </>
            )}
          </Button>

          {/* Additional Actions */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Form Help */}
        <div className="unified-form-help">
          <Icons.InformationCircle className="w-5 h-5 text-info-500 flex-shrink-0" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">Sign In Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use the email address associated with your account</li>
              <li>
                Password is case-sensitive and must be at least 8 characters
              </li>
              <li>
                Contact support if you're having trouble accessing your account
              </li>
            </ul>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
