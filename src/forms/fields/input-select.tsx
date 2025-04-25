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

import { Control, FieldValues, Path } from "react-hook-form";
import { SelectOption } from "../types";

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  className?: string;
  description?: string;
  options: SelectOption[];
};

export default function InputSelectField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  className,
}: Props<T>) {
  return (
    <div className={"flex flex-col justify-center items-start"}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={className}
                    iconClassName={className}
                  >
                    <SelectValue placeholder={label} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((item) => (
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
