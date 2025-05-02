import * as z from "zod";

export const signupSchema = z.object({
  name: z.string({ required_error: "Name is required", message: "Name is required" }).min(3, "Minimum of three characters for your name"),
  email: z.string({ required_error: "Email is required", message: "Email is required" }),
  password: z.string({ required_error: "Password is required"}).min(6, "Password must be 6 characters long")
});

export type FormValues = z.infer<typeof signupSchema>;
