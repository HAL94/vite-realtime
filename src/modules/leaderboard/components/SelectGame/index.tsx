import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Channel } from "../../types";
import { useQuery } from "@tanstack/react-query";
import API from "@/api-client";
import { GET } from "@/api-client/helpers";
import { AppResponse } from "@/types";
import { AxiosResponse } from "axios";

const getGamesKey = "GetAllGames";
export default function SelectGameChannels({
  onChange,
  defaultValue
}: {
  onChange: (channel: Channel["value"]) => void;
  defaultValue?: string
}) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: [getGamesKey],
    queryFn: async () => {
      const result: AxiosResponse<AppResponse<Channel[]>> = await API.get(
        GET("/games")
      );
      return result.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Could not get list, got message: {error.message}</p>;

  if (typeof response !== "undefined" && response.success === false) {
    return <p>Could not get list</p>;
  }

  return (
    <Select onValueChange={(value) => onChange(value)} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px] text-white">
        <SelectValue placeholder="Select Games" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose a Game</SelectLabel>
          {response?.data?.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
