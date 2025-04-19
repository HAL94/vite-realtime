import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SubmitScoreForm from "@/forms/submit-score";
import useWsFetch from "@/socket-client/use-ws-fetch";
import { cn } from "@/utils";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

type Props = {
  className?: string;
  triggerCn?: string;
};
export default function AddScoreDialog({
  className = "",
  triggerCn = "",
}: Props) {
  const { sendMessage: addScore } = useWsFetch<
    { gameChannel: string; score: number },
    string
  >({
    url: "/add-score",
    enabled: false,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn("", triggerCn)}>Add</AlertDialogTrigger>
      <AlertDialogContent className={cn("", className)}>
        <AlertDialogHeader>
          <AlertDialogTitle>Add your score</AlertDialogTitle>
          <AlertDialogDescription>
            Your glory shall not be lost!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <SubmitScoreForm
          onSubmit={(formValue) => {
            addScore({ gameChannel: "cod", score: formValue.score });
          }}
        />
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
