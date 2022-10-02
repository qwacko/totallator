import { AccountType, type JournalEntryFilter } from '$lib/graphqlClient/generated';
import { writable } from 'svelte/store';

export const generalFilterStore = writable<JournalEntryFilter>({
	account: { type: { in: [AccountType.Asset, AccountType.Liability] } }
});
