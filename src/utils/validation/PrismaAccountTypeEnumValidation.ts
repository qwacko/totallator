import { z } from "zod";

export const PrismaAccountTypeEnumValidation = z.enum([
  "Income",
  "Expense",
  "Asset",
  "Liability"
]);

export type PrismaAccountTypeEnumType =
  | "Income"
  | "Expense"
  | "Asset"
  | "Liability";
