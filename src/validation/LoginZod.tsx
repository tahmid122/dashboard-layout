import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "emailIsRequired" })
    .email({ message: "invalidEmailAddress" }),

  password: z.string().min(1, { message: "passwordIsRequired" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
