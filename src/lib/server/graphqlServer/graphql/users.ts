export const usersSchema = /* GraphQL */ `
	enum CurrencyFormatEnum {
		USD
		GBP
		JPY
		EUR
	}

	type User {
		id: String!
		firstName: String!
		lastName: String!
		email: String!
		admin: Boolean!
		darkMode: Boolean!
		dateFormat: String!
		currencyFormat: CurrencyFormatEnum!
		firstMonthFY: Int!
	}

	type UserPublic {
		id: String!
		firstName: String!
		lastName: String!
		email: String!
	}

	type Query {
		user: User
	}

	input UpdateUserInput {
		firstName: String
		lastName: String
		darkMode: Boolean
		dateFormat: String
		currencyFormat: CurrencyFormatEnum
		firstMonthFY: Int
	}

	input CreateUserInput {
		firstName: String!
		lastName: String!
		email: EmailAddress!
		password: String!
		admin: Boolean
	}
	type Mutation {
		updateUser(input: UpdateUserInput!): User!
		createUser(data: CreateUserInput!): String!
	}
`;
