export const tagsSchema = /* GraphQL */ `
	type Tag {
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

	input TagFilter {
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

	input TagSort {
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

	type TagsReturn {
		id: String
		tags: [Tag!]!
		count: Int!
	}

	type Query {
		tag(id: UUID!): Tag!
		tags(filter: TagFilter, offset: Int, limit: Int, sort: [TagSort!]): TagsReturn!
	}

	input CreateTagInput {
		group: String!
		single: String!
		accountGroupingId: UUID!
		status: StatusEnum
	}

	input UpdateTagInput {
		group: String
		single: String
		status: StatusEnum
	}

	type Mutation {
		createTag(input: CreateTagInput!): Tag!
		updateTags(filter: TagFilter!, input: UpdateTagInput!): [Tag!]!
	}
`;
