import SelectGameChannels from "@/modules/leaderboard/components/SelectGame";
import { LeaderboardItem } from "@/modules/leaderboard/types";
import useWebSocket from "@/socket-client/use-ws";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

import * as uuidv4 from "uuid";

export const Route = createFileRoute("/leaderboard/")({
  component: LeaderboardIndex,
  beforeLoad: async ({ context }) => {
    const userData = await context.verifyAuth();
    if (!userData.success) {
      throw redirect({ to: "/" });
    }
  },
});

function LeaderboardIndex() {
  const { data, sendMessage } = useWebSocket<
    { game: string },
    { result: LeaderboardItem[] }
  >({ url: "/scores" });

  useEffect(() => {
    let timeoutRef = null;
    timeoutRef = setTimeout(() => {
      sendMessage({ game: "all" });
    }, 500);

    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, []);

  return (
    <div className="flex gap-3">
      {/* <Button
        onClick={() => {
          sendMessage({ game });
        }}
      >
        Get Leaderboard
      </Button> */}
      <SelectGameChannels
        onChange={(value) => {
          console.log("got value", value);
          sendMessage({ game: value });
        }}
      />
      {data &&
        data.result.map((item, index) => (
          <div
            key={uuidv4.v4()}
            className="flex flex-col justify-center items-start gap-2"
          >
            <span>{index + 1}</span>
            <span>{item.score}</span>
            <span>{item.player}</span>
            <span>{item.game}</span>
            <span>{item.date as string}</span>
          </div>
        ))}
    </div>
  );
}
