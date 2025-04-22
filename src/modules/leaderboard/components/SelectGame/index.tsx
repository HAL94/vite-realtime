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
import useGetGamesQuery from "@/hooks/use-get-games-query";

export default function SelectGameChannels({
  onChange,
  defaultValue,
}: {
  onChange: (channel: Channel["value"]) => void;
  defaultValue?: string;
}) {
  const { data: response, error, isLoading } = useGetGamesQuery({ excludeGame: undefined });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Could not get list, got message: {error.message}</p>;

  if (typeof response !== "undefined" && response.success === false) {
    return <p>Could not get list</p>;
  }

  return (
    <Select
      onValueChange={(value) => onChange(value)}
      defaultValue={defaultValue}
    >
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
