import type { InputMaybe, JournalEntryFilter } from '$lib/graphqlClient/generated';

export const onJournalFilter = (
	e: CustomEvent<JournalEntryFilter>,
	setFilter: (value: InputMaybe<JournalEntryFilter> | undefined) => void
) => {
	if (e.detail) {
		setFilter(e.detail);
	}
};
