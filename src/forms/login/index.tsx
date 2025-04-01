import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, loginSchema } from "./schema";
import InputTextField from "../fields/input-text";
import { emailLabel, passwordLabel } from "./fields";

type Props = {
  onSubmit?: (formValues: FormValues) => void | Promise<void>;
};

export default function LoginForm({ onSubmit }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    mode: "onBlur",
  });

  const onHandleSubmit = (data: FormValues) => {
    if (onSubmit) {
      onSubmit(data);
      return;
    }
  };

  const { errors } = form.formState;

  return (
    <FormProvider {...form}>
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
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </>
          }
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
