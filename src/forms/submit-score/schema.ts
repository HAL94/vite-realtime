import * as z from "zod";

export const submitFormSchema = z.object({
  score: z.coerce
    .number({
      coerce: true,
      message: "Expected value is a number",
    })
    .nonnegative("Cannot have negative numbers")
    .min(1, { message: "Score field must be 1 or greater" }),
});

export type FormValues = z.infer<typeof submitFormSchema>;
