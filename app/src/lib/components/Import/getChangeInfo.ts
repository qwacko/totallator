import type { ImportChecksReturn } from '$lib/graphqlClient/generated';

export const getChangeInfo = (info?: ImportChecksReturn | null) => {
	if (!info) {
		return { text: '', colour: { orange: false, green: false } };
	}
	const infoText = [
		info.idInItemList ? 'ID Found' : undefined,
		info.idInJournals ? 'ID In Journal List' : undefined,
		info.dataInJournals ? 'Title In Journal List' : undefined,
		info.dataChanged ? 'Data Changed' : undefined
	]
		.filter((item) => item)
		.join(',');

	const colourOutput = {
		orange: Boolean(info.dataChanged),
		green: !info.dataChanged && !info.idInItemList && !info.idInJournals && !info.dataInJournals
	};

	return { text: infoText, colour: colourOutput };
};
