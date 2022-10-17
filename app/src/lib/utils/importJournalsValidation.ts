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
				transactionId: z.string(),
				journalId: validateUUIDMaybeBlank.optional(),
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
				budgetId: validateUUIDMaybeBlank.optional()
			})
			.strict()
			.refine((item) => item.accountId || item.accountTitle, {
				message: 'Row Must Have an account name or account id'
			})
			.refine((item) => !(item.accountId && item.accountTitle), {
				message: 'Row cannot have both account name and account id'
			})
			.refine((item) => !(item.tagId && item.tagTitle), {
				message: 'Row cannot have both tag name and tag id'
			})
			.refine((item) => !(item.categoryId && item.categoryTitle), {
				message: 'Row cannot have both category name and category id'
			})
			.refine((item) => !(item.billId && item.billTitle), {
				message: 'Row cannot have both bill name and bill id'
			})
			.refine((item) => !(item.budgetId && item.budgetTitle), {
				message: 'Row cannot have both budget name and budget id'
			})
	)
	.superRefine((arg, ctx) => {
		arg.forEach((row, rowId) => {
			// Check that transaction total is zero.
			const rowTotal = arg
				.filter((item) => item.transactionId === row.transactionId)
				.reduce((prev, current) => prev + current.amount, 0);
			if (rowTotal !== 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: [...ctx.path, `${rowId}`],
					message: `Transaction ${row.transactionId} has a non-zero sum of all journals ($${rowTotal})`
				});
			}
		});
	});

export type importJournalsValidationReturnType = z.infer<typeof importJournalsValidation>;
