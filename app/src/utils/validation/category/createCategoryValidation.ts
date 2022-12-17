import type { z } from "zod";
import {
  createTagValidation,
  createTagValidationWithoutAG,
} from "../tag/createTagValidation";

export const createCategoryValidationWithoutAG = createTagValidationWithoutAG;
export const createCategoryValidation = createTagValidation;

export type createCategoryValidationType = z.infer<
  typeof createCategoryValidation
>;
