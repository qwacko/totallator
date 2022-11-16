import { z } from "zod";
import { currencyFormatValidation } from "./currencyFormats";
import { dbDateFormatValidation } from "./dateFormats";

export const createUserValidation = z
  .object({
    username: z.string().min(4),
    name: z.string().min(2),
    password: z
      .string()
      .min(8)
      .regex(/.*[A-Z].*[A-Z].*/, { message: "Required 2 Uppercase Characters" })
      .regex(/.*[!@#$&*].*/, {
        message: "Requires 1 special character (!@#$&*)",
      })
      .regex(/.*[0-9].*[0-9].*/, { message: "Requires 2 numbers" }),
    checkPassword: z
      .string()
      .min(8)
      .regex(/.*[A-Z].*[A-Z].*/, { message: "Required 2 Uppercase Characters" })
      .regex(/.*[!@#$&*].*/, {
        message: "Requires 1 special character (!@#$&*)",
      })
      .regex(/.*[0-9].*[0-9].*/, { message: "Requires 2 numbers" }),
    darkMode: z.boolean().default(false),
    firstMonthFY: z.number().int().max(12).min(1).default(1),
    dateFormat: dbDateFormatValidation.default("YYYYMMDD"),
    currencyFormat: currencyFormatValidation.default("USD"),
  })
  .refine((args) => args.password === args.checkPassword, {
    message: "Passwords Must Match",
    path: ["checkPassword"],
  });

export type CreateUserValidationType = z.infer<typeof createUserValidation>;
