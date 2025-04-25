import { useAuth } from "@/contexts/auth";
import AddScoreDialog from "@/modules/leaderboard/add-score/dialog";
import SelectGameChannels from "@/modules/leaderboard/components/SelectGame";
import { LeaderboardTable } from "@/modules/leaderboard/table";
import { LeaderboardItem } from "@/modules/leaderboard/types";
import useWsFetch from "@/socket-client/use-ws-fetch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/leaderboard/")({
  component: LeaderboardIndex,
});

type ScoreSubmitRequest = {
  game: string;
  start?: number;
  end?: number;
};

type ScoreResponse = {
  result: LeaderboardItem[];
  totalCount: number;
};

function LeaderboardIndex() {
  const [game, setGame] = useState("all");
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const calcPagination = () => {
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    return { start, end };
  };
  const [pagination, setPagination] = useState(calcPagination);

  const { data } = useWsFetch<ScoreSubmitRequest, ScoreResponse>({
    url: "/scores",
    payload: { game, ...calcPagination() },
    deps: [pagination.start, pagination.end, limit, game],
  });

  const { data: receivedScore } = useWsFetch<
    string,
    { result: LeaderboardItem }
  >({
    url: "/my-score",
  });

  const { userData } = useAuth();
  return (
    <div className="flex flex-col gap-3 my-3 min-w-3xl">
      <div className="flex gap-2">
        <SelectGameChannels
          onChange={(value) => setGame(value)}
          defaultValue={game}
        />
        <AddScoreDialog />
      </div>
      {data && (
        <LeaderboardTable
          data={data.result}
          totalPages={Math.ceil(data.totalCount / limit)}
          userTopRank={receivedScore?.result}
          userData={{ userId: userData?.id }}
          currentPage={page}
          onUpdatePage={(page) => {
            setPage(page);
            const start = (page - 1) * limit;
            const end = start + limit - 1;
            setPagination({
              start,
              end,
            });
          }}
          onPageSizeChange={(newLimit) => {
            setLimit(newLimit);
          }}
        />
      )}
    </div>
  );
}
