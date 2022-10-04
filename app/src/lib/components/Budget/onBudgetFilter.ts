import type { BudgetFilter, InputMaybe } from '$lib/graphqlClient/generated';

export const onBudgetFilter = (
	e: CustomEvent<BudgetFilter>,
	setFilter: (value: InputMaybe<BudgetFilter> | undefined) => void
) => {
	if (e.detail) {
		setFilter(e.detail);
	}
};
