import type { Prisma } from '@prisma/client';

import type { AccountSortValidation } from '$lib/validation/account/getAccountInputValidation';

export const accountSortToOrderBy = (
	input: AccountSortValidation
):
	| Prisma.Enumerable<Prisma.TransactionAccountOrderByWithRelationAndSearchRelevanceInput>
	| undefined => {
	if (!input) {
		return [{ title: 'desc' }, { createdAt: 'desc' }, { id: 'asc' }];
	}

	const returnData = input.map(
		(sort): Prisma.TransactionAccountOrderByWithRelationAndSearchRelevanceInput => {
			return { [sort.key]: sort.direction };
		}
	);

	return [...returnData, { id: 'asc' }];
};
