import { z } from 'zod';

import { BooleanFilterValidation } from '../validation/BooleanFilterValidation';
import { StringFilterValidation } from '../validation/StringFilterValidation';
import { UUIDFilterValidation } from '../validation/UUIDFilterValidation';

export const AccountGroupingWhereValidation = z
	.object({
		id: UUIDFilterValidation.optional(),
		title: StringFilterValidation.optional(),
		deleted: BooleanFilterValidation.optional(),
		active: BooleanFilterValidation.optional(),
		disabled: BooleanFilterValidation.optional()
	})
	.strict();
