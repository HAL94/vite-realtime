import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, loginSchema } from "./schema";
import InputTextField from "../fields/input-text";
import { emailLabel, passwordLabel } from "./fields";
import useLogin from "./hook";

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
  const { mutate: loginUser, loading, error, success } = useLogin();

  const onHandleSubmit = async (data: FormValues) => {
    if (onSubmit) {
      await onSubmit(data);
      return;
    }
    const result = await loginUser(data);
    console.log({ result })
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
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {success && <p>successfully logged in</p>}
    </FormProvider>
  )
}
