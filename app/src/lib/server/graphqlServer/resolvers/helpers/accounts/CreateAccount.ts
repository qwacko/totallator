import type { CreateAccountInput } from '$lib/server/graphqlServer/types/generated-resolvers';
import { accountInclude } from '$lib/server/graphqlServer/types/models';
import type { Prisma, PrismaClient } from '@prisma/client';

import { basicStatusToDBRequired } from '../general/basicStatusToDB';
import { checkAGAccess } from '../general/checkAGAccess';
import {
	AccountCreateValidation,
	type CreateAccountValidatedData
} from './AccountCreateUpdateValidation';
import { generateAccountSummary } from './generateAccountSummary';

export const CreateAccount = async ({
	client,
	userId,
	admin,
	data
}: {
	client: PrismaClient | Prisma.TransactionClient;
	data: CreateAccountValidatedData | CreateAccountInput;
	userId: string;
	admin: boolean;
}) => {
	const { accountGroupingId, ...rest } = AccountCreateValidation.parse(data);

	await checkAGAccess({
		accountGroupingId,
		userId,
		admin,
		needsAdminAccess: true
	});

	return client.account.create({
		data: {
			...rest,
			accountGrouping: { connect: { id: accountGroupingId } },
			...basicStatusToDBRequired(rest.status),
			...generateAccountSummary({
				accountGroup: rest.accountGroup,
				accountGroup2: rest.accountGroup2,
				accountGroup3: rest.accountGroup3,
				title: rest.title
			})
		},
		include: accountInclude
	});
};
