import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  error?: React.ReactNode;
  className?: string
} & ComponentProps<"input">;

export default function InputTextField<T extends FieldValues>({
  control,
  name,
  label,
  error,
  className = "",
  ...props
}: Props<T>) {
  const controller = useController({ control, name });
  const { field } = controller;
  return (
    <div className={"flex flex-col justify-center items-start"}>
      <Label className="mb-2" htmlFor={name}>{label}</Label>
      <Input {...field} {...props} className={cn(className)} />
      {error && <div className="mb-3">
        {error}
      </div>}
    </div>
  );
}
