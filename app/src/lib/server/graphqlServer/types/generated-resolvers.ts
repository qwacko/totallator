import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { JournalEntryModel, AccountModel, AccountGroupingModel, BillModel, BudgetModel, CategoryModel, TagModel } from './src/lib/server/graphqlServer/types/models';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type AccountType =
  | 'Asset'
  | 'Expense'
  | 'Income'
  | 'Liability';

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

export type CurrencyFormatEnum =
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'USD';

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

export type EmptyFirst =
  | 'EMPTY_FIRST'
  | 'EMPTY_LAST';

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
  foundJournalID?: Maybe<Scalars['String']>;
  journalId?: Maybe<Scalars['String']>;
  linked: Scalars['Boolean'];
  reconciled: Scalars['Boolean'];
  status: Array<ImportDataReturnStatus>;
  tagId?: Maybe<Scalars['String']>;
  tagTitle?: Maybe<Scalars['String']>;
  transactionId: Scalars['String'];
};

export type ImportDataReturn = {
  __typename?: 'ImportDataReturn';
  data?: Maybe<Array<ImportDataProcessed>>;
  errors?: Maybe<Array<ImportReturnError>>;
};

export type ImportDataReturnStatus =
  | 'journalIdMatch'
  | 'referenceOnly'
  | 'similarJournalFound'
  | 'transactionIdMatch';

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
  data: Array<ImportDataInput>;
  excludeCheckJournalDetails?: InputMaybe<Scalars['Boolean']>;
  excludeCheckJournalId?: InputMaybe<Scalars['Boolean']>;
  excludeCheckTransactionId?: InputMaybe<Scalars['Boolean']>;
  excludeTransactions?: InputMaybe<Scalars['Boolean']>;
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

export type SortDirection =
  | 'asc'
  | 'desc';

