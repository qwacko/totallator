import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: any;
  Duration: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

export type Account = {
  __typename?: 'Account';
  accountGroup?: Maybe<Scalars['String']>;
  accountGroup2?: Maybe<Scalars['String']>;
  accountGroup3?: Maybe<Scalars['String']>;
  accountGroupCombined?: Maybe<Scalars['String']>;
  accountGrouping?: Maybe<AccountGrouping>;
  accountTitleCombined?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  allowUpdate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  endDate?: Maybe<Scalars['Date']>;
  id: Scalars['UUID'];
  isCash: Scalars['Boolean'];
  isNetWorth: Scalars['Boolean'];
  startDate?: Maybe<Scalars['Date']>;
  status: StatusEnum;
  title: Scalars['String'];
  type: AccountType;
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
};

export type AccountFilter = {
  accountGroup?: InputMaybe<StringFilter>;
  accountGroup2?: InputMaybe<StringFilter>;
  accountGroup3?: InputMaybe<StringFilter>;
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<AccountGroupingIdFilter>;
  accountTitleCombined?: InputMaybe<StringFilter>;
  active?: InputMaybe<BooleanFilter>;
  allowUpdate?: InputMaybe<BooleanFilter>;
  deleted?: InputMaybe<BooleanFilter>;
  disabled?: InputMaybe<BooleanFilter>;
  endDate?: InputMaybe<DateFilter>;
  id?: InputMaybe<StringFilter>;
  isCash?: InputMaybe<BooleanFilter>;
  isNetWorth?: InputMaybe<BooleanFilter>;
  startDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<StatusFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<AccountTypeFilter>;
};

export type AccountGrouping = {
  __typename?: 'AccountGrouping';
  active: Scalars['Boolean'];
  adminUsers?: Maybe<Array<Maybe<UserPublic>>>;
  allUsers?: Maybe<Array<Maybe<UserPublic>>>;
  allowUpdate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  id: Scalars['UUID'];
  status: StatusEnum;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
  viewUsers?: Maybe<Array<Maybe<UserPublic>>>;
};

export type AccountGroupingFilter = {
  active?: InputMaybe<BooleanFilter>;
  deleted?: InputMaybe<BooleanFilter>;
  disabled?: InputMaybe<BooleanFilter>;
  title?: InputMaybe<StringFilter>;
};

