import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormValues, submitFormSchema } from "./schema";
import InputTextField from "../fields/input-text";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputSelectGames from "../fields/input-select-games";

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
      gameChannel: undefined
    },
    mode: "onChange",
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onHandleSubmit)}
        className="gap-4 flex flex-col"
      >
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
        <InputSelectGames control={form.control} name="gameChannel" />

        {children ? children : <Button>Add your score</Button>}
      </form>
    </Form>
  );
}
