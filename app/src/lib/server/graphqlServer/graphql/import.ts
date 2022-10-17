export const importSchema = /* GraphQL */ `
	enum ImportDataReturnStatus {
		new
		existingJournal
		existingTransaction
	}

	type ImportReturnError {
		title: String
		location: String
		message: String
	}

	type ImportDataProcessed {
		transactionId: String!
		journalId: String
		date: String!
		description: String!
		linked: Boolean!
		reconciled: Boolean!
		dataChecked: Boolean!
		complete: Boolean!
		amount: Float!
		accountTitle: String!
		accountId: String!
		categoryTitle: String
		categoryId: String
		billTitle: String
		billId: String
		budgetTitle: String
		budgetId: String
		tagTitle: String
		tagId: String
		status: ImportDataReturnStatus
	}

	input ImportDataInput {
		transactionId: String!
		journalId: String
		date: String!
		description: String!
		linked: Boolean
		reconciled: Boolean
		dataChecked: Boolean
		complete: Boolean
		amount: Float!
		accountTitle: String
		accountId: String
		categoryTitle: String
		categoryId: String
		billTitle: String
		billId: String
		budgetTitle: String
		budgetId: String
		tagTitle: String
		tagId: String
	}

	type ImportDataReturn {
		data: [ImportDataProcessed!]
		errors: [ImportReturnError!]
	}

	type Query {
		importDataCheck(data: [ImportDataInput]!, accountGroupingId: String!): ImportDataReturn
	}
`;
