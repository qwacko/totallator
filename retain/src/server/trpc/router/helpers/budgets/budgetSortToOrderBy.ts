import type { Prisma } from '@prisma/client';

import type { BudgetSortValidation } from 'src/utils/validation/budget/budgetSort';

export const budgetSortToOrderBy = (
	input: BudgetSortValidation
): Prisma.Enumerable<Prisma.BudgetOrderByWithRelationAndSearchRelevanceInput> | undefined => {
	if (!input) {
		return [{ title: 'desc' }, { createdAt: 'desc' }, { id: 'asc' }];
	}

	const returnData = input.map((sort): Prisma.BudgetOrderByWithRelationAndSearchRelevanceInput => {
		return { [sort.key]: sort.direction };
	});

	return [...returnData, { id: 'asc' }];
};
