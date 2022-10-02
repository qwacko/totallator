import type { InputMaybe, TagFilter } from '$lib/graphqlClient/generated';

export const onTagFilter = (
	e: CustomEvent<TagFilter>,
	setFilter: (value: InputMaybe<TagFilter> | undefined) => void
) => {
	if (e.detail) {
		setFilter(e.detail);
	}
};
