import type { InputMaybe } from '$lib/graphqlClient/generated';
import type { JournalEntryFilter } from '$lib/graphqlClient/generated';
import { cleanseObject } from '$lib/utils/cleanseObject';

export const mergeJournalFilter = (
	internalFilter: InputMaybe<JournalEntryFilter> | undefined,
	externalFilter: InputMaybe<JournalEntryFilter> | undefined
): InputMaybe<JournalEntryFilter> => {
	const internalFilterCleansed = cleanseObject<JournalEntryFilter, JournalEntryFilter>(
		internalFilter as JournalEntryFilter
	);

	const externalFilterCleansed = cleanseObject<JournalEntryFilter, JournalEntryFilter>(
		externalFilter as JournalEntryFilter
	);

	const hasExternalFilter =
		externalFilterCleansed &&
		externalFilterCleansed !== null &&
		Object.keys(externalFilterCleansed).length > 0;
	const hasInternalFilter =
		internalFilterCleansed &&
		internalFilterCleansed !== null &&
		Object.keys(internalFilterCleansed).length > 0;

	const filter: InputMaybe<JournalEntryFilter> =
		hasExternalFilter && hasInternalFilter && externalFilterCleansed && internalFilterCleansed
			? { AND: [externalFilterCleansed, internalFilterCleansed] }
			: hasExternalFilter && externalFilterCleansed
			? externalFilterCleansed
			: hasInternalFilter && internalFilterCleansed
			? internalFilterCleansed
			: {};

	return filter;
};
