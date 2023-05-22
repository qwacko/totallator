import { z } from 'zod';

export const seedAccountGroupingInputValidation = z
	.object({
		accountGroupingId: z.string().cuid(),
		transactionCount: z.number().int().optional().default(0),
		includeBusiness: z.boolean(),
		includePersonal: z.boolean(),
		seedAsSample: z.boolean(),
		numberYears: z.number().int().optional().default(5),
		includeAccounts: z.boolean()
	})
	.refine((data) => data.includeBusiness || data.includePersonal, {
		path: ['includePersonal'],
		message: 'Must select one of personal or business'
	})
	.refine((data) => data.transactionCount === 0 || data.includeAccounts, {
		path: ['includeAccounts'],
		message: 'Must select if generating transactions'
	});

export const seedAccountGroupingValidation = seedAccountGroupingInputValidation.transform(
	(data) => ({
		...data,
		hasBoth: data.includeBusiness && data.includePersonal,
		transactionCountEach:
			data.includeBusiness && data.includePersonal
				? Math.floor(data.transactionCount / 2)
				: data.transactionCount
	})
);

export type SeedAccountGroupingValidationType = z.infer<typeof seedAccountGroupingValidation>;

export type SeedAcconutGroupingInputValidationType = z.input<
	typeof seedAccountGroupingInputValidation
>;
