import { useAuth } from "@/contexts/auth";
import AddScoreDialog from "@/modules/leaderboard/add-score/dialog";
import SelectGameChannels from "@/modules/leaderboard/components/SelectGame";
import { LeaderboardTable } from "@/modules/leaderboard/table";
import { LeaderboardItem } from "@/modules/leaderboard/types";
import useWsFetch from "@/socket-client/use-ws-fetch";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard/")({
  component: LeaderboardIndex,
  beforeLoad: async ({ context }) => {
    const userData = await context.verifyAuth();
    console.log({ userData })
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

  const { data: receivedScore } = useWsFetch<
    string,
    { result: LeaderboardItem }
  >({
    url: "/my-score",
    enabled: true,
  });

  const { userData } = useAuth()

  console.log({ leaderboard: data })

  return (
    <div className="flex flex-col gap-3 my-3 min-w-3xl">
      <div className="flex gap-2">
        <SelectGameChannels
          onChange={(value) => {
            sendMessage({ game: value });
          }}
          defaultValue={"all"}
        />
        <AddScoreDialog />
      </div>
      {data && (
        <LeaderboardTable
          data={data.result}
          userTopRank={receivedScore?.result}
          userData={{ userId: userData?.id }}
        />
      )}
    </div>
  );
}
