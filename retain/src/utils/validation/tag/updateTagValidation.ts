import { z } from 'zod';

import { PrismaStatusEnumValidation } from 'src/utils/validation/PrismaStatusEnumValidation';

export const updateTagDataValidation = z
	.object({
		group: z.string().min(2).optional(),
		single: z.string().min(2).optional(),
		title: z
			.string()
			.min(2)
			.regex(/^.{2,}\/.{2,}$/, {
				message: 'Must be of format (group)/(single)'
			})
			.optional(),
		status: PrismaStatusEnumValidation.optional()
	})
	.refine(
		(arg) => {
			if (arg.group || arg.single) {
				if (arg.title) {
					return false;
				}
			}
			return true;
		},
		{
			message: 'Only one of title or group / single can be used',
			path: ['title']
		}
	);

export type updateTagDataValidationType = z.infer<typeof updateTagDataValidation>;

export const updateTagValidation = z.object({
	id: z.string().cuid(),
	data: updateTagDataValidation
});
