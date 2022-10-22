import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { importJSONValidation } from '$lib/utils/importValidation/importJSONValidation';
import { GraphQLYogaError } from '@graphql-yoga/common';
import { buildCompleteImport } from '../helpers/import/buildCompleteImport';
import { categoriseJournalImports } from '../helpers/import/categoriseJournalImports';
import { checkImportInfo } from '../helpers/import/checkImportInfo';
import { getOtherInformationForImport } from '../helpers/import/getOtherInformationForImport';
import { importGetUniqueItems } from '../helpers/import/importGetUniqueItems';

export const importDataCheck: GraphqlQueryResolvers['importDataCheck'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);
	const accountGrouping = admin
		? await prisma.accountGrouping.findMany({
				where: { id: args.accountGroupingId }
		  })
		: await prisma.accountGrouping.findMany({
				where: { id: args.accountGroupingId, adminUsers: { some: { id: { equals: userId } } } }
		  });

	if (!accountGrouping) {
		throw new GraphQLYogaError('User Cannot Access Chosen Account Grouping');
	}

	const validated = importJSONValidation.safeParse(args.data);

	if (!validated.success) {
		console.log('There was an error');
		return {
			errors: validated.error.errors.map((error) => ({
				title: error.code,
				location: `${error.path}`,
				message: error.message
			}))
		};
	}

	const result = await getOtherInformationForImport(validated.data, args.accountGroupingId);

	// If there is an error in the checking of other data, then return this
	if (result.errors && result.errors.length > 0) {
		return { errors: result.errors };
	}

	//Get all the unique information (Probably can be removed)
	// const uniqueInfo = importGetUniqueItems(validated.data.journals);

	// const { errorArray, matches } = await checkImportInfo(uniqueInfo, args.accountGroupingId);

	// if (errorArray.length > 0) return { errors: errorArray };

	// const processedData = buildCompleteImport(
	// 	validated.data.journals,
	// 	matches,
	// 	args.accountGroupingId
	// );
	// const withAddedDetails = await categoriseJournalImports(processedData, args.accountGroupingId);

	return { data: { ...result.data } };
};
