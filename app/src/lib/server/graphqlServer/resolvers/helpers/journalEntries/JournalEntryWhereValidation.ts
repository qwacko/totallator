import { z } from 'zod';

import { AccountGroupingWhereValidation } from '../accountGrouping/AccountGroupingWhereValidation';
import { AccountWhereValidation } from '../accounts/AccountWhereValidation';
import { BillWhereValidation } from '../bills/BillWhereValidation';
import { BudgetWhereValidation } from '../budgets/BudgetWhereValidation';
import { CategoryWhereValidation } from '../categories/CategoryWhereValidation';
import { TagWhereValidation } from '../tags/TagWhereValidation';
import { BooleanFilterValidation } from '../validation/BooleanFilterValidation';
import { DateFilterValidation } from '../validation/DateFilterValidation';
import { NumberFilterValidation } from '../validation/NumberFilterValidation';
import { StringFilterValidation } from '../validation/StringFilterValidation';
import { UUIDFilterValidation } from '../validation/UUIDFilterValidation';

//LATER Consider if it is worth considering how to have self-referencing queries for the Journal References

export const JournalEntryWhereValidationWithoutPrimary = {
	id: UUIDFilterValidation.optional(),
	description: StringFilterValidation.optional(),
	linked: BooleanFilterValidation.optional(),
	reconciled: BooleanFilterValidation.optional(),
	dataChecked: BooleanFilterValidation.optional(),
	complete: BooleanFilterValidation.optional(),
	accountGroupingId: UUIDFilterValidation.optional(),
	accountId: UUIDFilterValidation.optional(),
	primaryJournalId: UUIDFilterValidation.optional(),
	date: DateFilterValidation.optional(),
	createdAt: DateFilterValidation.optional(),
	updatedAt: DateFilterValidation.optional(),
	amount: NumberFilterValidation.optional(),
	account: AccountWhereValidation.optional(),
	accountGrouping: AccountGroupingWhereValidation.optional(),
	bill: BillWhereValidation.optional(),
	budget: BudgetWhereValidation.optional(),
	category: CategoryWhereValidation.optional(),
	tag: TagWhereValidation.optional()
};

export const JournalEntriesWhereValidation = z.object({
	some: z.object(JournalEntryWhereValidationWithoutPrimary).optional(),
	none: z.object(JournalEntryWhereValidationWithoutPrimary).optional(),
	every: z.object(JournalEntryWhereValidationWithoutPrimary).optional()
});

export const JournalEntryWhereValidationWithoutPrimaryWithJournalEntries = {
	...JournalEntryWhereValidationWithoutPrimary,
	journalEntries: JournalEntriesWhereValidation.optional()
};

export const JournalEntryWhereValidation = z
	.object({
		AND: z
			.array(
				z.object({
					...JournalEntryWhereValidationWithoutPrimary,
					primaryJournal: z
						.object(JournalEntryWhereValidationWithoutPrimaryWithJournalEntries)
						.optional()
				})
			)
			.optional(),
		OR: z
			.array(
				z.object({
					...JournalEntryWhereValidationWithoutPrimary,
					primaryJournal: z
						.object(JournalEntryWhereValidationWithoutPrimaryWithJournalEntries)
						.optional()
				})
			)
			.optional(),
		...JournalEntryWhereValidationWithoutPrimary,
		primaryJournal: z.object(JournalEntryWhereValidationWithoutPrimaryWithJournalEntries).optional()
	})
	.strict();