export type StatusEnum =
  | 'Active'
  | 'Deleted'
  | 'Disabled';

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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<AccountModel>;
  AccountFilter: AccountFilter;
  AccountGrouping: ResolverTypeWrapper<AccountGroupingModel>;
  AccountGroupingFilter: AccountGroupingFilter;
  AccountGroupingIdFilter: AccountGroupingIdFilter;
  AccountGroupingSort: AccountGroupingSort;
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']>;
  AccountSort: AccountSort;
  AccountType: AccountType;
  AccountTypeFilter: AccountTypeFilter;
  AccountsReturn: ResolverTypeWrapper<Omit<AccountsReturn, 'accounts'> & { accounts: Array<ResolversTypes['Account']> }>;
  AddJournalInput: AddJournalInput;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Bill: ResolverTypeWrapper<BillModel>;
  BillFilter: BillFilter;
  BillSort: BillSort;
  BillsReturn: ResolverTypeWrapper<Omit<BillsReturn, 'bills'> & { bills: Array<ResolversTypes['Bill']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFilter: BooleanFilter;
  Budget: ResolverTypeWrapper<BudgetModel>;
  BudgetFilter: BudgetFilter;
  BudgetSort: BudgetSort;
  BudgetsReturn: ResolverTypeWrapper<Omit<BudgetsReturn, 'budgets'> & { budgets: Array<ResolversTypes['Budget']> }>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CategoriesReturn: ResolverTypeWrapper<Omit<CategoriesReturn, 'categories'> & { categories: Array<ResolversTypes['Category']> }>;
  Category: ResolverTypeWrapper<CategoryModel>;
  CategoryFilter: CategoryFilter;
  CategorySort: CategorySort;
  ConnectOrCreateAccount: ConnectOrCreateAccount;
  ConnectOrCreateBill: ConnectOrCreateBill;
  ConnectOrCreateBudget: ConnectOrCreateBudget;
  ConnectOrCreateCategory: ConnectOrCreateCategory;
  ConnectOrCreateTag: ConnectOrCreateTag;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  CreateAccountGroupingInput: CreateAccountGroupingInput;
  CreateAccountInput: CreateAccountInput;
  CreateBillInput: CreateBillInput;
  CreateBudgetInput: CreateBudgetInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateJournalInput: CreateJournalInput;
  CreateTagInput: CreateTagInput;
  CreateUserInput: CreateUserInput;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  CurrencyFormatEnum: CurrencyFormatEnum;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateFilter: DateFilter;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  EmptyFirst: EmptyFirst;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  ImportDataInput: ImportDataInput;
  ImportDataProcessed: ResolverTypeWrapper<ImportDataProcessed>;
  ImportDataReturn: ResolverTypeWrapper<ImportDataReturn>;
  ImportDataReturnStatus: ImportDataReturnStatus;
  ImportReturnError: ResolverTypeWrapper<ImportReturnError>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  JournalEntriesFilter: JournalEntriesFilter;
  JournalEntriesReturn: ResolverTypeWrapper<Omit<JournalEntriesReturn, 'journalEntries'> & { journalEntries: Array<ResolversTypes['JournalEntry']> }>;
  JournalEntry: ResolverTypeWrapper<JournalEntryModel>;
  JournalEntryFilter: JournalEntryFilter;
  JournalEntryFilterSingle: JournalEntryFilterSingle;
  JournalEntryFilterWithoutPrimary: JournalEntryFilterWithoutPrimary;
  JournalEntrySort: JournalEntrySort;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  NumberFilter: NumberFilter;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  SortDirection: SortDirection;
  StatusEnum: StatusEnum;
  StatusFilter: StatusFilter;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringFilter: StringFilter;
  Tag: ResolverTypeWrapper<TagModel>;
  TagFilter: TagFilter;
  TagSort: TagSort;
  TagsReturn: ResolverTypeWrapper<Omit<TagsReturn, 'tags'> & { tags: Array<ResolversTypes['Tag']> }>;
  TestResult: ResolverTypeWrapper<TestResult>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UUIDFilter: UuidFilter;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  UpdateAccountGroupingInput: UpdateAccountGroupingInput;
  UpdateAccountInput: UpdateAccountInput;
  UpdateBillInput: UpdateBillInput;
  UpdateBudgetInput: UpdateBudgetInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateJournalInput: UpdateJournalInput;
  UpdateTagInput: UpdateTagInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserPublic: ResolverTypeWrapper<UserPublic>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: AccountModel;
  AccountFilter: AccountFilter;
  AccountGrouping: AccountGroupingModel;
  AccountGroupingFilter: AccountGroupingFilter;
  AccountGroupingIdFilter: AccountGroupingIdFilter;
  AccountGroupingSort: AccountGroupingSort;
  AccountNumber: Scalars['AccountNumber'];
  AccountSort: AccountSort;
  AccountTypeFilter: AccountTypeFilter;
  AccountsReturn: Omit<AccountsReturn, 'accounts'> & { accounts: Array<ResolversParentTypes['Account']> };
  AddJournalInput: AddJournalInput;
  BigInt: Scalars['BigInt'];
  Bill: BillModel;
  BillFilter: BillFilter;
  BillSort: BillSort;
  BillsReturn: Omit<BillsReturn, 'bills'> & { bills: Array<ResolversParentTypes['Bill']> };
  Boolean: Scalars['Boolean'];
  BooleanFilter: BooleanFilter;
  Budget: BudgetModel;
  BudgetFilter: BudgetFilter;
  BudgetSort: BudgetSort;
  BudgetsReturn: Omit<BudgetsReturn, 'budgets'> & { budgets: Array<ResolversParentTypes['Budget']> };
  Byte: Scalars['Byte'];
  CategoriesReturn: Omit<CategoriesReturn, 'categories'> & { categories: Array<ResolversParentTypes['Category']> };
  Category: CategoryModel;
  CategoryFilter: CategoryFilter;
  CategorySort: CategorySort;
  ConnectOrCreateAccount: ConnectOrCreateAccount;
  ConnectOrCreateBill: ConnectOrCreateBill;
  ConnectOrCreateBudget: ConnectOrCreateBudget;
  ConnectOrCreateCategory: ConnectOrCreateCategory;
  ConnectOrCreateTag: ConnectOrCreateTag;
  CountryCode: Scalars['CountryCode'];
  CreateAccountGroupingInput: CreateAccountGroupingInput;
  CreateAccountInput: CreateAccountInput;
  CreateBillInput: CreateBillInput;
  CreateBudgetInput: CreateBudgetInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateJournalInput: CreateJournalInput;
  CreateTagInput: CreateTagInput;
  CreateUserInput: CreateUserInput;
  Currency: Scalars['Currency'];
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateFilter: DateFilter;
  DateTime: Scalars['DateTime'];
  Duration: Scalars['Duration'];
  EmailAddress: Scalars['EmailAddress'];
  Float: Scalars['Float'];
  GUID: Scalars['GUID'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  ID: Scalars['ID'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  ImportDataInput: ImportDataInput;
  ImportDataProcessed: ImportDataProcessed;
  ImportDataReturn: ImportDataReturn;
  ImportReturnError: ImportReturnError;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  JournalEntriesFilter: JournalEntriesFilter;
  JournalEntriesReturn: Omit<JournalEntriesReturn, 'journalEntries'> & { journalEntries: Array<ResolversParentTypes['JournalEntry']> };
  JournalEntry: JournalEntryModel;
  JournalEntryFilter: JournalEntryFilter;
  JournalEntryFilterSingle: JournalEntryFilterSingle;
  JournalEntryFilterWithoutPrimary: JournalEntryFilterWithoutPrimary;
  JournalEntrySort: JournalEntrySort;
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Locale: Scalars['Locale'];
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  NumberFilter: NumberFilter;
  ObjectID: Scalars['ObjectID'];
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  RoutingNumber: Scalars['RoutingNumber'];
  SafeInt: Scalars['SafeInt'];
  StatusFilter: StatusFilter;
  String: Scalars['String'];
  StringFilter: StringFilter;
  Tag: TagModel;
  TagFilter: TagFilter;
  TagSort: TagSort;
  TagsReturn: Omit<TagsReturn, 'tags'> & { tags: Array<ResolversParentTypes['Tag']> };
  TestResult: TestResult;
  Time: Scalars['Time'];
  TimeZone: Scalars['TimeZone'];
  Timestamp: Scalars['Timestamp'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UUIDFilter: UuidFilter;
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  UpdateAccountGroupingInput: UpdateAccountGroupingInput;
  UpdateAccountInput: UpdateAccountInput;
  UpdateBillInput: UpdateBillInput;
  UpdateBudgetInput: UpdateBudgetInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateJournalInput: UpdateJournalInput;
  UpdateTagInput: UpdateTagInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserPublic: UserPublic;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  accountGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountGroup2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountGroup3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountGroupCombined?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountGrouping?: Resolver<Maybe<ResolversTypes['AccountGrouping']>, ParentType, ContextType>;
  accountTitleCombined?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isCash?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isNetWorth?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountGroupingResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountGrouping'] = ResolversParentTypes['AccountGrouping']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  adminUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserPublic']>>>, ParentType, ContextType>;
  allUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserPublic']>>>, ParentType, ContextType>;
  allowUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  viewUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserPublic']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AccountsReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountsReturn'] = ResolversParentTypes['AccountsReturn']> = {
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bill'] = ResolversParentTypes['Bill']> = {
  accountGrouping?: Resolver<Maybe<ResolversTypes['AccountGrouping']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillsReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['BillsReturn'] = ResolversParentTypes['BillsReturn']> = {
  bills?: Resolver<Array<ResolversTypes['Bill']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BudgetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Budget'] = ResolversParentTypes['Budget']> = {
  accountGrouping?: Resolver<Maybe<ResolversTypes['AccountGrouping']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BudgetsReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['BudgetsReturn'] = ResolversParentTypes['BudgetsReturn']> = {
  budgets?: Resolver<Array<ResolversTypes['Budget']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type CategoriesReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriesReturn'] = ResolversParentTypes['CategoriesReturn']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  accountGrouping?: Resolver<Maybe<ResolversTypes['AccountGrouping']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  single?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export type ImportDataProcessedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportDataProcessed'] = ResolversParentTypes['ImportDataProcessed']> = {
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  billId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budgetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budgetTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categoryTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dataChecked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  foundJournalID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  journalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reconciled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<Array<ResolversTypes['ImportDataReturnStatus']>, ParentType, ContextType>;
  tagId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportDataReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportDataReturn'] = ResolversParentTypes['ImportDataReturn']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['ImportDataProcessed']>>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ImportReturnError']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportReturnErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportReturnError'] = ResolversParentTypes['ImportReturnError']> = {
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type JournalEntriesReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['JournalEntriesReturn'] = ResolversParentTypes['JournalEntriesReturn']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  journalEntries?: Resolver<Array<ResolversTypes['JournalEntry']>, ParentType, ContextType>;
  sum?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JournalEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['JournalEntry'] = ResolversParentTypes['JournalEntry']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  accountGrouping?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType>;
  accountGroupingId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  amountEditable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bill?: Resolver<Maybe<ResolversTypes['Bill']>, ParentType, ContextType>;
  budget?: Resolver<Maybe<ResolversTypes['Budget']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dataChecked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  editable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  journalEntries?: Resolver<Array<ResolversTypes['JournalEntry']>, ParentType, ContextType>;
  linked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  primary?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  primaryJournal?: Resolver<ResolversTypes['JournalEntry'], ParentType, ContextType>;
  primaryJournalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reconciled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addExpenseAndConnectToJournals?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationAddExpenseAndConnectToJournalsArgs, 'expenseName' | 'journalIds'>>;
  addJournalEntries?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, Partial<MutationAddJournalEntriesArgs>>;
  addUserToAccountGrouping?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType, RequireFields<MutationAddUserToAccountGroupingArgs, 'email' | 'id'>>;
  changePrimaryJournal?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationChangePrimaryJournalArgs, 'newPrimaryId' | 'oldPrimaryId'>>;
  cloneTransactions?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationCloneTransactionsArgs, 'ids'>>;
  createAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'input'>>;
  createAccountGrouping?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType, RequireFields<MutationCreateAccountGroupingArgs, 'input'>>;
  createBill?: Resolver<ResolversTypes['Bill'], ParentType, ContextType, RequireFields<MutationCreateBillArgs, 'input'>>;
  createBudget?: Resolver<ResolversTypes['Budget'], ParentType, ContextType, RequireFields<MutationCreateBudgetArgs, 'input'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'input'>>;
  createTransaction?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationCreateTransactionArgs, 'input'>>;
  createTransactions?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationCreateTransactionsArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deleteJournalEntries?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationDeleteJournalEntriesArgs, 'journalIds'>>;
  linkTransactions?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationLinkTransactionsArgs, 'primaryJournalIds'>>;
  removeUserFromAccountGrouping?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType, RequireFields<MutationRemoveUserFromAccountGroupingArgs, 'agID' | 'userID'>>;
  setUserToAGAdmin?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType, RequireFields<MutationSetUserToAgAdminArgs, 'agID' | 'userID'>>;
  setUserToAGView?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType, RequireFields<MutationSetUserToAgViewArgs, 'agID' | 'userID'>>;
  transactionsToComplete?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationTransactionsToCompleteArgs, 'primaryJournalIds'>>;
  transactionsToIncomplete?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationTransactionsToIncompleteArgs, 'primaryJournalIds'>>;
  unlinkTransactions?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationUnlinkTransactionsArgs, 'primaryJournalIds'>>;
  updateAccountGrouping?: Resolver<ResolversTypes['AccountGrouping'], ParentType, ContextType, RequireFields<MutationUpdateAccountGroupingArgs, 'id' | 'input'>>;
  updateAccounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<MutationUpdateAccountsArgs, 'filter' | 'input'>>;
  updateBills?: Resolver<Array<ResolversTypes['Bill']>, ParentType, ContextType, RequireFields<MutationUpdateBillsArgs, 'filter' | 'input'>>;
  updateBudgets?: Resolver<Array<ResolversTypes['Budget']>, ParentType, ContextType, RequireFields<MutationUpdateBudgetsArgs, 'filter' | 'input'>>;
  updateCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationUpdateCategoriesArgs, 'filter' | 'input'>>;
  updateJournalEntries?: Resolver<Maybe<Array<ResolversTypes['JournalEntry']>>, ParentType, ContextType, RequireFields<MutationUpdateJournalEntriesArgs, 'filter' | 'input'>>;
  updateTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationUpdateTagsArgs, 'filter' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<QueryAccountArgs, 'id'>>;
  accountGrouping?: Resolver<Maybe<ResolversTypes['AccountGrouping']>, ParentType, ContextType, RequireFields<QueryAccountGroupingArgs, 'id'>>;
  accountGroupings?: Resolver<Array<ResolversTypes['AccountGrouping']>, ParentType, ContextType>;
  accounts?: Resolver<ResolversTypes['AccountsReturn'], ParentType, ContextType, Partial<QueryAccountsArgs>>;
  bill?: Resolver<ResolversTypes['Bill'], ParentType, ContextType, RequireFields<QueryBillArgs, 'id'>>;
  bills?: Resolver<Maybe<ResolversTypes['BillsReturn']>, ParentType, ContextType, Partial<QueryBillsArgs>>;
  budget?: Resolver<ResolversTypes['Budget'], ParentType, ContextType, RequireFields<QueryBudgetArgs, 'id'>>;
  budgets?: Resolver<Maybe<ResolversTypes['BudgetsReturn']>, ParentType, ContextType, Partial<QueryBudgetsArgs>>;
  categories?: Resolver<Maybe<ResolversTypes['CategoriesReturn']>, ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  importDataCheck?: Resolver<Maybe<ResolversTypes['ImportDataReturn']>, ParentType, ContextType, RequireFields<QueryImportDataCheckArgs, 'accountGroupingId' | 'data'>>;
  journalEntries?: Resolver<Maybe<ResolversTypes['JournalEntriesReturn']>, ParentType, ContextType, Partial<QueryJournalEntriesArgs>>;
  journalEntry?: Resolver<ResolversTypes['JournalEntry'], ParentType, ContextType, RequireFields<QueryJournalEntryArgs, 'id'>>;
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<QueryTagArgs, 'id'>>;
  tags?: Resolver<Maybe<ResolversTypes['TagsReturn']>, ParentType, ContextType, Partial<QueryTagsArgs>>;
  testResult?: Resolver<Maybe<ResolversTypes['TestResult']>, ParentType, ContextType, Partial<QueryTestResultArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  accountGrouping?: Resolver<Maybe<ResolversTypes['AccountGrouping']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  single?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userIsAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagsReturn'] = ResolversParentTypes['TagsReturn']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestResult'] = ResolversParentTypes['TestResult']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  requestTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currencyFormat?: Resolver<ResolversTypes['CurrencyFormatEnum'], ParentType, ContextType>;
  darkMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dateFormat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstMonthFY?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPublicResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPublic'] = ResolversParentTypes['UserPublic']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AccountGrouping?: AccountGroupingResolvers<ContextType>;
  AccountNumber?: GraphQLScalarType;
  AccountsReturn?: AccountsReturnResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Bill?: BillResolvers<ContextType>;
  BillsReturn?: BillsReturnResolvers<ContextType>;
  Budget?: BudgetResolvers<ContextType>;
  BudgetsReturn?: BudgetsReturnResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  CategoriesReturn?: CategoriesReturnResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  ImportDataProcessed?: ImportDataProcessedResolvers<ContextType>;
  ImportDataReturn?: ImportDataReturnResolvers<ContextType>;
  ImportReturnError?: ImportReturnErrorResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  JournalEntriesReturn?: JournalEntriesReturnResolvers<ContextType>;
  JournalEntry?: JournalEntryResolvers<ContextType>;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Tag?: TagResolvers<ContextType>;
  TagsReturn?: TagsReturnResolvers<ContextType>;
  TestResult?: TestResultResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserPublic?: UserPublicResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

