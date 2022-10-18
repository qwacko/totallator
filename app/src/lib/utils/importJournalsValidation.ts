import { parse } from 'date-fns';
import { z } from 'zod';

const booleanOptions = ['TRUE', 'True', 'true', '1', 'FALSE', 'False', 'false', '0'] as const;

const booleanImportValidation = z
	.string()
	.max(0, { message: `String must be empty or one of ${booleanOptions.join(', ')}` })
	.or(z.enum(booleanOptions))
	.or(z.boolean().transform((arg) => (arg ? 'True' : 'False')))
	.transform((arg) => {
		if (arg in ['TRUE', 'True', 'true', '1']) return true;
		else return false;
	});

const validateUUIDMaybeBlank = z.string().trim().uuid().or(z.string().max(0));

export const importJournalsValidation = z
	.array(
		z
			.object({
				primaryJournalId: z.string(),
				accountGroupingId: z.string().optional(),
				id: validateUUIDMaybeBlank.optional(),
				date: z
					.string()
					.regex(new RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'), {
						message: 'Date must be of format YYYY-MM-DD'
					})
					.refine(
						(arg) => {
							const newDate = parse(arg, 'yyyy-MM-dd', new Date());
							if (isNaN(newDate.valueOf())) {
								return false;
							}

							return true;
						},
						{ message: 'Date Must Be Valid' }
					),
				description: z.string().min(1, { message: 'Description cannot be empty' }),
				primary: booleanImportValidation.optional(),
				linked: booleanImportValidation.optional(),
				reconciled: booleanImportValidation.optional(),
				dataChecked: booleanImportValidation.optional(),
				complete: booleanImportValidation.optional(),
				amount: z.preprocess((a) => parseFloat(String(a)), z.number()),
				accountTitle: z.string().optional(),
				accountId: validateUUIDMaybeBlank.optional(),
				tagTitle: z.string().optional(),
				tagId: validateUUIDMaybeBlank.optional(),
				categoryTitle: z.string().optional(),
				categoryId: validateUUIDMaybeBlank.optional(),
				billTitle: z.string().optional(),
				billId: validateUUIDMaybeBlank.optional(),
				budgetTitle: z.string().optional(),
				budgetId: validateUUIDMaybeBlank.optional(),
				createdAt: z
					.string()
					.regex(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
					.transform((item) => new Date(item))
					.or(z.date())
					.optional(),
				updatedAt: z
					.string()
					.regex(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
					.transform((item) => new Date(item))
					.or(z.date())
					.optional()
			})
			.strict()
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
