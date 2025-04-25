import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, loginSchema } from "./schema";
import InputTextField from "../fields/input-text";
import { emailLabel, passwordLabel } from "./fields";
import useLogin from "./hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginSuccess } from "./types";

type Props = {
  onSubmit?: (formValues: FormValues) => void | Promise<void>;
  onSuccess: (data: LoginSuccess) => void;
};

export default function LoginForm({ onSubmit, onSuccess }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    mode: "onBlur",
  });
  const { mutate: loginUser, loading, error, success } = useLogin();

  const onHandleSubmit = async (data: FormValues) => {
    if (onSubmit) {
      await onSubmit(data);
      return;
    }
    const result = await loginUser(data);
    if (result.success) {
      onSuccess(result.data);
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
          {error && <p>{error}</p>}
          {success && <p>successfully logged in</p>}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
