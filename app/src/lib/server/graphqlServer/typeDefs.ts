import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

import { accountGroupingsSchema } from './graphql/accountGroupings';
import { accountsSchema } from './graphql/accounts';
import { billsSchema } from './graphql/bills';
import { budgetsSchema } from './graphql/budgets';
import { categoriesSchema } from './graphql/categories';
import { importSchema } from './graphql/import';
import { journalEntriesSchema } from './graphql/journalEntries';
import { standardFunctionsSchema } from './graphql/standardFunctions';
import { tagsSchema } from './graphql/tags';
import { testSchema } from './graphql/test';
import { usersSchema } from './graphql/users';

export const getTypeDefs = () => {
	// return await loadSchema('src/lib/graphqlServer/combinedSchema/schema.graphql', {
	// 	loaders: [new GraphQLFileLoader()]
	//   })
	// const loadedFiles = loadFilesSync(`src/lib/graphqlServer/graphql/*.graphql`, {
	// 	extensions: ['graphql']
	// });
	const typeDefs = mergeTypeDefs([
		accountGroupingsSchema,
		accountsSchema,
		journalEntriesSchema,
		standardFunctionsSchema,
		testSchema,
		usersSchema,
		tagsSchema,
		billsSchema,
		budgetsSchema,
		categoriesSchema,
		importSchema,
		...scalarTypeDefs
	]);

	return typeDefs;
};
