export const importSchema = /* GraphQL */ `
	enum ImportDataReturnStatus {
		journalIdMatch
		similarJournalFound
		transactionIdMatch
		referenceOnly
	}

	type ImportReturnError {
		title: String
		location: String
		message: String
	}

	type ImportDataProcessed {
		primaryJournalId: String!
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
		status: [ImportDataReturnStatus!]!
		foundJournalID: String
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImportDataInput {
		primaryJournalId: String!
		id: String
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
		createdAt: DateTime
		updatedAt: DateTime
	}

	type ImportDataReturn {
		data: [ImportDataProcessed!]
		errors: [ImportReturnError!]
	}

	type Query {
		importDataCheck(
			data: [ImportDataInput!]!
			accountGroupingId: String!
			excludeTransactions: Boolean
			excludeCheckJournalDetails: Boolean
			excludeCheckJournalId: Boolean
			excludeCheckTransactionId: Boolean
		): ImportDataReturn
	}
`;
