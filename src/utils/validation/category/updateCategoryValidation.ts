import { z } from "zod";

import { updateTagDataValidation } from "../tag/updateTagValidation";

const updateCategoryDataValidation = updateTagDataValidation;

export type updateCategoryDataValidationType = z.infer<
  typeof updateCategoryDataValidation
>;

export const updateCategoryValidation = z.object({
  id: z.string().cuid(),
  data: updateCategoryDataValidation
});