export type AccountGroupingIdFilter = {
  equals?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  not?: InputMaybe<Scalars['UUID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
};

export type AccountGroupingSort = {
  active?: InputMaybe<SortDirection>;
  deleted?: InputMaybe<SortDirection>;
  disabled?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type AccountSort = {
  accountGroup?: InputMaybe<SortDirection>;
  accountGroup2?: InputMaybe<SortDirection>;
  accountGroup3?: InputMaybe<SortDirection>;
  accountGroupCombined?: InputMaybe<SortDirection>;
  accountTitleCombined?: InputMaybe<SortDirection>;
  active?: InputMaybe<SortDirection>;
  allowUpdate?: InputMaybe<SortDirection>;
  deleted?: InputMaybe<SortDirection>;
  disabled?: InputMaybe<SortDirection>;
  endDate?: InputMaybe<SortDirection>;
  isCash?: InputMaybe<SortDirection>;
  isNetWorth?: InputMaybe<SortDirection>;
  startDate?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export enum AccountType {
  Asset = 'Asset',
  Expense = 'Expense',
  Income = 'Income',
  Liability = 'Liability'
}

export type AccountTypeFilter = {
  equals?: InputMaybe<AccountType>;
  in?: InputMaybe<Array<InputMaybe<AccountType>>>;
  not?: InputMaybe<AccountType>;
  notIn?: InputMaybe<Array<InputMaybe<AccountType>>>;
};

export type AccountsReturn = {
  __typename?: 'AccountsReturn';
  accounts: Array<Account>;
  count: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
};

export type AddJournalInput = {
  accountId: Scalars['UUID'];
  amount: Scalars['Float'];
  billId?: InputMaybe<Scalars['UUID']>;
  budgetId?: InputMaybe<Scalars['UUID']>;
  categoryId?: InputMaybe<Scalars['UUID']>;
  dataChecked?: InputMaybe<Scalars['Boolean']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  primaryJournalId: Scalars['UUID'];
  reconciled?: InputMaybe<Scalars['Boolean']>;
  tagId?: InputMaybe<Scalars['UUID']>;
};

export type Bill = {
  __typename?: 'Bill';
  accountGrouping?: Maybe<AccountGrouping>;
  active: Scalars['Boolean'];
  allowUpdate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  id: Scalars['UUID'];
  status: StatusEnum;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
};

export type BillFilter = {
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<AccountGroupingIdFilter>;
  active?: InputMaybe<BooleanFilter>;
  allowUpdate?: InputMaybe<BooleanFilter>;
  deleted?: InputMaybe<BooleanFilter>;
  disabled?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<StringFilter>;
  status?: InputMaybe<StatusFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BillSort = {
  accountGrouping?: InputMaybe<AccountGroupingSort>;
  active?: InputMaybe<SortDirection>;
  allowUpdate?: InputMaybe<SortDirection>;
  deleted?: InputMaybe<SortDirection>;
  disabled?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type BillsReturn = {
  __typename?: 'BillsReturn';
  bills: Array<Bill>;
  count: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<Scalars['Boolean']>;
};

export type Budget = {
  __typename?: 'Budget';
  accountGrouping?: Maybe<AccountGrouping>;
  active: Scalars['Boolean'];
  allowUpdate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  id: Scalars['UUID'];
  status: StatusEnum;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
};

export type BudgetFilter = {
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<AccountGroupingIdFilter>;
  active?: InputMaybe<BooleanFilter>;
  allowUpdate?: InputMaybe<BooleanFilter>;
  deleted?: InputMaybe<BooleanFilter>;
  disabled?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<StringFilter>;
  status?: InputMaybe<StatusFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BudgetSort = {
  accountGrouping?: InputMaybe<AccountGroupingSort>;
  active?: InputMaybe<SortDirection>;
  allowUpdate?: InputMaybe<SortDirection>;
  deleted?: InputMaybe<SortDirection>;
  disabled?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type BudgetsReturn = {
  __typename?: 'BudgetsReturn';
  budgets: Array<Budget>;
  count: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
};

export type CategoriesReturn = {
  __typename?: 'CategoriesReturn';
  categories: Array<Category>;
  count: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  accountGrouping?: Maybe<AccountGrouping>;
  active: Scalars['Boolean'];
  allowUpdate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  group: Scalars['String'];
  id: Scalars['UUID'];
  single: Scalars['String'];
  status: StatusEnum;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
};

export type CategoryFilter = {
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<AccountGroupingIdFilter>;
  active?: InputMaybe<BooleanFilter>;
  allowUpdate?: InputMaybe<BooleanFilter>;
  deleted?: InputMaybe<BooleanFilter>;
  disabled?: InputMaybe<BooleanFilter>;
  group?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  single?: InputMaybe<StringFilter>;
  status?: InputMaybe<StatusFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CategorySort = {
  accountGrouping?: InputMaybe<AccountGroupingSort>;
  active?: InputMaybe<SortDirection>;
  allowUpdate?: InputMaybe<SortDirection>;
  deleted?: InputMaybe<SortDirection>;
  disabled?: InputMaybe<SortDirection>;
  group?: InputMaybe<SortDirection>;
  single?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type ConnectOrCreateAccount = {
  connectOrCreate?: InputMaybe<CreateAccountInput>;
};

export type ConnectOrCreateBill = {
  connectOrCreate?: InputMaybe<CreateBillInput>;
};

export type ConnectOrCreateBudget = {
  connectOrCreate?: InputMaybe<CreateBudgetInput>;
};

export type ConnectOrCreateCategory = {
  connectOrCreate?: InputMaybe<CreateCategoryInput>;
};

export type ConnectOrCreateTag = {
  connectOrCreate?: InputMaybe<CreateTagInput>;
};

export type CreateAccountGroupingInput = {
  title: Scalars['String'];
};

export type CreateAccountInput = {
  accountGroup?: InputMaybe<Scalars['String']>;
  accountGroup2?: InputMaybe<Scalars['String']>;
  accountGroup3?: InputMaybe<Scalars['String']>;
  accountGroupingId: Scalars['UUID'];
  endDate?: InputMaybe<Scalars['Date']>;
  isCash?: InputMaybe<Scalars['Boolean']>;
  isNetWorth?: InputMaybe<Scalars['Boolean']>;
  startDate?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<StatusEnum>;
  title: Scalars['String'];
  type?: InputMaybe<AccountType>;
};

export type CreateBillInput = {
  accountGroupingId: Scalars['UUID'];
  status?: InputMaybe<StatusEnum>;
  title: Scalars['String'];
};

export type CreateBudgetInput = {
  accountGroupingId: Scalars['UUID'];
  status?: InputMaybe<StatusEnum>;
  title: Scalars['String'];
};

export type CreateCategoryInput = {
  accountGroupingId: Scalars['UUID'];
  group: Scalars['String'];
  single: Scalars['String'];
  status?: InputMaybe<StatusEnum>;
};

export type CreateJournalInput = {
  account?: InputMaybe<ConnectOrCreateAccount>;
  accountGroupingId: Scalars['UUID'];
  accountId?: InputMaybe<Scalars['UUID']>;
  amount: Scalars['Float'];
  bill?: InputMaybe<ConnectOrCreateBill>;
  billId?: InputMaybe<Scalars['UUID']>;
  budget?: InputMaybe<ConnectOrCreateBudget>;
  budgetId?: InputMaybe<Scalars['UUID']>;
  category?: InputMaybe<ConnectOrCreateCategory>;
  categoryId?: InputMaybe<Scalars['UUID']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  dataChecked?: InputMaybe<Scalars['Boolean']>;
  date: Scalars['Date'];
  description: Scalars['String'];
  linked?: InputMaybe<Scalars['Boolean']>;
  reconciled?: InputMaybe<Scalars['Boolean']>;
  tag?: InputMaybe<ConnectOrCreateTag>;
  tagId?: InputMaybe<Scalars['UUID']>;
};

export type CreateTagInput = {
  accountGroupingId: Scalars['UUID'];
  group: Scalars['String'];
  single: Scalars['String'];
  status?: InputMaybe<StatusEnum>;
};

export type CreateUserInput = {
  admin?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export enum CurrencyFormatEnum {
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Usd = 'USD'
}

export type DateFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<Scalars['Date']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export enum EmptyFirst {
  EmptyFirst = 'EMPTY_FIRST',
  EmptyLast = 'EMPTY_LAST'
}

export type ImportDataInput = {
  accountId?: InputMaybe<Scalars['String']>;
  accountTitle?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  billId?: InputMaybe<Scalars['String']>;
  billTitle?: InputMaybe<Scalars['String']>;
  budgetId?: InputMaybe<Scalars['String']>;
  budgetTitle?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  categoryTitle?: InputMaybe<Scalars['String']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  dataChecked?: InputMaybe<Scalars['Boolean']>;
  date: Scalars['String'];
  description: Scalars['String'];
  journalId?: InputMaybe<Scalars['String']>;
  linked?: InputMaybe<Scalars['Boolean']>;
  reconciled?: InputMaybe<Scalars['Boolean']>;
  tagId?: InputMaybe<Scalars['String']>;
  tagTitle?: InputMaybe<Scalars['String']>;
  transactionId: Scalars['String'];
};

export type ImportDataProcessed = {
  __typename?: 'ImportDataProcessed';
  accountId: Scalars['String'];
  accountTitle: Scalars['String'];
  amount: Scalars['Float'];
  billId?: Maybe<Scalars['String']>;
  billTitle?: Maybe<Scalars['String']>;
  budgetId?: Maybe<Scalars['String']>;
  budgetTitle?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  categoryTitle?: Maybe<Scalars['String']>;
  complete: Scalars['Boolean'];
  dataChecked: Scalars['Boolean'];
  date: Scalars['String'];
  description: Scalars['String'];
  journalId?: Maybe<Scalars['String']>;
  linked: Scalars['Boolean'];
  reconciled: Scalars['Boolean'];
  status?: Maybe<ImportDataReturnStatus>;
  tagId?: Maybe<Scalars['String']>;
  tagTitle?: Maybe<Scalars['String']>;
  transactionId: Scalars['String'];
};

export type ImportDataReturn = {
  __typename?: 'ImportDataReturn';
  data?: Maybe<Array<ImportDataProcessed>>;
  errors?: Maybe<Array<ImportReturnError>>;
};

export enum ImportDataReturnStatus {
  ExistingJournal = 'existingJournal',
  ExistingTransaction = 'existingTransaction',
  New = 'new'
}

export type ImportReturnError = {
  __typename?: 'ImportReturnError';
  location?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type JournalEntriesFilter = {
  every?: InputMaybe<JournalEntryFilter>;
  none?: InputMaybe<JournalEntryFilter>;
  some?: InputMaybe<JournalEntryFilter>;
};

export type JournalEntriesReturn = {
  __typename?: 'JournalEntriesReturn';
  count: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
  journalEntries: Array<JournalEntry>;
  sum: Scalars['Float'];
};

export type JournalEntry = {
  __typename?: 'JournalEntry';
  account: Account;
  accountGrouping: AccountGrouping;
  accountGroupingId: Scalars['String'];
  accountId: Scalars['String'];
  amount: Scalars['Float'];
  amountEditable: Scalars['Boolean'];
  bill?: Maybe<Bill>;
  budget?: Maybe<Budget>;
  category?: Maybe<Category>;
  complete: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  dataChecked: Scalars['Boolean'];
  date: Scalars['Date'];
  description: Scalars['String'];
  editable: Scalars['Boolean'];
  id: Scalars['UUID'];
  journalEntries: Array<JournalEntry>;
  linked: Scalars['Boolean'];
  primary: Scalars['Boolean'];
  primaryJournal: JournalEntry;
  primaryJournalId: Scalars['String'];
  reconciled: Scalars['Boolean'];
  tag?: Maybe<Tag>;
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
};

export type JournalEntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<JournalEntryFilterSingle>>>;
  OR?: InputMaybe<Array<InputMaybe<JournalEntryFilterSingle>>>;
  account?: InputMaybe<AccountFilter>;
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<UuidFilter>;
  accountId?: InputMaybe<UuidFilter>;
  amount?: InputMaybe<NumberFilter>;
  bill?: InputMaybe<BillFilter>;
  budget?: InputMaybe<BudgetFilter>;
  category?: InputMaybe<CategoryFilter>;
  complete?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<DateFilter>;
  dataChecked?: InputMaybe<BooleanFilter>;
  date?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  linked?: InputMaybe<BooleanFilter>;
  primaryJournal?: InputMaybe<JournalEntryFilterWithoutPrimary>;
  primaryJournalId?: InputMaybe<UuidFilter>;
  reconciled?: InputMaybe<BooleanFilter>;
  tag?: InputMaybe<TagFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type JournalEntryFilterSingle = {
  account?: InputMaybe<AccountFilter>;
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<UuidFilter>;
  accountId?: InputMaybe<UuidFilter>;
  amount?: InputMaybe<NumberFilter>;
  bill?: InputMaybe<BillFilter>;
  budget?: InputMaybe<BudgetFilter>;
  category?: InputMaybe<CategoryFilter>;
  complete?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<DateFilter>;
  dataChecked?: InputMaybe<BooleanFilter>;
  date?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  linked?: InputMaybe<BooleanFilter>;
  primaryJournal?: InputMaybe<JournalEntryFilterWithoutPrimary>;
  primaryJournalId?: InputMaybe<UuidFilter>;
  reconciled?: InputMaybe<BooleanFilter>;
  tag?: InputMaybe<TagFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type JournalEntryFilterWithoutPrimary = {
  account?: InputMaybe<AccountFilter>;
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<UuidFilter>;
  accountId?: InputMaybe<UuidFilter>;
  amount?: InputMaybe<NumberFilter>;
  bill?: InputMaybe<BillFilter>;
  budget?: InputMaybe<BudgetFilter>;
  category?: InputMaybe<CategoryFilter>;
  complete?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<DateFilter>;
  dataChecked?: InputMaybe<BooleanFilter>;
  date?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  journalEntries?: InputMaybe<JournalEntriesFilter>;
  linked?: InputMaybe<BooleanFilter>;
  primaryJournalId?: InputMaybe<UuidFilter>;
  reconciled?: InputMaybe<BooleanFilter>;
  tag?: InputMaybe<TagFilter>;
  updatedAt?: InputMaybe<DateFilter>;
};

export type JournalEntrySort = {
  account?: InputMaybe<AccountSort>;
  accountGrouping?: InputMaybe<AccountGroupingSort>;
  amount?: InputMaybe<SortDirection>;
  bill?: InputMaybe<BillSort>;
  budget?: InputMaybe<BudgetSort>;
  category?: InputMaybe<CategorySort>;
  complete?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  dataChecked?: InputMaybe<SortDirection>;
  date?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  linked?: InputMaybe<SortDirection>;
  reconciled?: InputMaybe<SortDirection>;
  tag?: InputMaybe<TagSort>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpenseAndConnectToJournals?: Maybe<Array<JournalEntry>>;
  addJournalEntries?: Maybe<Array<JournalEntry>>;
  addUserToAccountGrouping: AccountGrouping;
  changePrimaryJournal?: Maybe<Array<JournalEntry>>;
  cloneTransactions?: Maybe<Array<JournalEntry>>;
  createAccount: Account;
  createAccountGrouping: AccountGrouping;
  createBill: Bill;
  createBudget: Budget;
  createCategory: Category;
  createTag: Tag;
  createTransaction?: Maybe<Array<JournalEntry>>;
  createTransactions?: Maybe<Array<JournalEntry>>;
  createUser: Scalars['String'];
  deleteJournalEntries?: Maybe<Array<JournalEntry>>;
  linkTransactions?: Maybe<Array<JournalEntry>>;
  removeUserFromAccountGrouping: AccountGrouping;
  setUserToAGAdmin: AccountGrouping;
  setUserToAGView: AccountGrouping;
  transactionsToComplete?: Maybe<Array<JournalEntry>>;
  transactionsToIncomplete?: Maybe<Array<JournalEntry>>;
  unlinkTransactions?: Maybe<Array<JournalEntry>>;
  updateAccountGrouping: AccountGrouping;
  updateAccounts: Array<Account>;
  updateBills: Array<Bill>;
  updateBudgets: Array<Budget>;
  updateCategories: Array<Category>;
  updateJournalEntries?: Maybe<Array<JournalEntry>>;
  updateTags: Array<Tag>;
  updateUser: User;
};


export type MutationAddExpenseAndConnectToJournalsArgs = {
  expenseName: Scalars['String'];
  journalIds: Array<InputMaybe<Scalars['UUID']>>;
};


export type MutationAddJournalEntriesArgs = {
  data?: InputMaybe<Array<InputMaybe<AddJournalInput>>>;
};


export type MutationAddUserToAccountGroupingArgs = {
  email: Scalars['String'];
  id: Scalars['UUID'];
};


export type MutationChangePrimaryJournalArgs = {
  newPrimaryId: Scalars['UUID'];
  oldPrimaryId: Scalars['UUID'];
};


export type MutationCloneTransactionsArgs = {
  ids: Array<InputMaybe<Scalars['UUID']>>;
  input?: InputMaybe<UpdateJournalInput>;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateAccountGroupingArgs = {
  input: CreateAccountGroupingInput;
};


export type MutationCreateBillArgs = {
  input: CreateBillInput;
};


export type MutationCreateBudgetArgs = {
  input: CreateBudgetInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateTransactionArgs = {
  input: Array<CreateJournalInput>;
};


export type MutationCreateTransactionsArgs = {
  input: Array<Array<CreateJournalInput>>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteJournalEntriesArgs = {
  journalIds: Array<InputMaybe<Scalars['UUID']>>;
};


export type MutationLinkTransactionsArgs = {
  primaryJournalIds: Array<InputMaybe<Scalars['UUID']>>;
};


export type MutationRemoveUserFromAccountGroupingArgs = {
  agID: Scalars['UUID'];
  userID: Scalars['String'];
};


export type MutationSetUserToAgAdminArgs = {
  agID: Scalars['UUID'];
  userID: Scalars['String'];
};


export type MutationSetUserToAgViewArgs = {
  agID: Scalars['UUID'];
  userID: Scalars['String'];
};


export type MutationTransactionsToCompleteArgs = {
  primaryJournalIds: Array<InputMaybe<Scalars['UUID']>>;
};


export type MutationTransactionsToIncompleteArgs = {
  primaryJournalIds: Array<InputMaybe<Scalars['UUID']>>;
};


export type MutationUnlinkTransactionsArgs = {
  primaryJournalIds: Array<InputMaybe<Scalars['UUID']>>;
};


export type MutationUpdateAccountGroupingArgs = {
  id: Scalars['UUID'];
  input: UpdateAccountGroupingInput;
};


export type MutationUpdateAccountsArgs = {
  filter: AccountFilter;
  input: UpdateAccountInput;
};


export type MutationUpdateBillsArgs = {
  filter: BillFilter;
  input: UpdateBillInput;
};


export type MutationUpdateBudgetsArgs = {
  filter: BudgetFilter;
  input: UpdateBudgetInput;
};


export type MutationUpdateCategoriesArgs = {
  filter: CategoryFilter;
  input: UpdateCategoryInput;
};


export type MutationUpdateJournalEntriesArgs = {
  filter: JournalEntryFilter;
  input: UpdateJournalInput;
};


export type MutationUpdateTagsArgs = {
  filter: TagFilter;
  input: UpdateTagInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type NumberFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  accountGrouping?: Maybe<AccountGrouping>;
  accountGroupings: Array<AccountGrouping>;
  accounts: AccountsReturn;
  bill: Bill;
  bills?: Maybe<BillsReturn>;
  budget: Budget;
  budgets?: Maybe<BudgetsReturn>;
  categories?: Maybe<CategoriesReturn>;
  category: Category;
  importDataCheck?: Maybe<ImportDataReturn>;
  journalEntries?: Maybe<JournalEntriesReturn>;
  journalEntry: JournalEntry;
  tag: Tag;
  tags?: Maybe<TagsReturn>;
  testResult?: Maybe<TestResult>;
  user?: Maybe<User>;
};


export type QueryAccountArgs = {
  id: Scalars['UUID'];
};


export type QueryAccountGroupingArgs = {
  id: Scalars['UUID'];
};


export type QueryAccountsArgs = {
  filter?: InputMaybe<AccountFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<AccountSort>>;
};


export type QueryBillArgs = {
  id: Scalars['UUID'];
};


export type QueryBillsArgs = {
  filter?: InputMaybe<BillFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BillSort>>;
};


export type QueryBudgetArgs = {
  id: Scalars['UUID'];
};


export type QueryBudgetsArgs = {
  filter?: InputMaybe<BudgetFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BudgetSort>>;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<CategorySort>>;
};


export type QueryCategoryArgs = {
  id: Scalars['UUID'];
};


export type QueryImportDataCheckArgs = {
  accountGroupingId: Scalars['String'];
  data: Array<InputMaybe<ImportDataInput>>;
};


export type QueryJournalEntriesArgs = {
  filter?: InputMaybe<JournalEntryFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<JournalEntrySort>>;
};


export type QueryJournalEntryArgs = {
  id: Scalars['UUID'];
};


export type QueryTagArgs = {
  id: Scalars['UUID'];
};


export type QueryTagsArgs = {
  filter?: InputMaybe<TagFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TagSort>>;
};


export type QueryTestResultArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum StatusEnum {
  Active = 'Active',
  Deleted = 'Deleted',
  Disabled = 'Disabled'
}

export type StatusFilter = {
  equals?: InputMaybe<StatusEnum>;
  in?: InputMaybe<Array<InputMaybe<StatusEnum>>>;
  not?: InputMaybe<StatusEnum>;
  notIn?: InputMaybe<Array<InputMaybe<StatusEnum>>>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  not?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  accountGrouping?: Maybe<AccountGrouping>;
  active: Scalars['Boolean'];
  allowUpdate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  group: Scalars['String'];
  id: Scalars['UUID'];
  single: Scalars['String'];
  status: StatusEnum;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userIsAdmin: Scalars['Boolean'];
};

export type TagFilter = {
  accountGrouping?: InputMaybe<AccountGroupingFilter>;
  accountGroupingId?: InputMaybe<AccountGroupingIdFilter>;
  active?: InputMaybe<BooleanFilter>;
  allowUpdate?: InputMaybe<BooleanFilter>;
  deleted?: InputMaybe<BooleanFilter>;
  disabled?: InputMaybe<BooleanFilter>;
  group?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  single?: InputMaybe<StringFilter>;
  status?: InputMaybe<StatusFilter>;
  title?: InputMaybe<StringFilter>;
};

export type TagSort = {
  accountGrouping?: InputMaybe<AccountGroupingSort>;
  active?: InputMaybe<SortDirection>;
  allowUpdate?: InputMaybe<SortDirection>;
  deleted?: InputMaybe<SortDirection>;
  disabled?: InputMaybe<SortDirection>;
  group?: InputMaybe<SortDirection>;
  single?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type TagsReturn = {
  __typename?: 'TagsReturn';
  count: Scalars['Int'];
  id?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
};

export type TestResult = {
  __typename?: 'TestResult';
  id: Scalars['ID'];
  requestTime: Scalars['String'];
  title: Scalars['String'];
};

export type UuidFilter = {
  equals?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  not?: InputMaybe<Scalars['UUID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
};

export type UpdateAccountGroupingInput = {
  status?: InputMaybe<StatusEnum>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateAccountInput = {
  accountGroup?: InputMaybe<Scalars['String']>;
  accountGroup2?: InputMaybe<Scalars['String']>;
  accountGroup3?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  isCash?: InputMaybe<Scalars['Boolean']>;
  isNetWorth?: InputMaybe<Scalars['Boolean']>;
  startDate?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<StatusEnum>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AccountType>;
};

export type UpdateBillInput = {
  status?: InputMaybe<StatusEnum>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateBudgetInput = {
  status?: InputMaybe<StatusEnum>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  group?: InputMaybe<Scalars['String']>;
  single?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusEnum>;
};

export type UpdateJournalInput = {
  accountId?: InputMaybe<Scalars['UUID']>;
  amount?: InputMaybe<Scalars['Float']>;
  billId?: InputMaybe<Scalars['UUID']>;
  budgetId?: InputMaybe<Scalars['UUID']>;
  categoryId?: InputMaybe<Scalars['UUID']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  dataChecked?: InputMaybe<Scalars['Boolean']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  otherAccountId?: InputMaybe<Scalars['UUID']>;
  reconciled?: InputMaybe<Scalars['Boolean']>;
  tagId?: InputMaybe<Scalars['UUID']>;
};

export type UpdateTagInput = {
  group?: InputMaybe<Scalars['String']>;
  single?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusEnum>;
};

export type UpdateUserInput = {
  currencyFormat?: InputMaybe<CurrencyFormatEnum>;
  darkMode?: InputMaybe<Scalars['Boolean']>;
  dateFormat?: InputMaybe<Scalars['String']>;
  firstMonthFY?: InputMaybe<Scalars['Int']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  admin: Scalars['Boolean'];
  currencyFormat: CurrencyFormatEnum;
  darkMode: Scalars['Boolean'];
  dateFormat: Scalars['String'];
  email: Scalars['String'];
  firstMonthFY: Scalars['Int'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserPublic = {
  __typename?: 'UserPublic';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserPublicDataFragment = { __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string };

export type AccountGroupingDataFragment = { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null };

export type GetAccountGroupingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountGroupingsQuery = { __typename?: 'Query', accountGroupings: Array<{ __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null }> };

export type CreateAccountGroupingMutationMutationVariables = Exact<{
  input: CreateAccountGroupingInput;
}>;


export type CreateAccountGroupingMutationMutation = { __typename?: 'Mutation', createAccountGrouping: { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null } };

export type UpdateAccountGroupingMutationMutationVariables = Exact<{
  id: Scalars['UUID'];
  input: UpdateAccountGroupingInput;
}>;


export type UpdateAccountGroupingMutationMutation = { __typename?: 'Mutation', updateAccountGrouping: { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null } };

export type AddUserToAccountGroupingMutationVariables = Exact<{
  id: Scalars['UUID'];
  email: Scalars['String'];
}>;


export type AddUserToAccountGroupingMutation = { __typename?: 'Mutation', addUserToAccountGrouping: { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null } };

export type RemoveUserFromAccountGroupingMutationVariables = Exact<{
  agID: Scalars['UUID'];
  userID: Scalars['String'];
}>;


export type RemoveUserFromAccountGroupingMutation = { __typename?: 'Mutation', removeUserFromAccountGrouping: { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null } };

export type SetUserToAgAdminMutationVariables = Exact<{
  agID: Scalars['UUID'];
  userID: Scalars['String'];
}>;


export type SetUserToAgAdminMutation = { __typename?: 'Mutation', setUserToAGAdmin: { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null } };

export type SetUserToAgViewMutationVariables = Exact<{
  agID: Scalars['UUID'];
  userID: Scalars['String'];
}>;


export type SetUserToAgViewMutation = { __typename?: 'Mutation', setUserToAGView: { __typename: 'AccountGrouping', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, viewUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null, adminUsers?: Array<{ __typename?: 'UserPublic', id: string, firstName: string, lastName: string, email: string } | null> | null } };

export type AccountReturnFragment = { __typename?: 'Account', id: any, title: string, isCash: boolean, isNetWorth: boolean, type: AccountType, accountGroup?: string | null, accountGroup2?: string | null, accountGroup3?: string | null, accountGroupCombined?: string | null, startDate?: any | null, endDate?: any | null, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null };

export type GetAccountsQueryVariables = Exact<{
  filter?: InputMaybe<AccountFilter>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<AccountSort> | AccountSort>;
}>;


export type GetAccountsQuery = { __typename?: 'Query', accounts: { __typename?: 'AccountsReturn', count: number, accounts: Array<{ __typename?: 'Account', id: any, title: string, isCash: boolean, isNetWorth: boolean, type: AccountType, accountGroup?: string | null, accountGroup2?: string | null, accountGroup3?: string | null, accountGroupCombined?: string | null, startDate?: any | null, endDate?: any | null, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> } };

export type AccountsDropdownQueryVariables = Exact<{
  search: Scalars['String'];
  accountGrouping: Scalars['UUID'];
}>;


export type AccountsDropdownQuery = { __typename?: 'Query', accounts: { __typename?: 'AccountsReturn', accounts: Array<{ __typename?: 'Account', id: any, accountTitleCombined?: string | null, title: string, type: AccountType }> } };

export type AccountsDropdownAllQueryVariables = Exact<{
  filter?: InputMaybe<AccountFilter>;
}>;


export type AccountsDropdownAllQuery = { __typename?: 'Query', accounts: { __typename?: 'AccountsReturn', accounts: Array<{ __typename?: 'Account', id: any, accountTitleCombined?: string | null, title: string, type: AccountType }> } };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: any, title: string, isCash: boolean, isNetWorth: boolean, type: AccountType, accountGroup?: string | null, accountGroup2?: string | null, accountGroup3?: string | null, accountGroupCombined?: string | null, startDate?: any | null, endDate?: any | null, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null } };

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccounts: Array<{ __typename?: 'Account', id: any, title: string, isCash: boolean, isNetWorth: boolean, type: AccountType, accountGroup?: string | null, accountGroup2?: string | null, accountGroup3?: string | null, accountGroupCombined?: string | null, startDate?: any | null, endDate?: any | null, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> };

export type BillReturnFragment = { __typename?: 'Bill', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null };

export type GetBillsQueryVariables = Exact<{
  filter?: InputMaybe<BillFilter>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BillSort> | BillSort>;
}>;


export type GetBillsQuery = { __typename?: 'Query', bills?: { __typename?: 'BillsReturn', count: number, bills: Array<{ __typename?: 'Bill', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> } | null };

export type BillsDropdownQueryVariables = Exact<{
  search: Scalars['String'];
  accountGrouping: Scalars['UUID'];
}>;


export type BillsDropdownQuery = { __typename?: 'Query', bills?: { __typename?: 'BillsReturn', bills: Array<{ __typename?: 'Bill', id: any, title: string }> } | null };

export type CreateBillMutationVariables = Exact<{
  input: CreateBillInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', createBill: { __typename?: 'Bill', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null } };

export type UpdateBillMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateBillInput;
}>;


export type UpdateBillMutation = { __typename?: 'Mutation', updateBills: Array<{ __typename?: 'Bill', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> };

export type BudgetReturnFragment = { __typename?: 'Budget', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null };

export type GetBudgetsQueryVariables = Exact<{
  filter?: InputMaybe<BudgetFilter>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BudgetSort> | BudgetSort>;
}>;


export type GetBudgetsQuery = { __typename?: 'Query', budgets?: { __typename?: 'BudgetsReturn', count: number, budgets: Array<{ __typename?: 'Budget', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> } | null };

export type BudgetsDropdownQueryVariables = Exact<{
  search: Scalars['String'];
  accountGrouping: Scalars['UUID'];
}>;


export type BudgetsDropdownQuery = { __typename?: 'Query', budgets?: { __typename?: 'BudgetsReturn', budgets: Array<{ __typename?: 'Budget', id: any, title: string }> } | null };

export type CreateBudgetMutationVariables = Exact<{
  input: CreateBudgetInput;
}>;


export type CreateBudgetMutation = { __typename?: 'Mutation', createBudget: { __typename?: 'Budget', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null } };

export type UpdateBudgetMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateBudgetInput;
}>;


export type UpdateBudgetMutation = { __typename?: 'Mutation', updateBudgets: Array<{ __typename?: 'Budget', id: any, title: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> };

export type CategoryReturnFragment = { __typename?: 'Category', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null };

export type GetCategoriesQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<CategorySort> | CategorySort>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoriesReturn', count: number, categories: Array<{ __typename?: 'Category', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> } | null };

export type CategoriesDropdownQueryVariables = Exact<{
  search: Scalars['String'];
  accountGrouping: Scalars['UUID'];
}>;


export type CategoriesDropdownQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoriesReturn', categories: Array<{ __typename?: 'Category', id: any, title: string }> } | null };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategories: Array<{ __typename?: 'Category', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> };

export type GetTestDataQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTestDataQuery = { __typename?: 'Query', testResult?: { __typename?: 'TestResult', id: string, title: string, requestTime: string } | null };

export type UserDisplayedDataFragment = { __typename?: 'User', id: string, admin: boolean, email: string, firstName: string, lastName: string };

export type UserPrivateDataFragment = { __typename?: 'User', darkMode: boolean, dateFormat: string, currencyFormat: CurrencyFormatEnum, firstMonthFY: number };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, admin: boolean, email: string, firstName: string, lastName: string, darkMode: boolean, dateFormat: string, currencyFormat: CurrencyFormatEnum, firstMonthFY: number } | null };

export type UpdateUserMutationMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, admin: boolean, email: string, firstName: string, lastName: string, darkMode: boolean, dateFormat: string, currencyFormat: CurrencyFormatEnum, firstMonthFY: number } };

export type CreateUserMutationMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUser: string };

export type GetImportInfoQueryVariables = Exact<{
  data: Array<InputMaybe<ImportDataInput>> | InputMaybe<ImportDataInput>;
  accountGroupingId: Scalars['String'];
}>;


export type GetImportInfoQuery = { __typename?: 'Query', importDataCheck?: { __typename?: 'ImportDataReturn', data?: Array<{ __typename?: 'ImportDataProcessed', transactionId: string, journalId?: string | null, date: string, description: string, linked: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, amount: number, accountTitle: string, accountId: string, categoryTitle?: string | null, categoryId?: string | null, billTitle?: string | null, billId?: string | null, budgetTitle?: string | null, budgetId?: string | null, tagTitle?: string | null, tagId?: string | null, status?: ImportDataReturnStatus | null }> | null, errors?: Array<{ __typename?: 'ImportReturnError', title?: string | null, message?: string | null, location?: string | null }> | null } | null };

export type JournalEntryReturnFragment = { __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null };

export type GetJournalsQueryVariables = Exact<{
  filter?: InputMaybe<JournalEntryFilter>;
  sort?: InputMaybe<Array<JournalEntrySort> | JournalEntrySort>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetJournalsQuery = { __typename?: 'Query', journalEntries?: { __typename?: 'JournalEntriesReturn', sum: number, count: number, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> } | null };

export type CreateTransactionMutationVariables = Exact<{
  input: Array<CreateJournalInput> | CreateJournalInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type CreateTransactionsMutationVariables = Exact<{
  input: Array<Array<CreateJournalInput> | CreateJournalInput> | Array<CreateJournalInput> | CreateJournalInput;
}>;


export type CreateTransactionsMutation = { __typename?: 'Mutation', createTransactions?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type UpdateSingleJournalMutationVariables = Exact<{
  id?: InputMaybe<Scalars['UUID']>;
  input: UpdateJournalInput;
}>;


export type UpdateSingleJournalMutation = { __typename?: 'Mutation', updateJournalEntries?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type UpdateJournalsByIdMutationVariables = Exact<{
  ids: Array<Scalars['UUID']> | Scalars['UUID'];
  input: UpdateJournalInput;
}>;


export type UpdateJournalsByIdMutation = { __typename?: 'Mutation', updateJournalEntries?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type UpdatePrimaryMutationVariables = Exact<{
  oldPrimaryId: Scalars['UUID'];
  newPrimaryId: Scalars['UUID'];
}>;


export type UpdatePrimaryMutation = { __typename?: 'Mutation', changePrimaryJournal?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type LinkTransactionMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type LinkTransactionMutation = { __typename?: 'Mutation', linkTransactions?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type UnlinkTransactionMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type UnlinkTransactionMutation = { __typename?: 'Mutation', unlinkTransactions?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type CompleteTransactionMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type CompleteTransactionMutation = { __typename?: 'Mutation', transactionsToComplete?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type MarkTransactionsCompleteMutationVariables = Exact<{
  ids: Array<Scalars['UUID']> | Scalars['UUID'];
}>;


export type MarkTransactionsCompleteMutation = { __typename?: 'Mutation', transactionsToComplete?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type IncompleteTransactionMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type IncompleteTransactionMutation = { __typename?: 'Mutation', transactionsToIncomplete?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type MarkTransactionsIncompleteMutationVariables = Exact<{
  ids: Array<Scalars['UUID']> | Scalars['UUID'];
}>;


export type MarkTransactionsIncompleteMutation = { __typename?: 'Mutation', transactionsToIncomplete?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type AddExpenseToJournalsMutationVariables = Exact<{
  id: Scalars['UUID'];
  expenseName: Scalars['String'];
}>;


export type AddExpenseToJournalsMutation = { __typename?: 'Mutation', addExpenseAndConnectToJournals?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type CloneTransactionsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['UUID']>> | InputMaybe<Scalars['UUID']>;
  input?: InputMaybe<UpdateJournalInput>;
}>;


export type CloneTransactionsMutation = { __typename?: 'Mutation', cloneTransactions?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type DeleteJournalsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['UUID']>> | InputMaybe<Scalars['UUID']>;
}>;


export type DeleteJournalsMutation = { __typename?: 'Mutation', deleteJournalEntries?: Array<{ __typename?: 'JournalEntry', id: any, date: any, description: string, amount: number, linked: boolean, primary: boolean, reconciled: boolean, dataChecked: boolean, complete: boolean, userIsAdmin: boolean, createdAt: any, updatedAt: any, primaryJournalId: string, editable: boolean, amountEditable: boolean, total: number, primaryJournal: { __typename?: 'JournalEntry', id: any, journalEntries: Array<{ __typename?: 'JournalEntry', id: any, amount: number, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType } }> }, accountGrouping: { __typename?: 'AccountGrouping', id: any, title: string, allowUpdate: boolean }, account: { __typename?: 'Account', id: any, title: string, allowUpdate: boolean, accountTitleCombined?: string | null, type: AccountType }, tag?: { __typename?: 'Tag', id: any, title: string, allowUpdate: boolean } | null, bill?: { __typename?: 'Bill', id: any, title: string, allowUpdate: boolean } | null, budget?: { __typename?: 'Budget', id: any, title: string, allowUpdate: boolean } | null, category?: { __typename?: 'Category', id: any, title: string, allowUpdate: boolean } | null }> | null };

export type TagReturnFragment = { __typename?: 'Tag', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null };

export type GetTagsQueryVariables = Exact<{
  filter?: InputMaybe<TagFilter>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TagSort> | TagSort>;
}>;


export type GetTagsQuery = { __typename?: 'Query', tags?: { __typename?: 'TagsReturn', count: number, tags: Array<{ __typename?: 'Tag', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> } | null };

export type TagsDropdownQueryVariables = Exact<{
  search: Scalars['String'];
  accountGrouping: Scalars['UUID'];
}>;


export type TagsDropdownQuery = { __typename?: 'Query', tags?: { __typename?: 'TagsReturn', tags: Array<{ __typename?: 'Tag', id: any, title: string }> } | null };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null } };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTags: Array<{ __typename?: 'Tag', id: any, title: string, group: string, single: string, status: StatusEnum, deleted: boolean, active: boolean, disabled: boolean, allowUpdate: boolean, createdAt: any, updatedAt: any, userIsAdmin: boolean, accountGrouping?: { __typename?: 'AccountGrouping', id: any, title: string, status: StatusEnum, allowUpdate: boolean, userIsAdmin: boolean } | null }> };

export const UserPublicDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPublicData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPublic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserPublicDataFragment, unknown>;
export const AccountGroupingDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountGroupingData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AccountGrouping"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPublicData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPublicData"}}]}}]}},...UserPublicDataFragmentDoc.definitions]} as unknown as DocumentNode<AccountGroupingDataFragment, unknown>;
export const AccountReturnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"accountReturn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCash"}},{"kind":"Field","name":{"kind":"Name","value":"isNetWorth"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"accountGroup"}},{"kind":"Field","name":{"kind":"Name","value":"accountGroup2"}},{"kind":"Field","name":{"kind":"Name","value":"accountGroup3"}},{"kind":"Field","name":{"kind":"Name","value":"accountGroupCombined"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"accountGrouping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}}]} as unknown as DocumentNode<AccountReturnFragment, unknown>;
export const BillReturnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"billReturn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"accountGrouping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}}]} as unknown as DocumentNode<BillReturnFragment, unknown>;
export const BudgetReturnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"budgetReturn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Budget"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"accountGrouping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}}]} as unknown as DocumentNode<BudgetReturnFragment, unknown>;
export const CategoryReturnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoryReturn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"single"}},{"kind":"Field","name":{"kind":"Name","value":"accountGrouping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}}]} as unknown as DocumentNode<CategoryReturnFragment, unknown>;
export const UserDisplayedDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDisplayedData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<UserDisplayedDataFragment, unknown>;
export const UserPrivateDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPrivateData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"darkMode"}},{"kind":"Field","name":{"kind":"Name","value":"dateFormat"}},{"kind":"Field","name":{"kind":"Name","value":"currencyFormat"}},{"kind":"Field","name":{"kind":"Name","value":"firstMonthFY"}}]}}]} as unknown as DocumentNode<UserPrivateDataFragment, unknown>;
export const JournalEntryReturnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryReturn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"linked"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}},{"kind":"Field","name":{"kind":"Name","value":"reconciled"}},{"kind":"Field","name":{"kind":"Name","value":"dataChecked"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"primaryJournalId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryJournal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"journalEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"accountTitleCombined"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountGrouping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"accountTitleCombined"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"amountEditable"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bill"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"budget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}}]}}]}}]} as unknown as DocumentNode<JournalEntryReturnFragment, unknown>;
export const TagReturnFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tagReturn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"single"}},{"kind":"Field","name":{"kind":"Name","value":"accountGrouping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userIsAdmin"}}]}}]} as unknown as DocumentNode<TagReturnFragment, unknown>;
export const GetAccountGroupingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccountGroupings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountGroupings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<GetAccountGroupingsQuery, GetAccountGroupingsQueryVariables>;
export const CreateAccountGroupingMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccountGroupingMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountGroupingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccountGrouping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<CreateAccountGroupingMutationMutation, CreateAccountGroupingMutationMutationVariables>;
export const UpdateAccountGroupingMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAccountGroupingMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccountGroupingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccountGrouping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateAccountGroupingMutationMutation, UpdateAccountGroupingMutationMutationVariables>;
export const AddUserToAccountGroupingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUserToAccountGrouping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUserToAccountGrouping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<AddUserToAccountGroupingMutation, AddUserToAccountGroupingMutationVariables>;
export const RemoveUserFromAccountGroupingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUserFromAccountGrouping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUserFromAccountGrouping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agID"}}},{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<RemoveUserFromAccountGroupingMutation, RemoveUserFromAccountGroupingMutationVariables>;
export const SetUserToAgAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setUserToAGAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setUserToAGAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agID"}}},{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<SetUserToAgAdminMutation, SetUserToAgAdminMutationVariables>;
export const SetUserToAgViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setUserToAGView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setUserToAGView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agID"}}},{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountGroupingData"}}]}}]}},...AccountGroupingDataFragmentDoc.definitions]} as unknown as DocumentNode<SetUserToAgViewMutation, SetUserToAgViewMutationVariables>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountSort"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"accountReturn"}}]}}]}}]}},...AccountReturnFragmentDoc.definitions]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const AccountsDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"accountsDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"accountTitleCombined"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountGroupingId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"accountTitleCombined"},"value":{"kind":"EnumValue","value":"asc"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountTitleCombined"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<AccountsDropdownQuery, AccountsDropdownQueryVariables>;
export const AccountsDropdownAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"accountsDropdownAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"accountTitleCombined"},"value":{"kind":"EnumValue","value":"asc"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountTitleCombined"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<AccountsDropdownAllQuery, AccountsDropdownAllQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"accountReturn"}}]}}]}},...AccountReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"accountReturn"}}]}}]}},...AccountReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const GetBillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBills"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BillFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillSort"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"billReturn"}}]}}]}}]}},...BillReturnFragmentDoc.definitions]} as unknown as DocumentNode<GetBillsQuery, GetBillsQueryVariables>;
export const BillsDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"billsDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountGroupingId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"EnumValue","value":"asc"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<BillsDropdownQuery, BillsDropdownQueryVariables>;
export const CreateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"billReturn"}}]}}]}},...BillReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateBillMutation, CreateBillMutationVariables>;
export const UpdateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBills"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"billReturn"}}]}}]}},...BillReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateBillMutation, UpdateBillMutationVariables>;
export const GetBudgetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBudgets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BudgetFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BudgetSort"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"budgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"budgetReturn"}}]}}]}}]}},...BudgetReturnFragmentDoc.definitions]} as unknown as DocumentNode<GetBudgetsQuery, GetBudgetsQueryVariables>;
export const BudgetsDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"budgetsDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountGroupingId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"EnumValue","value":"asc"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<BudgetsDropdownQuery, BudgetsDropdownQueryVariables>;
export const CreateBudgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBudget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBudgetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBudget"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"budgetReturn"}}]}}]}},...BudgetReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateBudgetMutation, CreateBudgetMutationVariables>;
export const UpdateBudgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBudget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBudgetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBudgets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"budgetReturn"}}]}}]}},...BudgetReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateBudgetMutation, UpdateBudgetMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategorySort"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryReturn"}}]}}]}}]}},...CategoryReturnFragmentDoc.definitions]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const CategoriesDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categoriesDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountGroupingId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"EnumValue","value":"asc"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesDropdownQuery, CategoriesDropdownQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryReturn"}}]}}]}},...CategoryReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoryReturn"}}]}}]}},...CategoryReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const GetTestDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTestData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"requestTime"}}]}}]}}]} as unknown as DocumentNode<GetTestDataQuery, GetTestDataQueryVariables>;
export const GetUserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDisplayedData"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPrivateData"}}]}}]}},...UserDisplayedDataFragmentDoc.definitions,...UserPrivateDataFragmentDoc.definitions]} as unknown as DocumentNode<GetUserDataQuery, GetUserDataQueryVariables>;
export const UpdateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDisplayedData"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPrivateData"}}]}}]}},...UserDisplayedDataFragmentDoc.definitions,...UserPrivateDataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;
export const CreateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
export const GetImportInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getImportInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportDataInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountGroupingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importDataCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountGroupingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountGroupingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionId"}},{"kind":"Field","name":{"kind":"Name","value":"journalId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"linked"}},{"kind":"Field","name":{"kind":"Name","value":"reconciled"}},{"kind":"Field","name":{"kind":"Name","value":"dataChecked"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"accountTitle"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryTitle"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"billTitle"}},{"kind":"Field","name":{"kind":"Name","value":"billId"}},{"kind":"Field","name":{"kind":"Name","value":"budgetTitle"}},{"kind":"Field","name":{"kind":"Name","value":"budgetId"}},{"kind":"Field","name":{"kind":"Name","value":"tagTitle"}},{"kind":"Field","name":{"kind":"Name","value":"tagId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<GetImportInfoQuery, GetImportInfoQueryVariables>;
export const GetJournalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJournals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntryFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntrySort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journalEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sum"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<GetJournalsQuery, GetJournalsQueryVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJournalInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const CreateTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJournalInput"}}}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateTransactionsMutation, CreateTransactionsMutationVariables>;
export const UpdateSingleJournalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSingleJournal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJournalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJournalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateSingleJournalMutation, UpdateSingleJournalMutationVariables>;
export const UpdateJournalsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJournalsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJournalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJournalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateJournalsByIdMutation, UpdateJournalsByIdMutationVariables>;
export const UpdatePrimaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrimary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPrimaryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPrimaryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePrimaryJournal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPrimaryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPrimaryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPrimaryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPrimaryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdatePrimaryMutation, UpdatePrimaryMutationVariables>;
export const LinkTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryJournalIds"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"id"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<LinkTransactionMutation, LinkTransactionMutationVariables>;
export const UnlinkTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlinkTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlinkTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryJournalIds"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"id"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<UnlinkTransactionMutation, UnlinkTransactionMutationVariables>;
export const CompleteTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionsToComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryJournalIds"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"id"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<CompleteTransactionMutation, CompleteTransactionMutationVariables>;
export const MarkTransactionsCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkTransactionsComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionsToComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryJournalIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<MarkTransactionsCompleteMutation, MarkTransactionsCompleteMutationVariables>;
export const IncompleteTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IncompleteTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionsToIncomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryJournalIds"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"id"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<IncompleteTransactionMutation, IncompleteTransactionMutationVariables>;
export const MarkTransactionsIncompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkTransactionsIncomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionsToIncomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primaryJournalIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<MarkTransactionsIncompleteMutation, MarkTransactionsIncompleteMutationVariables>;
export const AddExpenseToJournalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddExpenseToJournals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExpenseAndConnectToJournals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseName"}}},{"kind":"Argument","name":{"kind":"Name","value":"journalIds"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"id"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<AddExpenseToJournalsMutation, AddExpenseToJournalsMutationVariables>;
export const CloneTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CloneTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJournalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cloneTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<CloneTransactionsMutation, CloneTransactionsMutationVariables>;
export const DeleteJournalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJournals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteJournalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"journalIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryReturn"}}]}}]}},...JournalEntryReturnFragmentDoc.definitions]} as unknown as DocumentNode<DeleteJournalsMutation, DeleteJournalsMutationVariables>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TagFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagSort"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tagReturn"}}]}}]}}]}},...TagReturnFragmentDoc.definitions]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const TagsDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tagsDropdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"accountGroupingId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountGrouping"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"EnumValue","value":"asc"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<TagsDropdownQuery, TagsDropdownQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tagReturn"}}]}}]}},...TagReturnFragmentDoc.definitions]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tagReturn"}}]}}]}},...TagReturnFragmentDoc.definitions]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;