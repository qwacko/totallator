import { z } from "zod";

import { updateTagDataValidation } from "../tag/updateTagValidation";

export const updateCategoryDataValidation = updateTagDataValidation;

export type updateCategoryDataValidationType = z.infer<
  typeof updateTagDataValidation
>;

export const updateCategoryValidation = z.object({
  id: z.string().cuid(),
  data: updateTagDataValidation
});

export type updateCategoryValidationType = z.infer<
  typeof updateCategoryValidation
>;
