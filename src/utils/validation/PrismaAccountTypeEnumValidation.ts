import { z } from "zod";

export const PrismaAccountTypeEnumValidation = z.enum([
  "Income",
  "Expense",
  "Asset",
  "Liability"
]);
