import SubmitScoreForm from "@/forms/submit-score";
import useWsFetch from "@/socket-client/use-ws-fetch";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddScoreDialogSubmitButton from "./dialog-submit-button";
// import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { delay } from "@/lib/utils";

export default function AddScoreDialog() {
  const { sendMessage: addScore, data } = useWsFetch<
    { gameChannel: string; score: number },
    { error: string }
  >({
    url: "/add-score",
    enabled: false,
  });
  const [showError, setShowError] = useState<boolean>(true);

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
          onSubmit={async (formValue) => {
            console.log({ data: formValue });

            setShowError(false);

            addScore({
              gameChannel: formValue.gameChannel,
              score: formValue.score,
            });

            await delay(300)

            setShowError(true);
          }}
        >
          <AddScoreDialogSubmitButton />
          {data?.error && showError && (
            <Label className="text-red-500">{data?.error}</Label>
          )}
        </SubmitScoreForm>
      </DialogContent>
    </Dialog>
  );
}
