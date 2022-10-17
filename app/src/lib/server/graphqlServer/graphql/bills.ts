export const billsSchema = /* GraphQL */ `
	type Bill {
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

	input BillFilter {
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

	input BillSort {
		title: SortDirection
		status: SortDirection
		deleted: SortDirection
		active: SortDirection
		disabled: SortDirection
		allowUpdate: SortDirection

		accountGrouping: AccountGroupingSort
	}

	type BillsReturn {
		id: String
		bills: [Bill!]!
		count: Int!
	}

	type Query {
		bill(id: UUID!): Bill!
		bills(filter: BillFilter, offset: Int, limit: Int, sort: [BillSort!]): BillsReturn
	}

	input CreateBillInput {
		title: String!
		accountGroupingId: UUID!
		status: StatusEnum
	}

	input UpdateBillInput {
		title: String
		status: StatusEnum
	}

	type Mutation {
		createBill(input: CreateBillInput!): Bill!
		updateBills(filter: BillFilter!, input: UpdateBillInput!): [Bill!]!
	}
`;
