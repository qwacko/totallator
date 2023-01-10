import { z } from "zod";
import { PrismaStatusEnumValidation } from "./PrismaStatusEnumValidation";

export const statusReturnValidation = z.object({
  status: PrismaStatusEnumValidation,
  deleted: z.boolean(),
  active: z.boolean(),
  disabled: z.boolean(),
  allowUpdate: z.boolean(),
});
export const createdUpdatedValidation = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const accountGroupingIdValidation = z.object({
  accountGroupingId: z.string().cuid(),
});

export const journalCountValidation = z.object({
  _count: z.object({ journalEntries: z.number() }),
});

export const userIsAdminValidation = z.object({ userIsAdmin: z.boolean() });
