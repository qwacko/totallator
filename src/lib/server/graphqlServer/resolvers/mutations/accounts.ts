import { authCheckPrisma } from '$lib/server/auth/authCheck';
import { accountInclude } from '$lib/server/graphqlServer/types/models';
import type { GraphqlMutationResolvers } from '$lib/server/graphqlServer/types/resolvers';
import prisma from '$lib/server/prisma/client';

import { AccountUpdateValidation } from '../helpers/accounts/AccountCreateUpdateValidation';
import { CreateAccount } from '../helpers/accounts/CreateAccount';
import { accountFilterBuilder } from '../helpers/accounts/accountFilterBuilder';
import { generateAccountSummary } from '../helpers/accounts/generateAccountSummary';
import { basicStatusToDB } from '../helpers/general/basicStatusToDB';

export const createAccount: GraphqlMutationResolvers['createAccount'] = async (
	_,
	args,
	context
) => {
	return CreateAccount({ client: prisma, data: args.input, ...authCheckPrisma(context) });
};

export const updateAccounts: GraphqlMutationResolvers['updateAccounts'] = async (
	_,
	args,
	context
) => {
	const { userId, admin } = authCheckPrisma(context);
	const validatedInput = AccountUpdateValidation.parse(args.input);

	const targetAccounts = await prisma.account.findMany({
		where: accountFilterBuilder({
			admin,
			filter: args.filter,
			userId,
			requireAdmin: true
		})
	});

	return prisma.$transaction(
		targetAccounts.map((account) => {
			const newAccountGroupInfo = {
				accountGroup:
					validatedInput.accountGroup !== undefined
						? validatedInput.accountGroup
						: account.accountGroup,
				accountGroup2:
					validatedInput.accountGroup2 !== undefined
						? validatedInput.accountGroup2
						: account.accountGroup2,
				accountGroup3:
					validatedInput.accountGroup3 !== undefined
						? validatedInput.accountGroup3
						: account.accountGroup3,
				title: validatedInput.title ? validatedInput.title : account.title
			};

			return prisma.account.update({
				where: { id: account.id },
				data: {
					...validatedInput,
					...(validatedInput.status ? basicStatusToDB(validatedInput.status) : {}),
					...generateAccountSummary(newAccountGroupInfo)
				},
				include: accountInclude
			});
		})
	);
};
