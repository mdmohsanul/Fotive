import {z} from "zod"

export const signupSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupData = z.infer<typeof signupSchema>;