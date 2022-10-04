import type {
	AccountGroupingResolvers,
	AccountResolvers,
	BillResolvers,
	BudgetResolvers,
	CategoryResolvers,
	JournalEntryResolvers,
	MutationResolvers,
	QueryResolvers,
	Resolvers,
	TagResolvers
} from '$lib/server/graphqlServer/types/generated-resolvers';

import type {
	AccountGroupingModel,
	AccountModel,
	BillModel,
	BudgetModel,
	CategoryModel,
	JournalEntryModel,
	TagModel
} from './models';
import type { GraphqlContext } from './yogaContext';

export type GraphqlContextUse = GraphqlContext;
export type GraphqlResolvers = Resolvers<GraphqlContext>;
export type GraphqlQueryResolvers = QueryResolvers<GraphqlContext>;
export type GraphqlMutationResolvers = MutationResolvers<GraphqlContext>;
export type GraphqlAccountGroupingResolvers = AccountGroupingResolvers<GraphqlContext>;
export type GraphqlAccountResolvers = AccountResolvers<GraphqlContext>;
export type GraphqlJournalEntry = JournalEntryResolvers<GraphqlContext, JournalEntryModel>;
export type GraphqlAccount = AccountResolvers<GraphqlContext, AccountModel>;
export type GraphqlAccountGrouping = AccountGroupingResolvers<GraphqlContext, AccountGroupingModel>;
export type GraphqlBill = BillResolvers<GraphqlContext, BillModel>;
export type GraphqlBudget = BudgetResolvers<GraphqlContext, BudgetModel>;
export type GraphqlCategory = CategoryResolvers<GraphqlContext, CategoryModel>;
export type GraphqlTag = TagResolvers<GraphqlContext, TagModel>;
