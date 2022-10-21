import { z } from 'zod';

export const statusEnumValidation = z.enum(['Active', 'Disabled', 'Deleted']);
