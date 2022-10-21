import { z } from 'zod';

export const accountTypeEnumValidation = z.enum(['Income', 'Expense', 'Asset', 'Liability']);
