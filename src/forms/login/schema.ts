import * as z from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required", message: "Email is required" }),
  password: z.string({ required_error: "Password is required"}).min(8, "Password must be 8 characters long")
});

export type FormValues = z.infer<typeof loginSchema>;
