import { useMutation } from "@tanstack/react-query";
import { FormValues } from "./schema";
import { AppResponse, AppResponseFail } from "@/types";
import { SignupSuccess } from "./types";
import { POST } from "@/api-client/helpers";
import API from "@/api-client";

export const SignupMutKey = "Signup";
const defaultSubmit = async (variables: FormValues) => {
  const response = await API.post<AppResponse<SignupSuccess>>(
    POST("/auth/signup"),
    variables
  );
  return response.data;
};

export default function useSignup({
  onSubmit,
}: {
  onSubmit?: (formValues: FormValues) => Promise<void | any>;
} = {}) {
  const mutation = useMutation<
    AppResponse<SignupSuccess>,
    AppResponseFail,
    FormValues
  >({
    mutationKey: [SignupMutKey],
    mutationFn: (data: FormValues) => onSubmit?.(data) ?? defaultSubmit(data),
  });

  return mutation;
}
