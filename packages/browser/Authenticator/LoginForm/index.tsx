import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import React from "react";
import { FormProvider } from "react-hook-form";
import { ClassicLoginBodyType } from "../types";
import useLoginForm from "./useLoginForm";

interface ILoginForm extends IBasicForm<ClassicLoginBodyType> {}

const LoginForm: React.FC<ILoginForm> = ({ onSubmit, loading }) => {
  const { formMethods, handleSubmit } = useLoginForm({ onSubmit });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 dark:bg-slate-800 p-6 shadow-lg rounded"
      >
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
                  message: "Password must be at least 8 characters long",
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
