export const standardFunctionsSchema = /* GraphQL */ `
 enum SortDirection {
	asc
	desc
}

enum EmptyFirst {
	EMPTY_FIRST
	EMPTY_LAST
}

enum StatusEnum {
	Active
	Disabled
	Deleted
}

input StatusFilter {
	equals: StatusEnum
	not: StatusEnum
	in: [StatusEnum]
	notIn: [StatusEnum]
}

input StringFilter {
	contains: String
	endsWith: String
	equals: String
	in: [String]
	not: String
	notIn: [String]
	startsWith: String
}

input UUIDFilter {
	equals: UUID
	not: UUID
	in: [UUID]
	notIn: [UUID]
}

input DateFilter {
	equals: Date
	gt: Date
	gte: Date
	lt: Date
	lte: Date
	in: [Date]
	notIn: [Date]
	not: Date
}
input NumberFilter {
	equals: Float
	gt: Float
	gte: Float
	lt: Float
	lte: Float
	in: [Float]
	notIn: [Float]
	not: Float
}
input AccountGroupingIdFilter {
	equals: UUID
	not: UUID
	in: [UUID]
	notIn: [UUID]
}

input BooleanFilter {
	equals: Boolean
	not: Boolean
}

`