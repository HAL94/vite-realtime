import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export default function AddScoreDialogSubmitButton() {
  const { formState } = useFormContext();

  return (
    // <DialogClose
    //   className="text-white disabled:!cursor-not-allowed disabled:!bg-gray-200"
    //   disabled={!formState.isValid}
    //   type="submit"
    //   >
    <Button disabled={!formState.isValid} type="submit">Add/Update Score</Button>
    // </DialogClose>
  );
}
