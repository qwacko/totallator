export const createGroupSingleTitle = ({ group, single }: { group: string; single: string }) => {
	return { group, single, title: `${group}/${single}` };
};
export const updateGroupSingleTitle = <T extends { group: string; single: string }>({
	group,
	single,
	title,
	existing
}: {
	group?: string | undefined;
	single?: string | undefined;
	title?: string | undefined;
	existing: T;
}) => {
	const [useGroup, useSingle] = title ? title.split('/') : [group, single];

	return {
		group: useGroup,
		single: useSingle,
		title:
			useGroup || useSingle
				? `${useGroup || existing.group}/${useSingle || existing.single}`
				: undefined
	};
};
