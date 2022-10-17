export const accountsSchema = /* GraphQL */ `
	enum AccountType {
		Income
		Expense
		Asset
		Liability
	}

	type Account {
		id: UUID!
		title: String!
		isCash: Boolean!
		isNetWorth: Boolean!
		type: AccountType!
		accountGroup: String
		accountGroup2: String
		accountGroup3: String
		accountGroupCombined: String
		accountTitleCombined: String
		startDate: Date
		endDate: Date
		accountGrouping: AccountGrouping
		status: StatusEnum!
		deleted: Boolean!
		active: Boolean!
		disabled: Boolean!
		allowUpdate: Boolean!
		createdAt: DateTime!
		updatedAt: DateTime!
		userIsAdmin: Boolean!
	}

	input AccountTypeFilter {
		in: [AccountType]
		equals: AccountType
		notIn: [AccountType]
		not: AccountType
	}

	input AccountFilter {
		id: StringFilter
		title: StringFilter
		isCash: BooleanFilter
		isNetWorth: BooleanFilter
		accountGroupingId: AccountGroupingIdFilter
		accountGroup: StringFilter
		accountGroup2: StringFilter
		accountGroup3: StringFilter
		deleted: BooleanFilter
		active: BooleanFilter
		disabled: BooleanFilter
		allowUpdate: BooleanFilter
		accountTitleCombined: StringFilter
		type: AccountTypeFilter
		startDate: DateFilter
		endDate: DateFilter

		accountGrouping: AccountGroupingFilter
		status: StatusFilter
	}

	input AccountSort {
		title: SortDirection
		isCash: SortDirection
		isNetWorth: SortDirection
		accountGroup: SortDirection
		accountGroup2: SortDirection
		accountGroup3: SortDirection
		status: SortDirection
		deleted: SortDirection
		active: SortDirection
		disabled: SortDirection
		allowUpdate: SortDirection
		accountTitleCombined: SortDirection
		accountGroupCombined: SortDirection
		startDate: SortDirection
		endDate: SortDirection
	}

	type AccountsReturn {
		id: String
		accounts: [Account!]!
		count: Int!
	}

	type Query {
		account(id: UUID!): Account!
		accounts(filter: AccountFilter, offset: Int, limit: Int, sort: [AccountSort!]): AccountsReturn!
	}

	input CreateAccountInput {
		title: String!
		isCash: Boolean
		isNetWorth: Boolean
		type: AccountType
		accountGroup: String
		accountGroup2: String
		accountGroup3: String
		startDate: Date
		endDate: Date
		accountGroupingId: UUID!
		status: StatusEnum
	}

	input UpdateAccountInput {
		title: String
		isCash: Boolean
		isNetWorth: Boolean
		type: AccountType
		accountGroup: String
		accountGroup2: String
		accountGroup3: String
		startDate: Date
		endDate: Date
		status: StatusEnum
	}

	type Mutation {
		createAccount(input: CreateAccountInput!): Account!
		updateAccounts(filter: AccountFilter!, input: UpdateAccountInput!): [Account!]!
	}
`;
