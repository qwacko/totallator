import { z } from "zod";

const PrismaAccountTypeEnum = [
  "Income",
  "Expense",
  "Asset",
  "Liability"
] as const;

export const PrismaAccountTypeEnumWritable = [...PrismaAccountTypeEnum];

export const PrismaAccountTypeEnumValidation = z.enum(PrismaAccountTypeEnum);

export type PrismaAccountTypeEnumType =
  | "Income"
  | "Expense"
  | "Asset"
  | "Liability";
