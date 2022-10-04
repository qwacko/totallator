import { z } from 'zod';

import { AccountGroupingWhereValidation } from '../accountGrouping/AccountGroupingWhereValidation';
import { BooleanFilterValidation } from '../validation/BooleanFilterValidation';
import { DateFilterValidation } from '../validation/DateFilterValidation';
import { StatusFilterValidation } from '../validation/StatusFilterValidation';
import { StringFilterValidation } from '../validation/StringFilterValidation';
import { UUIDFilterValidation } from '../validation/UUIDFilterValidation';

export const AccountWhereValidation = z
	.object({
		id: UUIDFilterValidation.optional(),
		accountGroup: StringFilterValidation.optional(),
		accountGroup2: StringFilterValidation.optional(),
		accountGroup3: StringFilterValidation.optional(),
		title: StringFilterValidation.optional(),
		accountTitleCombined: StringFilterValidation.optional(),
		accountGroupCombined: StringFilterValidation.optional(),
		isCash: BooleanFilterValidation.optional(),
		isNetWorth: BooleanFilterValidation.optional(),
		deleted: BooleanFilterValidation.optional(),
		active: BooleanFilterValidation.optional(),
		disabled: BooleanFilterValidation.optional(),
		allowUpdate: BooleanFilterValidation.optional(),
		accountGroupingId: UUIDFilterValidation.optional(),
		startDate: DateFilterValidation.optional(),
		endDate: DateFilterValidation.optional(),
		type: z
			.object({
				in: z.array(z.enum(['Asset', 'Liability', 'Income', 'Expense'])).optional(),
				notIn: z.array(z.enum(['Asset', 'Liability', 'Income', 'Expense'])).optional(),
				equals: z.enum(['Asset', 'Liability', 'Income', 'Expense']).optional(),
				not: z.enum(['Asset', 'Liability', 'Income', 'Expense']).optional()
			})
			.optional(),
		accountGrouping: AccountGroupingWhereValidation.optional(),
		status: StatusFilterValidation.optional()
	})
	.strict();
