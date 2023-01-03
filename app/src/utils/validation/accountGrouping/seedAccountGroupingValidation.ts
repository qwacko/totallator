import { z } from "zod";

export const seedAccountGroupingInputValidation = z
  .object({
    accountGroupingId: z.string().cuid(),
    transactionCount: z.number().int().optional().default(0),
    includeBusiness: z.boolean(),
    includePersonal: z.boolean(),
    seedAsSample: z.boolean(),
    numberYears: z.number().int().optional().default(5),
  })
  .refine((data) => data.includeBusiness || data.includePersonal, {
    path: ["includePersonal"],
    message: "Must select one of personal or business",
  });

export const seedAccountGroupingValidation =
  seedAccountGroupingInputValidation.transform((data) => ({
    ...data,
    hasBoth: data.includeBusiness && data.includePersonal,
    transactionCountEach:
      data.includeBusiness && data.includePersonal
        ? Math.floor(data.transactionCount / 2)
        : data.transactionCount,
  }));

export type SeedAccountGroupingValidationType = z.infer<
  typeof seedAccountGroupingValidation
>;

export type SeedAcconutGroupingInputValidationType = z.input<
  typeof seedAccountGroupingInputValidation
>;
