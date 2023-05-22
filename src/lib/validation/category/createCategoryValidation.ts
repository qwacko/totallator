import type { z } from 'zod';

import { createTagValidation } from '../tag/createTagValidation';

export const createCategoryValidation = createTagValidation;

export type createCategoryValidationType = z.infer<typeof createCategoryValidation>;
