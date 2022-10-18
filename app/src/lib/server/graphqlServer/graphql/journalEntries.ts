export const journalEntriesSchema = /* GraphQL */ `
	type JournalEntry {
		#Entry Items
		id: UUID!
		date: Date!
		description: String!
		amount: Float!
		linked: Boolean!
		primary: Boolean!
		reconciled: Boolean!
		dataChecked: Boolean!
		complete: Boolean!

		# Linked Items
		accountGrouping: AccountGrouping!
		accountGroupingId: String!
		account: Account!
		accountId: String!
		primaryJournal: JournalEntry!
		primaryJournalId: String!
		journalEntries: [JournalEntry!]!
		bill: Bill
		budget: Budget
		category: Category
		tag: Tag

		#Derived Values
		userIsAdmin: Boolean!
		editable: Boolean!
		amountEditable: Boolean!

		total: Float!

		#Created Updated
		createdAt: DateTime!
		updatedAt: DateTime!
	}

	input JournalEntrySort {
		date: SortDirection
		description: SortDirection
		linked: SortDirection
		reconciled: SortDirection
		dataChecked: SortDirection
		complete: SortDirection
		amount: SortDirection
		createdAt: SortDirection
		updatedAt: SortDirection

		#Linked Item Sorting
		account: AccountSort
		accountGrouping: AccountGroupingSort
		bill: BillSort
		budget: BudgetSort
		category: CategorySort
		tag: TagSort
	}

	input JournalEntriesFilter {
		every: JournalEntryFilter
		some: JournalEntryFilter
		none: JournalEntryFilter
	}

	input JournalEntryFilterWithoutPrimary {
		id: UUIDFilter
		date: DateFilter
		description: StringFilter
		linked: BooleanFilter
		reconciled: BooleanFilter
		dataChecked: BooleanFilter
		complete: BooleanFilter
		amount: NumberFilter
		accountGroupingId: UUIDFilter
		accountId: UUIDFilter
		primaryJournalId: UUIDFilter
		createdAt: DateFilter
		updatedAt: DateFilter

		#Linked Items
		account: AccountFilter
		accountGrouping: AccountGroupingFilter
		journalEntries: JournalEntriesFilter
		bill: BillFilter
		budget: BudgetFilter
		category: CategoryFilter
		tag: TagFilter
	}

	input JournalEntryFilterSingle {
		id: UUIDFilter
		date: DateFilter
		description: StringFilter
		linked: BooleanFilter
		reconciled: BooleanFilter
		dataChecked: BooleanFilter
		complete: BooleanFilter
		amount: NumberFilter
		accountGroupingId: UUIDFilter
		accountId: UUIDFilter
		primaryJournalId: UUIDFilter
		createdAt: DateFilter
		updatedAt: DateFilter

		#Linked Items
		account: AccountFilter
		accountGrouping: AccountGroupingFilter
		primaryJournal: JournalEntryFilterWithoutPrimary
		bill: BillFilter
		budget: BudgetFilter
		category: CategoryFilter
		tag: TagFilter
	}

	input JournalEntryFilter {
		OR: [JournalEntryFilterSingle]
		AND: [JournalEntryFilterSingle]
		id: UUIDFilter
		date: DateFilter
		description: StringFilter
		linked: BooleanFilter
		reconciled: BooleanFilter
		dataChecked: BooleanFilter
		complete: BooleanFilter
		amount: NumberFilter
		accountGroupingId: UUIDFilter
		accountId: UUIDFilter
		primaryJournalId: UUIDFilter
		createdAt: DateFilter
		updatedAt: DateFilter

		#Linked Items
		account: AccountFilter
		accountGrouping: AccountGroupingFilter
		primaryJournal: JournalEntryFilterWithoutPrimary
		bill: BillFilter
		budget: BudgetFilter
		category: CategoryFilter
		tag: TagFilter
	}

	type JournalEntriesReturn {
		id: String
		journalEntries: [JournalEntry!]!
		sum: Float!
		count: Int!
	}

	type Query {
		journalEntry(id: UUID!): JournalEntry!
		journalEntries(
			filter: JournalEntryFilter
			offset: Int
			limit: Int
			sort: [JournalEntrySort!]
		): JournalEntriesReturn!
	}

	input ConnectOrCreateAccount {
		connectOrCreate: CreateAccountInput
	}

	input ConnectOrCreateBill {
		connectOrCreate: CreateBillInput
	}

	input ConnectOrCreateBudget {
		connectOrCreate: CreateBudgetInput
	}

	input ConnectOrCreateCategory {
		connectOrCreate: CreateCategoryInput
	}

	input ConnectOrCreateTag {
		connectOrCreate: CreateTagInput
	}

	input CreateJournalInput {
		#Journal Entry Info
		date: Date!
		description: String!
		amount: Float!
		linked: Boolean
		reconciled: Boolean
		dataChecked: Boolean
		complete: Boolean

		#Linked Info
		accountGroupingId: UUID!
		accountId: UUID
		billId: UUID
		budgetId: UUID
		categoryId: UUID
		tagId: UUID

		account: ConnectOrCreateAccount
		bill: ConnectOrCreateBill
		budget: ConnectOrCreateBudget
		category: ConnectOrCreateCategory
		tag: ConnectOrCreateTag
	}

	input UpdateJournalInput {
		#Journal Entry Info
		date: Date
		description: String
		amount: Float
		reconciled: Boolean
		dataChecked: Boolean
		complete: Boolean

		#Linked Info
		accountId: UUID
		otherAccountId: UUID
		billId: UUID
		budgetId: UUID
		categoryId: UUID
		tagId: UUID
	}

	input AddJournalInput {
		#Journal Entry Info
		date: Date
		description: String
		amount: Float!
		reconciled: Boolean
		dataChecked: Boolean

		#Linked Info
		accountId: UUID!
		primaryJournalId: UUID!
		billId: UUID
		budgetId: UUID
		categoryId: UUID
		tagId: UUID
	}

	type Mutation {
		createTransaction(input: [CreateJournalInput!]!): [JournalEntry!]
		createTransactions(input: [[CreateJournalInput!]!]!): [JournalEntry!]
		updateJournalEntries(filter: JournalEntryFilter!, input: UpdateJournalInput!): [JournalEntry!]
		transactionsToIncomplete(primaryJournalIds: [UUID]!): [JournalEntry!]
		transactionsToComplete(primaryJournalIds: [UUID]!): [JournalEntry!]
		linkTransactions(primaryJournalIds: [UUID]!): [JournalEntry!]
		unlinkTransactions(primaryJournalIds: [UUID]!): [JournalEntry!]
		deleteJournalEntries(journalIds: [UUID]!): [JournalEntry!]
		addJournalEntries(data: [AddJournalInput]): [JournalEntry!]
		changePrimaryJournal(oldPrimaryId: UUID!, newPrimaryId: UUID!): [JournalEntry!]
		cloneTransactions(ids: [UUID]!, input: UpdateJournalInput): [JournalEntry!]
		addExpenseAndConnectToJournals(journalIds: [UUID]!, expenseName: String!): [JournalEntry!]
	}
`;
