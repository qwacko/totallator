import { z } from "zod";

export const updatePasswordResolver = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/.*[A-Z].*[A-Z].*/, { message: "Required 2 Uppercase Characters" })
      .regex(/.*[!@#$&*].*/, {
        message: "Requires 1 special character (!@#$&*)"
      })
      .regex(/.*[0-9].*[0-9].*/, { message: "Requires 2 numbers" }),
    passwordCheck: z.string(),
    currentPassword: z.string()
  })
  .refine((args) => args.password === args.passwordCheck, {
    message: "Passwords Must Match",
    path: ["passwordCheck"]
  });
