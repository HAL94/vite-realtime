import { useMutation } from "@tanstack/react-query";
import API from "../../api-client";
import { POST } from "../../api-client/helpers";
import { FormValues } from "./schema";

export const LoginMutKey = "Login";
const defaultSubmit = (variables: FormValues) =>
  API.post(POST("/auth/login"), { ...variables });

export default function useLogin({
  onSubmit,
}: {
  onSubmit?: (formValues: FormValues) => Promise<any> | void;
}) {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: [LoginMutKey],
    mutationFn: (variables: FormValues) =>
      onSubmit?.(variables) ?? defaultSubmit(variables),
  });

  return {
    mutate,
    isLoading: isPending,
    isError,
    error,
    success: isSuccess,
  };
}
