import SelectGameChannels from "@/modules/leaderboard/components/SelectGame";
import { LeaderboardItem } from "@/modules/leaderboard/types";
import useWsFetch from "@/socket-client/use-ws-fetch";
import { createFileRoute, redirect } from "@tanstack/react-router";
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

type ScoreSubmitRequest = {
  game: string;
};

type ScoreResponse = {
  result: LeaderboardItem[];
};

function LeaderboardIndex() {
  const { sendMessage, data } = useWsFetch<ScoreSubmitRequest, ScoreResponse>({
    url: "/scores",
    payload: { game: "all" },
  });

  return (
    <div className="flex gap-3">
      <SelectGameChannels
        onChange={(value) => {
          sendMessage({ game: value });
        }}
        defaultValue={"all"}
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
