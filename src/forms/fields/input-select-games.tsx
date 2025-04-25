import useGetGamesQuery from "@/hooks/use-get-games-query";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  className?: string;
  description?: string;
};

export default function InputSelectGames<TFieldValues extends FieldValues>(
  props: Props<TFieldValues>
) {
  const { data, error } = useGetGamesQuery({ excludeGame: "all" });
  if (error) {
    return <p className="text-red-400">Error occured getting games</p>;
  }
  const { description, className } = props;

  return (
    <div className={"flex flex-col justify-center items-start"}>
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={className}>
                    <SelectValue placeholder={props.label} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
