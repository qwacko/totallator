import type { BillFilter, InputMaybe } from '$lib/graphqlClient/generated';

export const onBillFilter = (
	e: CustomEvent<BillFilter>,
	setFilter: (value: InputMaybe<BillFilter> | undefined) => void
) => {
	if (e.detail) {
		setFilter(e.detail);
	}
};
