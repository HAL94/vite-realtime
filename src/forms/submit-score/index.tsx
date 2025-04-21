import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, submitFormSchema } from "./schema";
import InputTextField from "../fields/input-text";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit?: (formValues: FormValues) => void | Promise<void>;
  onSuccess?: () => void;
};

export default function SubmitScoreForm({
  onSubmit,
  onSuccess,
  children,
}: React.PropsWithChildren<Props>) {
  const form = useForm({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      score: undefined,
    },
    mode: "onBlur",
  });

  const onHandleSubmit = async (data: FormValues) => {    
    if (onSubmit) {
      await onSubmit(data);
      return;
    }

    onSuccess?.();
  };

  const { errors } = form.formState;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onHandleSubmit)}>
        <InputTextField
          control={form.control}
          name="score"
          label={"Score"}
          error={
            <>
              {errors.score && (
                <div className="text-red-500">{errors.score.message}</div>
              )}
            </>
          }
        />

        {children ? children : <Button>Add your score</Button>}
      </form>
    </FormProvider>
  );
}
