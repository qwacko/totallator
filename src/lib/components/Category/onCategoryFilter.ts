import type { CategoryFilter, InputMaybe } from '$lib/graphqlClient/generated';

export const onCategoryFilter = (
	e: CustomEvent<CategoryFilter>,
	setFilter: (value: InputMaybe<CategoryFilter> | undefined) => void
) => {
	if (e.detail) {
		setFilter(e.detail);
	}
};
