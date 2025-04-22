import useGetGamesQuery from "@/hooks/use-get-games-query";
import InputSelectField from "./input-select";
import { Control, Path } from "react-hook-form";

type Props = {
  control: Control<
    { score: number; gameChannel: string },
    unknown,
    { score: number; gameChannel: string }
  >;
  name: Path<{ score: number; gameChannel: string }>;
};

export default function InputSelectGames(props: Props) {
  const { data, error } = useGetGamesQuery({ excludeGame: "all" });

  if (error) {
    return <p>Error occured getting games</p>;
  }

  return (
    <InputSelectField
      {...props}
      label="Select Games"
      className="!text-white"
      options={
        data?.data?.map((item) => ({
          label: item.label,
          value: item.value,
        })) || []
      }
    />
  );
}
