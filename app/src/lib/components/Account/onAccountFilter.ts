import type { AccountFilter, InputMaybe } from '$lib/graphqlClient/generated';

export const onAccountFilter = (
	e: CustomEvent<AccountFilter>,
	setFilter: (value: InputMaybe<AccountFilter> | undefined) => void
) => {
	if (e.detail) {
		setFilter(e.detail);
	}
};
