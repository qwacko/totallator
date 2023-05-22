import { z } from 'zod';

import { PrismaStatusEnumValidation } from 'src/utils/validation/PrismaStatusEnumValidation';

import { PrismaAccountTypeEnumValidation } from '../PrismaAccountTypeEnumValidation';

const updateAccountDataValidation = z
	.object({
		title: z.string().min(2).optional(),
		accountGroup: z.string().min(2).nullable().optional(),
		accountGroup2: z.string().min(2).nullable().optional(),
		accountGroup3: z.string().min(2).nullable().optional(),
		accountGroupCombined: z.string().nullable().optional(),
		isCash: z.boolean().default(true).optional(),
		isNetWorth: z.boolean().default(true).optional(),
		startDate: z.date().nullable().optional(),
		endDate: z.date().nullable().optional(),
		type: PrismaAccountTypeEnumValidation.optional(),
		status: PrismaStatusEnumValidation.optional()
	})
	.refine(
		(args) => {
			if (
				args.accountGroupCombined &&
				(args.accountGroup || args.accountGroup2 || args.accountGroup3)
			)
				return false;
			return true;
		},
		{
			message: 'Cannot set accountGroupCombined and account group options',
			path: ['accountGroupCombined']
		}
	);

export type updateAccountDataValidationType = z.infer<typeof updateAccountDataValidation>;

export const updateAccountValidation = z.object({
	id: z.string().cuid(),
	data: updateAccountDataValidation
});
