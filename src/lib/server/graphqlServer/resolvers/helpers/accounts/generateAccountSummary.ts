export const generateAccountSummary = ({
	accountGroup,
	accountGroup2,
	accountGroup3,
	title
}: {
	accountGroup: string | undefined | null;
	accountGroup2: string | undefined | null;
	accountGroup3: string | undefined | null;
	title: string;
}) => {
	return {
		accountGroupCombined: [accountGroup, accountGroup2, accountGroup3]
			.filter((item) => item)
			.join('/'),
		accountTitleCombined: [accountGroup, accountGroup2, accountGroup3, title]
			.filter((item) => item)
			.join('/')
	};
};
