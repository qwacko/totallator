import { AccountType } from '$lib/graphqlClient/generated';

export const accountTypeOptionsExtended: {
	label: string;
	value: string;
	accountTypeValue: AccountType[] | undefined;
}[] = [
	{
		label: 'All Account Types',
		value: 'all',
		accountTypeValue: undefined
	},
	{
		label: 'Assets / Liabilities',
		value: 'default',
		accountTypeValue: [AccountType.Asset, AccountType.Liability]
	},
	{
		label: 'Income / Expenses',
		value: 'incexp',
		accountTypeValue: [AccountType.Income, AccountType.Expense]
	},
	{
		label: 'Assets',
		value: 'assets',
		accountTypeValue: [AccountType.Asset]
	},
	{
		label: 'Liabilities',
		value: 'liabilities',
		accountTypeValue: [AccountType.Liability]
	},
	{
		label: 'Income',
		value: 'income',
		accountTypeValue: [AccountType.Income]
	},
	{
		label: 'Expense',
		value: 'expense',
		accountTypeValue: [AccountType.Expense]
	}
];

export const accountTypeOptions = accountTypeOptionsExtended.map((item) => ({
	value: item.value,
	label: item.label
}));

export const getAccountTypeOptionsAndValue = ({
	selection
}: {
	selection: AccountType[] | undefined;
}) => {
	const currentSelection = accountTypeOptionsExtended.find(
		(item) => JSON.stringify(item.accountTypeValue) === JSON.stringify(selection)
	);

	if (currentSelection) {
		return { options: accountTypeOptions, value: currentSelection.value };
	}

	const extendedOptions = [
		{ value: 'custom', label: selection ? selection.join(' / ') : 'None' },
		...accountTypeOptions
	];

	return { options: extendedOptions, value: 'custom' };
};

export const getAccountTypes = (input: string) => {
	const targetOption = accountTypeOptionsExtended.find((item) => item.value === input);

	if (targetOption) {
		return targetOption.accountTypeValue;
	}

	return [AccountType.Asset, AccountType.Liability];
};
