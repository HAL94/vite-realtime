import SubmitScoreForm from "@/forms/submit-score";
import useWsFetch from "@/socket-client/use-ws-fetch";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AddScoreDialog() {
  const { sendMessage: addScore } = useWsFetch<
    { gameChannel: string; score: number },
    string
  >({
    url: "/add-score",
    enabled: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white">
          Add Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add/Update your score</DialogTitle>
          <DialogDescription>
            Make your score in Call of Duty game. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <SubmitScoreForm
          onSubmit={(formValue) => {
            addScore({ gameChannel: "cod", score: formValue.score });            
            // console.log("close button", document.querySelector("[data-slot]='dialog-close'"))
          }}
        >
          <DialogClose className="text-white">
            <Button type="submit">Add Score</Button>
          </DialogClose>
        </SubmitScoreForm>
      </DialogContent>
    </Dialog>
  );
}
