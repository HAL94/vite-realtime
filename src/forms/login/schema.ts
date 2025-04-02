import * as z from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required", message: "Email is required" }),
  password: z.string({ required_error: "Password is required"}).min(6, "Password must be 6 characters long")
});

export type FormValues = z.infer<typeof loginSchema>;
