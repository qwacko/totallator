import { z } from "zod";

export const PrismaStatusEnumValidation = z.enum([
  "Active",
  "Disabled",
  "Deleted"
]);
