import { z } from 'zod';

import { AccountGroupingWhereValidation } from '../accountGrouping/AccountGroupingWhereValidation';
import { BooleanFilterValidation } from '../validation/BooleanFilterValidation';
import { StatusFilterValidation } from '../validation/StatusFilterValidation';
import { StringFilterValidation } from '../validation/StringFilterValidation';
import { UUIDFilterValidation } from '../validation/UUIDFilterValidation';

export const BillWhereValidation = z
	.object({
		id: UUIDFilterValidation.optional(),
		title: StringFilterValidation.optional(),
		deleted: BooleanFilterValidation.optional(),
		active: BooleanFilterValidation.optional(),
		disabled: BooleanFilterValidation.optional(),
		allowUpdate: BooleanFilterValidation.optional(),
		accountGroupingId: UUIDFilterValidation.optional(),
		accountGrouping: AccountGroupingWhereValidation.optional(),
		status: StatusFilterValidation.optional()
	})
	.strict();
