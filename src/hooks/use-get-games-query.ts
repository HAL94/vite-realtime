import API from "@/api-client";
import { GET } from "@/api-client/helpers";
import { Channel } from "@/modules/leaderboard/types";
import { AppResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const getGamesKey = "GetAllGames";
export default function useGetGamesQuery({
  excludeGame,
}: {
  excludeGame?: string;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: [getGamesKey, excludeGame],
    queryFn: async () => {
      const result: AxiosResponse<AppResponse<Channel[]>> = await API.get(
        GET("/games") + (typeof excludeGame === "string" ? `?excludeChannel=${excludeGame}` : "")
      );
      return result.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}
