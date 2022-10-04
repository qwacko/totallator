export const budgetsSchema = /* GraphQL */ `
	type Budget {
		id: UUID!
		title: String!
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

	input BudgetFilter {
		id: StringFilter
		title: StringFilter
		accountGroupingId: AccountGroupingIdFilter
		deleted: BooleanFilter
		active: BooleanFilter
		disabled: BooleanFilter
		allowUpdate: BooleanFilter

		accountGrouping: AccountGroupingFilter
		status: StatusFilter
	}

	input BudgetSort {
		title: SortDirection
		status: SortDirection
		deleted: SortDirection
		active: SortDirection
		disabled: SortDirection
		allowUpdate: SortDirection

		accountGrouping: AccountGroupingSort
	}

	type BudgetsReturn {
		budgets: [Budget!]!
		count: Int!
	}

	type Query {
		budget(id: UUID!): Budget!
		budgets(filter: BudgetFilter, offset: Int, limit: Int, sort: [BudgetSort!]): BudgetsReturn
	}

	input CreateBudgetInput {
		title: String!
		accountGroupingId: UUID!
		status: StatusEnum
	}

	input UpdateBudgetInput {
		title: String
		status: StatusEnum
	}

	type Mutation {
		createBudget(input: CreateBudgetInput!): Budget!
		updateBudgets(filter: BudgetFilter!, input: UpdateBudgetInput!): [Budget!]!
	}
`;
