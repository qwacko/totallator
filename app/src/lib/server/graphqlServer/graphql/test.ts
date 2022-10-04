export const testSchema = /* GraphQL */ `
type TestResult {
	id: ID!
	title: String!
	requestTime: String!
}

type Query {
	testResult(id: String): TestResult
}

`