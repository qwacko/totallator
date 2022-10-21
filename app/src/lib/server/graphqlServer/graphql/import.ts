export const importSchema = /* GraphQL */ `
	enum ImportJournalReturnStatus {
		journalIdMatch
		similarJournalFound
		transactionIdMatch
		referenceOnly
	}

	type ImportChecksReturn {
		idInItemList: Boolean
		idInJournals: Boolean
		dataInJournals: Boolean
		dataChanged: Boolean
	}

	type ImportReturnError {
		title: String
		location: String
		message: String
	}

	type ImportJournalProcessed {
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
		status: [ImportJournalReturnStatus!]!
		foundJournalID: String
		createdAt: DateTime
		updatedAt: DateTime
	}

	type ImportBillProcessed {
		id: String!
		title: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
		processingResult: ImportChecksReturn
	}

	type ImportBudgetProcessed {
		id: String!
		title: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
		processingResult: ImportChecksReturn
	}
	type ImportTagProcessed {
		id: String!
		title: String
		group: String
		single: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
		processingResult: ImportChecksReturn
	}

	type ImportCategoryProcessed {
		id: String!
		title: String
		group: String
		single: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
		processingResult: ImportChecksReturn
	}

	type ImportAccountProcessed {
		id: String!
		title: String
		isCash: Boolean
		isNetWorth: Boolean
		type: AccountType
		accountGroup: String
		accountGroup2: String
		accountGroup3: String
		startDate: Date
		endDate: Date
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
		processingResult: ImportChecksReturn
	}

	input ImportJournalInput {
		primaryJournalId: String!
		id: String!
		date: String!
		description: String!
		linked: Boolean
		reconciled: Boolean
		dataChecked: Boolean
		accountGroupingId: String
		primary: Boolean
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

	input ImportBillInput {
		id: String!
		title: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImportBudgetInput {
		id: String!
		title: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImportTagInput {
		id: String!
		title: String
		group: String
		single: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImportCategoryInput {
		id: String!
		title: String
		group: String
		single: String
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImportAccountInput {
		id: String!
		title: String
		isCash: Boolean
		isNetWorth: Boolean
		type: AccountType
		accountGroup: String
		accountGroup2: String
		accountGroup3: String
		startDate: Date
		endDate: Date
		status: StatusEnum
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImportDataCombined {
		journals: [ImportJournalInput!]
		tags: [ImportTagInput!]
		bills: [ImportBillInput!]
		budgets: [ImportBudgetInput!]
		categories: [ImportCategoryInput!]
		accounts: [ImportAccountInput!]
	}

	type ImportDataResult {
		journals: [ImportJournalProcessed!]
		bills: [ImportBillProcessed!]
		budgets: [ImportBudgetProcessed!]
		tags: [ImportTagProcessed!]
		categories: [ImportCategoryProcessed!]
		accounts: [ImportAccountProcessed!]
	}

	type ImportDataReturn {
		data: ImportDataResult
		errors: [ImportReturnError!]
	}

	type Query {
		importDataCheck(
			data: ImportDataCombined!
			accountGroupingId: String!
			excludeTransactions: Boolean
			excludeCheckJournalDetails: Boolean
			excludeCheckJournalId: Boolean
			excludeCheckTransactionId: Boolean
		): ImportDataReturn
	}
`;
