export const generateTagTitle = ({
	group,
	single
}: {
	group: string | undefined | null;
	single: string | undefined | null;
}) => {
	return {
		title: [group, single].filter((item) => item).join('/')
	};
};
