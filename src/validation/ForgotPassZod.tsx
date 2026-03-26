import { z } from "zod";

export const forgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: "emailIsRequired" })
    .email({ message: "invalidEmailAddress" }),
});

export type ForgotFormData = z.infer<typeof forgotSchema>;
