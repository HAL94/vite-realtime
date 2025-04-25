import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, signupSchema } from "./schema";
import InputTextField from "../fields/input-text";
import { emailLabel, nameLabel, passwordLabel } from "./fields";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignupSuccess } from "./types";
import useSignup from "./hook";
import { AppResponse } from "@/types";

type Props = {
  onSubmit?: (formValues: FormValues) => void | Promise<void>;
  onSuccess: (data: AppResponse<SignupSuccess>) => void;
};

export default function SignupForm({ onSubmit, onSuccess }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
    },
    mode: "onBlur",
  });
  const {
    mutateAsync: signupUser,
    isPending: loading,
    error,
    isSuccess: success,
  } = useSignup();

  const onHandleSubmit = async (data: FormValues) => {
    if (onSubmit) {
      await onSubmit(data);
      return;
    }
    const result = await signupUser(data);
    if (result.success) {
      onSuccess(result);
    }
  };

  const { errors } = form.formState;

  return (
    <FormProvider {...form}>
      <Card className="min-w-lg">
        <CardHeader>
          <CardTitle>Login to leaderboards</CardTitle>
          <CardDescription>Keep track of your achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onHandleSubmit)}>
            <InputTextField
              name="name"
              control={form.control}
              label={nameLabel}
              error={
                <>
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </>
              }
            />
            <InputTextField
              name="email"
              control={form.control}
              label={emailLabel}
              error={
                <>
                  {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                  )}
                </>
              }
            />
            <InputTextField
              name="password"
              type="password"
              control={form.control}
              label={passwordLabel}
              error={
                <>
                  {errors.password && (
                    <div className="text-red-500">
                      {errors.password.message}
                    </div>
                  )}
                </>
              }
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
        <CardFooter>
          {loading && <p>loading...</p>}
          {error?.message && <p>{error.message}</p>}
          {success && <p>successfully logged in</p>}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
