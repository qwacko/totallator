import { authCheckPrisma } from '$lib/server/auth/authCheck';
import type { GraphqlQueryResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';
import { importJSONValidation } from '$lib/utils/importValidation/importJSONValidation';
import { GraphQLYogaError } from '@graphql-yoga/common';
import { getOtherInformationForImport } from '../helpers/import/getOtherInformationForImport';
import { getJournalImportInfo } from '../helpers/import/getJournalImportInfo';

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
	// Now Check and process the import data
	const journalsResult = await getJournalImportInfo(validated.data, args.accountGroupingId);

	return { data: { ...result.data } };
};
