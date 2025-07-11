import { z } from "zod";

export const RegisterFormSchema = z.object({
  // id: z.string(),
  username: z.string().min(1, "Username is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
