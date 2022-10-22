import type { ImportChecksReturn } from '$lib/graphqlClient/generated';

export const getChangeInfo = (info?: ImportChecksReturn | null) => {
	if (!info) {
		return { text: '', colour: { orange: false, green: false } };
	}

	const newItem =
		!info.dataChanged && !info.idInItemList && !info.idInJournals && !info.dataInJournals;
	const updateExisting = info.dataChanged;

	const preText = newItem
		? 'New'
		: updateExisting
		? 'Update'
		: info.idInItemList
		? 'Existing Unchanged'
		: undefined;

	const infoText = [
		preText,
		info.idInJournals ? 'ID In Journal List' : undefined,
		info.dataInJournals ? 'Title In Journal List' : undefined
	]
		.filter((item) => item)
		.join(',');

	const colourOutput = {
		orange: Boolean(info.dataChanged),
		green: newItem
	};

	return { text: infoText, colour: colourOutput, newItem, updateExisting };
};
