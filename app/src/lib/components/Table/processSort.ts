import type { SortDirection } from '$lib/graphqlClient/generated';
import type { InputMaybe } from '$lib/graphqlClient/generated';

export const processSort = (
	found: boolean,
	direction: SortDirection
): InputMaybe<SortDirection> | undefined =>
	found ? (direction ? direction : undefined) : undefined;
