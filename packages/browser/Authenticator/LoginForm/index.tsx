import React from "react";
import { FormProvider } from "react-hook-form";
import { Input, Button, IBasicForm } from "@nizar-repo/ui";
import { ClassicLoginBodyType } from "../types";

interface ILoginForm extends IBasicForm<ClassicLoginBodyType> {}

const LoginForm: React.FC<ILoginForm> = ({
  formMethods,
  onSubmit,
  loading,
}) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="bg-slate-200 p-6 shadow-lg">
        <div className="grid gap-6 mb-6">
          <div>
            <Input
              control={formMethods.control}
              name="email"
              defaultValue=""
              displayName="Email"
              label="Email"
              placeholder="Your email"
              autoComplete="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
            />
          </div>

          <div>
            <Input
              control={formMethods.control}
              name="password"
              defaultValue=""
              displayName="Password"
              label="Password"
              placeholder="Your password"
              autoComplete="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters",
                },
              }}
              type="password"
            />
          </div>
        </div>

        <Button className="shadow-lg" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
