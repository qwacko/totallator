export const categoriesSchema = /* GraphQL */ `
	type Category {
		id: UUID!
		title: String!
		single: String!
		group: String!
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

	input CategoryFilter {
		id: StringFilter
		title: StringFilter
		group: StringFilter
		single: StringFilter
		accountGroupingId: AccountGroupingIdFilter
		deleted: BooleanFilter
		active: BooleanFilter
		disabled: BooleanFilter
		allowUpdate: BooleanFilter

		accountGrouping: AccountGroupingFilter
		status: StatusFilter
	}

	input CategorySort {
		title: SortDirection
		group: SortDirection
		single: SortDirection
		status: SortDirection
		deleted: SortDirection
		active: SortDirection
		disabled: SortDirection
		allowUpdate: SortDirection

		accountGrouping: AccountGroupingSort
	}

	type CategoriesReturn {
		id: String
		categories: [Category!]!
		count: Int!
	}

	type Query {
		category(id: UUID!): Category!
		categories(
			filter: CategoryFilter
			offset: Int
			limit: Int
			sort: [CategorySort!]
		): CategoriesReturn
	}

	input CreateCategoryInput {
		group: String!
		single: String!
		accountGroupingId: UUID!
		status: StatusEnum
	}

	input UpdateCategoryInput {
		group: String
		single: String
		status: StatusEnum
	}

	type Mutation {
		createCategory(input: CreateCategoryInput!): Category!
		updateCategories(filter: CategoryFilter!, input: UpdateCategoryInput!): [Category!]!
	}
`;
