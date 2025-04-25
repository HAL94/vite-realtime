import { useMutation } from "@tanstack/react-query";
import API from "@/api-client";
import { POST } from "@/api-client/helpers";
import { FormValues } from "./schema";
import { AppResponse, AppResponseFail } from "@/types";
import { LoginSuccess } from "./types";


export const LoginMutKey = "Login";
const defaultSubmit = async (variables: FormValues) => {
  const response = await API.post<AppResponse<LoginSuccess>>(
    POST("/auth/login"),
    variables
  );
  return response.data;
};

export default function useLogin({
  onSubmit,
}: {
  onSubmit?: (formValues: FormValues) => Promise<any> | void;
} = {}) {
  const { mutateAsync, isPending, data, isSuccess, error } = useMutation<
    AppResponse<LoginSuccess>,
    AppResponseFail,
    FormValues
  >({
    mutationKey: [LoginMutKey],
    mutationFn: (data: FormValues) => onSubmit?.(data) ?? defaultSubmit(data),
  });

  return {
    mutate: mutateAsync,
    loading: isPending,
    error: error?.message,
    data,
    success: isSuccess,
  };
}
