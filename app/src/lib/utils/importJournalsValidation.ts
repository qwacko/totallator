import { z } from 'zod';
import { validateDate } from './importValidation/validateDate';
import { validateISOTime } from './importValidation/validateISOTime';
import {
	validateUUIDMaybeBlank,
	booleanImportValidation
} from './importValidation/validateUUIDMaybeBlank';

export const importJournalsValidation = z
	.array(
		z
			.object({
				primaryJournalId: z.string(),
				accountGroupingId: z.string().optional(),
				id: validateUUIDMaybeBlank,
				date: validateDate,
				description: z.string().min(1, { message: 'Description cannot be empty' }),
				primary: booleanImportValidation.optional(),
				linked: booleanImportValidation.optional(),
				reconciled: booleanImportValidation.optional(),
				dataChecked: booleanImportValidation.optional(),
				complete: booleanImportValidation.optional(),
				amount: z.preprocess((a) => parseFloat(String(a)), z.number()),
				accountTitle: z.string().optional(),
				accountId: z.string().optional(),
				tagTitle: z
					.string()
					.regex(/.*\/.*/, { message: 'Must Have a /' })
					.optional(),
				tagId: z.string().optional(),
				categoryTitle: z
					.string()
					.regex(/.*\/.*/, { message: 'Must Have a /' })
					.optional(),
				categoryId: z.string().optional(),
				billTitle: z.string().optional(),
				billId: z.string().optional(),
				budgetTitle: z.string().optional(),
				budgetId: z.string().optional(),
				createdAt: validateISOTime.optional(),
				updatedAt: validateISOTime.optional()
			})
			.refine((item) => item.accountId || item.accountTitle, {
				message: 'Row Must Have an account name or account id'
			})
			.transform((item) => {
				if (item.accountId && item.accountTitle) delete item.accountTitle;
				if (item.categoryId && item.categoryTitle) delete item.categoryTitle;
				if (item.billId && item.billTitle) delete item.billTitle;
				if (item.budgetId && item.budgetTitle) delete item.budgetTitle;
				if (item.tagId && item.tagTitle) delete item.tagTitle;
				return item;
			})
	)
	.superRefine((arg, ctx) => {
		arg.forEach((row, rowId) => {
			// Check that transaction total is zero.
			const rowTotal = arg
				.filter((item) => item.primaryJournalId === row.primaryJournalId)
				.reduce((prev, current) => prev + current.amount, 0);
			if (rowTotal !== 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: [...ctx.path, `${rowId}`],
					message: `Transaction ${row.primaryJournalId} has a non-zero sum of all journals ($${rowTotal})`
				});
			}
		});
	});

export type importJournalsValidationReturnType = z.infer<typeof importJournalsValidation>;
