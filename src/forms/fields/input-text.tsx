import React, { ComponentProps } from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  useFormContext,
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
  const form = useFormContext();
  const { clearErrors } = form;
  const controller = useController({ control, name });
  const { field } = controller;
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input {...field} {...props} onFocus={() => clearErrors(name)} />
      {error}
    </div>
  );
}
