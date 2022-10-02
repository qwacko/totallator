export const accountGroupingsSchema = /* GraphQL */ `
	type AccountGrouping {
		id: UUID!
		title: String!
		status: StatusEnum!
		deleted: Boolean!
		active: Boolean!
		disabled: Boolean!
		allowUpdate: Boolean!
		userIsAdmin: Boolean!
		createdAt: DateTime!
		updatedAt: DateTime!
		viewUsers: [UserPublic]
		adminUsers: [UserPublic]
		allUsers: [UserPublic]
	}

	input AccountGroupingSort {
		title: SortDirection
		status: SortDirection
		deleted: SortDirection
		active: SortDirection
		disabled: SortDirection
	}

	input AccountGroupingFilter {
		title: StringFilter
		deleted: BooleanFilter
		disabled: BooleanFilter
		active: BooleanFilter
	}
	type Query {
		accountGroupings: [AccountGrouping!]!
		accountGrouping(id: UUID!): AccountGrouping
	}

	input CreateAccountGroupingInput {
		title: String!
	}

	input UpdateAccountGroupingInput {
		status: StatusEnum
		title: String
	}

	type Mutation {
		createAccountGrouping(input: CreateAccountGroupingInput!): AccountGrouping!
		updateAccountGrouping(id: UUID!, input: UpdateAccountGroupingInput!): AccountGrouping!
		addUserToAccountGrouping(id: UUID!, email: String!): AccountGrouping!
		removeUserFromAccountGrouping(agID: UUID!, userID: String!): AccountGrouping!
		setUserToAGAdmin(agID: UUID!, userID: String!): AccountGrouping!
		setUserToAGView(agID: UUID!, userID: String!): AccountGrouping!
	}
`;
